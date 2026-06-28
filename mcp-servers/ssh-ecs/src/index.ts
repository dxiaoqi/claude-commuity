#!/usr/bin/env node
/**
 * MCP Server: SSH ECS Agent
 * Gives Claude direct access to the Claude Community production server.
 *
 * Configure via env vars (put in .env or ~/.zshrc):
 *   ECS_HOST       - server IP / hostname
 *   ECS_USER       - SSH username (default: root)
 *   ECS_PORT       - SSH port (default: 22)
 *   ECS_KEY_PATH   - path to private key (~/.ssh/id_rsa)
 *   ECS_PASSPHRASE - key passphrase (optional)
 */

import { Server }              from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { Client }  from 'ssh2';
import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import { homedir } from 'os';

// ── Config ──────────────────────────────────────────────────
const ECS = {
  host:       process.env.ECS_HOST       ?? '',
  port:       Number(process.env.ECS_PORT ?? 22),
  username:   process.env.ECS_USER       ?? 'root',
  keyPath:    process.env.ECS_KEY_PATH   ?? join(homedir(), '.ssh', 'id_rsa'),
  passphrase: process.env.ECS_PASSPHRASE ?? undefined,
  workDir:    process.env.ECS_WORK_DIR   ?? '/opt/claude-community',
};

// ── SSH helper ──────────────────────────────────────────────
function sshExec(command: string, timeoutMs = 30_000): Promise<{ stdout: string; stderr: string; code: number }> {
  return new Promise((resolve, reject) => {
    if (!ECS.host) {
      reject(new Error('ECS_HOST is not set. Add it to your environment.'));
      return;
    }

    const conn = new Client();
    let stdout = '';
    let stderr = '';
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      conn.end();
      reject(new Error(`SSH command timed out after ${timeoutMs / 1000}s`));
    }, timeoutMs);

    conn.on('ready', () => {
      conn.exec(command, (err, stream) => {
        if (err) { clearTimeout(timer); conn.end(); reject(err); return; }

        stream.on('data',           (d: Buffer) => { stdout += d.toString(); });
        stream.stderr.on('data',    (d: Buffer) => { stderr += d.toString(); });
        stream.on('close', (code: number) => {
          clearTimeout(timer);
          conn.end();
          if (!timedOut) resolve({ stdout: stdout.trim(), stderr: stderr.trim(), code: code ?? 0 });
        });
      });
    });

    conn.on('error', (err) => { clearTimeout(timer); if (!timedOut) reject(err); });

    conn.connect({
      host:       ECS.host,
      port:       ECS.port,
      username:   ECS.username,
      privateKey: readFileSync(ECS.keyPath),
      passphrase: ECS.passphrase,
      readyTimeout: 10_000,
    });
  });
}

function fmt(r: { stdout: string; stderr: string; code: number }): string {
  const parts: string[] = [];
  if (r.stdout) parts.push(r.stdout);
  if (r.stderr) parts.push(`[stderr]\n${r.stderr}`);
  if (r.code !== 0) parts.push(`[exit code: ${r.code}]`);
  return parts.join('\n') || '(no output)';
}

// ── Tool definitions ─────────────────────────────────────────
const TOOLS: Tool[] = [
  {
    name: 'server_status',
    description: 'Get a quick health overview: Docker containers, disk usage, memory, uptime.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'exec',
    description: 'Run any shell command on the ECS server. Use for installs, config edits, restarts. Avoid long-running processes.',
    inputSchema: {
      type: 'object',
      properties: {
        command:    { type: 'string', description: 'Shell command to run' },
        workingDir: { type: 'string', description: 'Working directory (default: /opt/claude-community)' },
      },
      required: ['command'],
    },
  },
  {
    name: 'docker_logs',
    description: 'Tail logs from a Docker container.',
    inputSchema: {
      type: 'object',
      properties: {
        container: {
          type: 'string',
          description: 'Container name or ID',
          enum: ['app', 'proxy', 'umami', 'postgres'],
        },
        lines: { type: 'number', description: 'Number of log lines to show (default 50)' },
      },
      required: ['container'],
    },
  },
  {
    name: 'deploy',
    description: 'Pull the latest Docker image and restart the app container (rolling restart, zero downtime).',
    inputSchema: {
      type: 'object',
      properties: {
        imageTag: { type: 'string', description: 'Image tag to deploy (default: latest)' },
      },
      required: [],
    },
  },
  {
    name: 'deploy_status',
    description: 'Check the current deployment: image tags, container health, uptime, and recent app logs.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'nginx_reload',
    description: 'Reload the Caddy config without downtime (after editing Caddyfile).',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
];

// ── Tool handlers ─────────────────────────────────────────────
async function handleTool(name: string, args: Record<string, unknown>): Promise<string> {
  switch (name) {

    case 'server_status': {
      const cmd = [
        'echo "=== Containers ==="',
        'docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Image}}"',
        'echo ""',
        'echo "=== Disk ==="',
        'df -h / | tail -1',
        'echo ""',
        'echo "=== Memory ==="',
        'free -h | grep Mem',
        'echo ""',
        'echo "=== Uptime ==="',
        'uptime',
      ].join(' && ');
      return fmt(await sshExec(cmd));
    }

    case 'exec': {
      const command    = args.command    as string;
      const workingDir = (args.workingDir as string | undefined) ?? ECS.workDir;
      // Safety: block obviously destructive commands
      const blocked = ['rm -rf /', 'mkfs', '> /dev/sda', 'dd if=/dev/zero'];
      if (blocked.some(b => command.includes(b))) {
        return `❌ Blocked: command looks destructive. Run manually if intentional.`;
      }
      return fmt(await sshExec(`cd ${workingDir} && ${command}`, 60_000));
    }

    case 'docker_logs': {
      const container = args.container as string;
      const lines     = (args.lines    as number | undefined) ?? 50;
      return fmt(await sshExec(`docker logs --tail ${lines} --timestamps ${container} 2>&1`));
    }

    case 'deploy': {
      const tag = (args.imageTag as string | undefined) ?? 'latest';
      const cmd = [
        `cd ${ECS.workDir}`,
        `export IMAGE_TAG=${tag}`,
        `docker compose pull app`,
        `docker compose up -d --no-deps --wait app`,
        `echo "--- health ---"`,
        `docker ps --filter "name=app" --format "{{.Names}} {{.Status}}"`,
      ].join(' && ');
      return fmt(await sshExec(cmd, 120_000));
    }

    case 'deploy_status': {
      const cmd = [
        'echo "=== Running images ==="',
        `docker ps --format "table {{.Names}}\\t{{.Image}}\\t{{.Status}}\\t{{.RunningFor}}"`,
        'echo ""',
        'echo "=== App health ==="',
        `docker inspect app --format "{{.State.Health.Status}} — started {{.State.StartedAt}}" 2>/dev/null || echo "no health check"`,
        'echo ""',
        'echo "=== Last 20 app logs ==="',
        'docker logs --tail 20 app 2>&1',
      ].join(' && ');
      return fmt(await sshExec(cmd));
    }

    case 'nginx_reload': {
      return fmt(await sshExec('docker exec proxy caddy reload --config /etc/caddy/Caddyfile'));
    }

    default:
      return `Unknown tool: ${name}`;
  }
}

// ── MCP Server ────────────────────────────────────────────────
const server = new Server(
  { name: 'ssh-ecs', version: '0.1.0' },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args = {} } = req.params;
  try {
    const text = await handleTool(name, args as Record<string, unknown>);
    return { content: [{ type: 'text', text }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { content: [{ type: 'text', text: `❌ Error: ${msg}` }], isError: true };
  }
});

// Start
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('SSH ECS MCP server running — waiting for commands…');

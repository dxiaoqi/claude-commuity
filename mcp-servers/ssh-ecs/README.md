# SSH ECS MCP Server

MCP server that gives Claude direct access to the Claude Community production ECS server via SSH.

## Tools

| Tool | Description |
|------|-------------|
| `server_status` | Docker containers, disk, memory, uptime |
| `exec` | Run any shell command (with safety guard) |
| `docker_logs` | Tail logs from app / proxy / umami / postgres |
| `deploy` | Pull latest image & rolling-restart app |
| `deploy_status` | Image tags, health, recent app logs |
| `nginx_reload` | Reload Caddy config without downtime |

## Setup

### 1. Build

```bash
cd mcp-servers/ssh-ecs
npm install
npm run build
```

### 2. Configure Claude Code

Add to `~/.claude/settings.json` (or `~/Library/Application Support/Claude/claude_desktop_config.json` for desktop):

```json
{
  "mcpServers": {
    "ssh-ecs": {
      "command": "node",
      "args": ["/absolute/path/to/claude-commuity/mcp-servers/ssh-ecs/dist/index.js"],
      "env": {
        "ECS_HOST": "YOUR_SERVER_IP",
        "ECS_USER": "root",
        "ECS_PORT": "22",
        "ECS_KEY_PATH": "/Users/YOU/.ssh/id_rsa"
      }
    }
  }
}
```

### 3. Env vars (alternative to config)

```bash
export ECS_HOST=1.2.3.4
export ECS_USER=root
export ECS_KEY_PATH=~/.ssh/id_rsa
export ECS_PASSPHRASE=         # leave blank if no passphrase
export ECS_WORK_DIR=/opt/claude-community   # default
```

## Usage examples

Once configured, you can ask Claude:

- "Check server status" → calls `server_status`
- "Show me the last 100 app logs" → calls `docker_logs`
- "Run `docker compose ps` on the server" → calls `exec`
- "Deploy the latest build" → calls `deploy`

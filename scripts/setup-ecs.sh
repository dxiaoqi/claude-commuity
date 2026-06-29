#!/usr/bin/env bash
# One-click ECS provisioning for Claude Community
# Run once on a fresh Ubuntu 22.04 ECS instance as root.
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/dxiaoqi/claude-commuity/main/scripts/setup-ecs.sh | bash
#   # or after git clone:
#   bash scripts/setup-ecs.sh

set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()  { echo -e "${GREEN}[setup]${NC} $*"; }
warn()  { echo -e "${YELLOW}[warn]${NC}  $*"; }
error() { echo -e "${RED}[error]${NC} $*"; exit 1; }

[[ $EUID -eq 0 ]] || error "Run as root: sudo bash setup-ecs.sh"

APP_DIR=/opt/claude-community

# ── 1. System update ──────────────────────────────────────────
info "Updating system packages (Alibaba Cloud mirrors)..."
cat > /etc/apt/sources.list <<'EOF'
deb https://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
EOF
apt-get update -q
apt-get install -y -q curl ca-certificates gnupg ufw

# ── 2. Docker ──────────────────────────────────────────────────
if ! command -v docker &>/dev/null; then
  info "Installing Docker via Alibaba Cloud mirror..."
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg \
    | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -q
  apt-get install -y -q docker-ce docker-ce-cli containerd.io docker-compose-plugin
  systemctl enable --now docker
  info "Docker installed: $(docker --version)"
else
  info "Docker already installed: $(docker --version)"
fi

# ── 3. Docker daemon config (ACR accelerator) ─────────────────
info "Configuring Docker daemon..."
cat > /etc/docker/daemon.json <<'DAEMON'
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "20m", "max-file": "3" },
  "registry-mirrors": ["https://registry.cn-hangzhou.aliyuncs.com"]
}
DAEMON
systemctl reload docker

# ── 4. App directory ──────────────────────────────────────────
info "Creating app directory at $APP_DIR..."
mkdir -p "$APP_DIR"/{caddy-data,caddy-config,postgres-data}

# Copy docker-compose.yml if running from cloned repo
if [[ -f "$(dirname "$0")/../docker-compose.yml" ]]; then
  cp "$(dirname "$0")/../docker-compose.yml" "$APP_DIR/"
  cp "$(dirname "$0")/../Caddyfile" "$APP_DIR/"
  [[ -d "$(dirname "$0")/../docker" ]] && cp -r "$(dirname "$0")/../docker" "$APP_DIR/"
else
  warn "docker-compose.yml not found next to this script."
  warn "Copy it manually: cp docker-compose.yml $APP_DIR/"
fi

# ── 5. Create .env if missing ─────────────────────────────────
if [[ ! -f "$APP_DIR/.env" ]]; then
  info "Creating .env — fill in the values marked CHANGE_ME..."
  cat > "$APP_DIR/.env" <<'ENV'
# Site
NEXT_PUBLIC_SITE_URL=https://www.claudecommunity.com
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://www.claudecommunity.com/stats/script.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID=CHANGE_ME_after_creating_umami_site

# SEO verifications (optional)
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
BAIDU_SITE_VERIFICATION=

# Database
POSTGRES_USER=claude
POSTGRES_PASSWORD=CHANGE_ME_strong_password
POSTGRES_DB=claude_commuity

# Umami analytics
UMAMI_APP_SECRET=CHANGE_ME_random_64_chars

# App
IP_HASH_SALT=CHANGE_ME_random_64_chars
ACME_EMAIL=CHANGE_ME@yourdomain.com

# Admin panel (generate with: docker run --rm caddy:2-alpine caddy hash-password)
ADMIN_PASSWORD_HASH=CHANGE_ME_caddy_hash

# Updated automatically by CI/CD on each deploy
APP_IMAGE=registry.cn-hangzhou.aliyuncs.com/CHANGE_ME_namespace/claude-commuity:latest
ENV
  warn ".env created at $APP_DIR/.env — edit it before starting the stack!"
else
  info ".env already exists, skipping."
fi

# ── 6. Firewall ───────────────────────────────────────────────
info "Configuring UFW firewall..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp   # HTTP/3 QUIC
ufw --force enable
ufw status

# ── 7. Systemd service for auto-start ────────────────────────
info "Creating systemd service..."
cat > /etc/systemd/system/claude-community.service <<SERVICE
[Unit]
Description=Claude Community stack
Requires=docker.service
After=docker.service network-online.target

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/docker compose up -d --remove-orphans
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=300

[Install]
WantedBy=multi-user.target
SERVICE
systemctl daemon-reload
systemctl enable claude-community.service

# ── Done ──────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}=====================================================${NC}"
echo -e "${GREEN}  ECS setup complete!${NC}"
echo -e "${GREEN}=====================================================${NC}"
echo ""
echo "Next steps:"
echo ""
echo "  1. Edit the .env file:"
echo "     nano $APP_DIR/.env"
echo ""
echo "  2. Generate secrets (run these and paste into .env):"
echo "     openssl rand -hex 32   # for POSTGRES_PASSWORD"
echo "     openssl rand -hex 32   # for UMAMI_APP_SECRET"
echo "     openssl rand -hex 32   # for IP_HASH_SALT"
echo ""
echo "  3. Generate admin password hash:"
echo "     docker run --rm caddy:2-alpine caddy hash-password"
echo ""
echo "  4. Start the stack:"
echo "     cd $APP_DIR && docker compose up -d"
echo ""
echo "  5. Set GitHub Secrets (Settings → Secrets → Actions):"
echo "     ECS_HOST, ECS_USER, ECS_SSH_KEY, ECS_PORT"
echo "     ALIYUN_NAMESPACE, ALIYUN_REGISTRY_USER, ALIYUN_REGISTRY_PASSWORD"
echo ""

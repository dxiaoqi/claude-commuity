#!/usr/bin/env bash
# Mirror third-party images that can't be pulled efficiently in China to Alibaba Cloud Container Registry.
# Run this once before first deploy, then the weekly GitHub Action keeps it up to date.
#
# Required env vars:
#   ALIYUN_NAMESPACE          - your ACR namespace (e.g. claude-community)
#   ALIYUN_REGISTRY_USER      - ACR username (usually your Alibaba Cloud email)
#   ALIYUN_REGISTRY_PASSWORD  - ACR password / access token
#
# Optional:
#   ACR_REGISTRY              - defaults to registry.cn-hangzhou.aliyuncs.com

set -euo pipefail

ACR="${ACR_REGISTRY:-registry.cn-hangzhou.aliyuncs.com}"
NS="${ALIYUN_NAMESPACE:?Please set ALIYUN_NAMESPACE}"

echo "Logging in to ACR ($ACR)…"
echo "${ALIYUN_REGISTRY_PASSWORD:?}" | \
  docker login "$ACR" -u "${ALIYUN_REGISTRY_USER:?}" --password-stdin

mirror() {
  local src="$1"
  local dst="$ACR/$NS/$2"
  echo ""
  echo "→ $src"
  echo "  → $dst"
  docker pull "$src"
  docker tag  "$src" "$dst"
  docker push "$dst"
  docker rmi  "$src" "$dst" 2>/dev/null || true
}

# Umami analytics (on ghcr.io — not accelerated by registry-mirrors)
mirror "ghcr.io/umami-software/umami:postgresql-latest" "umami:postgresql-latest"

echo ""
echo "Done. Update docker-compose.yml umami image to:"
echo "  $ACR/$NS/umami:postgresql-latest"

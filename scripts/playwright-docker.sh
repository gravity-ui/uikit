#!/usr/bin/env bash

set -euo pipefail

IMAGE_NAME="mcr.microsoft.com/playwright"
IMAGE_TAG="v1.47.1-jammy" # This version have to be synchronized with playwright version from package.json

NODE_MODULES_CACHE_DIR="$HOME/.cache/uikit-playwright-docker-node-modules"

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

run_command() {
    $CONTAINER_TOOL run --rm --network host -it -w /work \
        -v $(pwd):/work \
        -v "$NODE_MODULES_CACHE_DIR:/work/node_modules" \
        "$IMAGE_NAME:$IMAGE_TAG" \
        /bin/bash -c "$1"
}

if command_exists docker; then
  CONTAINER_TOOL="docker"
elif command_exists podman; then
  CONTAINER_TOOL="podman"
else
  echo "Neither Docker nor Podman is installed on the system."
  exit 1
fi

if [[ "$1" = "clear-cache" ]]; then
    rm -rf "$NODE_MODULES_CACHE_DIR"
    exit 0
fi

if [[ ! -d "$NODE_MODULES_CACHE_DIR" ]]; then
    mkdir -p "$NODE_MODULES_CACHE_DIR"
    run_command 'npm ci'
fi

run_command "$1"

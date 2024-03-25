#!/usr/bin/env bash

set -euo pipefail

IMAGE_NAME="mcr.microsoft.com/playwright"
IMAGE_TAG="v1.42.1-jammy" # This version have to be synchronized with playwright version from package.json

NODE_MODULES_CACHE_DIR="$HOME/.cache/uikit-playwright-docker-node-modules"

run_command() {
    docker run --rm --network host -it -w /work \
        -v $(pwd):/work \
        -v "$NODE_MODULES_CACHE_DIR:/work/node_modules" \
        "$IMAGE_NAME:$IMAGE_TAG" \
        /bin/bash -c "$1"
}

if [[ "$1" = "clear-cache" ]]; then
    rm -rf "$NODE_MODULES_CACHE_DIR"
    exit 0
fi

if [[ ! -d "$NODE_MODULES_CACHE_DIR" ]]; then
    run_command 'npm ci'
fi

run_command "$1"

#!/bin/bash

set -euo pipefail  # Exists the script if any command fail along the way

# Navigate to the repository
cd /home/ubuntu/Interactive-Database-for-Environmental-Data

# Pull the latest from the developer branch
git pull origin developer

# Stops and removes the container if it exists and ignores errors if it's not running
docker stop staticwebserver:latest || true
docker rm staticwebserver:latest || true

# Build the Docker image
docker build -t "staticwebserver:latest" ./web-server

# Run the Docker container
docker run --restart=always -p 3000:3000 -d staticwebserver:latest

echo "Svelte application sucessfully started on developer!"
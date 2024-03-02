#!/bin/bash

set -euo pipefail  # Exists the script if any command fail along the way

# Navigate to the repository
cd /home/ubuntu/Interactive-Database-for-Environmental-Data

# Pull the latest from the developer branch
git checkout developer
git pull origin developer

# Stops and removes the container if it exists and ignores errors if it's not running
sudo docker stop interactive_database:latest || true
sudo docker rm interactive_database:latest || true

# Build the Docker image
sudo docker build -t "interactive_database:latest" .

# Run the Docker container
sudo docker run --restart=always -p 80:80 -d interactive_database:latest

echo "Svelte application sucessfully started on developer!"
#!/bin/bash

set -euo pipefail  # Exists the script if any command fail along the way

# Navigate to the repository
cd /home/ubuntu/Interactive-Database-for-Environmental-Data

# Pull the latest from the developer branch
git checkout developer
git pull origin developer

# Stop and remove previous containers and networks if any exists and ignores errors if it's not running
sudo docker compose down || true

# Build and run the docker containers
sudo docker compose up --build -d

echo "Svelte application sucessfully started on developer!"
#!/bin/bash

set -euo pipefail  # Exists the script if any command fail along the way

# Navigate to the repository
cd /home/ubuntu/Interactive-Database-for-Environmental-Data

# Pull the latest from the main branch
git pull origin main

# Stops and removes the container if it exists and ignores errors if it's not running
container_id=$(sudo docker ps -qf "ancestor=interactive_database:latest")
sudo docker stop $container_id || true
sudo docker rm $container_id || true

# Build the Docker image
sudo docker build -t "interactive_database:latest" .

# Run the Docker container
sudo docker run --restart=always -p 80:80 -d interactive_database:latest

echo "Svelte application sucessfully started on main!"

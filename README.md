# Interactive-Database-for-Environmental-Data

This project consists of a svelte application with it's supporting development, testing, and deployment tools. 
The application was requested by [Norsk institutt for naturforskning](www.nina.no) and is designed to let them view and interact with their environmental data, as they previously have had to use excel sheets for this purpose. The project is indended to integrate with their infrastructure, however it is still possible to run it locally assuming you have access to data with the correct format.

The application uses sveltekit to deliver a client side rendered, single page application. It utilizes client side hydration to dynamically update the webpage with environmental data as the user navigates the web application. 

# Setup

There are two steps to set up the application. As the application depends on a postgres database with a mounted postgrest api for data access, this has to be installed first. 
Afterwards the application can be ran for testing or for deployment using nginx. 

## Prerequisite

- The machine has to have [Docker Desktop](https://docs.docker.com/get-docker/) (or optionally just [Docker engine](https://docs.docker.com/engine/install/) if using linux), and [Docker compose]() installed.
- If using windows, you have to have [wsl2](https://learn.microsoft.com/en-us/windows/wsl/install
) installed. 

## Setting up postgres

1. First clone [fishboat-database](https://github.com/KevinMathisen/fishboat-database) into a linux environment using `git clone <url>`
2. Follow the `README` in the same [git repo](https://github.com/KevinMathisen/fishboat-database) to configure the database.
3. Upload your excel files containing your data to [localhost:8000](http://localhost:8000). Only on file at a time! **TODO: add example data**
4. Insert all the SQL views found in [docs/PostgREST-API.md](https://github.com/KevinMathisen/Interactive-Database-for-Environmental-Data/blob/main/docs/PostGREST-API.md) into Postgres by using the `data/SQL/` section on [Hasura](localhost:8000/console/) 


## Setting up the svelte application for production

1. First clone [Interactive-Database-for-Environmental-Data ](https://github.com/KevinMathisen/Interactive-Database-for-Environmental-Data) into a linux environment using `git clone <url>`
2. Create a file called `.env` with the following format: `VITE_POSTGREST_URL=<postgrest url>`.  The default postgrest url is [localhost:8000/postgrest/](http://localhost:8000/postgrest/).
3. (Optional) If your service runs on a domain, you can add another line to the `.env` file as follows: `SERVER_NAME=<domainname>`.
4. Run the command `docker-compose up --build -d` to build and run the svelte application **TODO: use docker compose instead of docker-compose**

## Setting up the svelte application for testing
This is only meant for testing purposes

1. First clone [Interactive-Database-for-Environmental-Data ](https://github.com/KevinMathisen/Interactive-Database-for-Environmental-Data) into a linux environment using `git clone <url>`
2. Create a file called `.env.test` in `client/` with the following format: `VITE_POSTGREST_URL=<postgrest url>`.  The default postgrest url is [localhost:8000/postgrest/](http://localhost:8000/postgrest/).
4. Install all dependencies for the application by running the command `npm install` in `client/`.
5. Run the application with the command `npm run dev` in `client/`. The url the website is accesible by should be shown in the commandline.

# Usage

To use the application simply visit the website on the following which applies:
- `http://<your-ip>:80` for accessing by ip address 
- `http://<your-domain>:80` for accessing by domain
- `http://localhost:80` for accessing locally

# Development team
- Kavishnayan Nadarajah
- Kevin Nikolai Mathisen
- Carl Petter Mørch-Reiersen
- Martin Solevåg Glærum

In collaboration with [NTNU](www.ntnu.no) and [NINA](www.nina.no).
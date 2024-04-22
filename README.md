# Interactive-Database-for-Environmental-Data

This project consists of a svelte application with it's supporting development, testing, and deployment tools. 
The application was requested by [Norsk institutt for naturforskning](www.nina.no) and is designed to let them view and interact with their environmental data, as they previously have had to use excel sheets for this purpose. The project is indended to integrate with their infrastructure, however it is still possible to run it locally with test data.

The application uses sveltekit to deliver a client side rendered, single page application. It utilizes client side hydration to dynamically update the webpage with environmental data as the user navigates the web application. 

# Setup

The application can either be used with the test docker compose in this repostory, or used in a custom docker comopse with upload, authentication, and postgrest services.

## Prerequisite

- The machine running docker compose has to have [Docker Desktop](https://docs.docker.com/get-docker/) (or optionally just [Docker engine](https://docs.docker.com/engine/install/) if using linux), and [Docker compose](https://docs.docker.com/compose/install/) installed.

## Setting up the svelte application for testing
This is to set up the application with basic testing data. The upload functionality does not actually upload any files. 

1. First clone [Interactive-Database-for-Environmental-Data ](https://github.com/KevinMathisen/Interactive-Database-for-Environmental-Data) into a linux environment using `git clone <url>`
2. Then run the command `docker compose up --build -d` to build and run the svelte application

## Setting up the svelte application for production
This is how to set up the application as it was intended to be used.

1. Create a docker compose in a Git repository which has the following services:
    - A service for authentication following our [authentication documentation](./docs/Authentication.md)
    - A postgres database with the following [schema](./docs/Postgres-schema.md)
    - A postgrest endpoint 
    - An upload service following our [upload documentation](./docs/Upload.md)
    - A service which uses the [Dockerfile](./Dockerfile) in the root of this repository. Can for example be called frontend. 
    - A proxy service which takes all the requests and routes them to the correct service based on their endpoints

2. Add this repo ([link](https://github.com/KevinMathisen/Interactive-Database-for-Environmental-Data)) as a submodule to your Git repository, placing it in a folder compatible with the service which should use the dockerfile. For example `/frontend/`. This should enable your docker compose to access the [Dockerfile](./Dockerfile) in the root of this repository. ([Git submodules guide](https://github.blog/2016-02-01-working-with-submodules/))

3. Add the sql views outlined in the [Postgrest API documentation](./docs/Postgrest-api.md) to the database.

4. Upload your excel files containing your data to the upload service following the schema in the [upload documentation](./docs/Upload.md)

5. (Optional) If you want to use custom endpoints for the different services, configure the following envrionment variables:
    - `VITE_POSTGREST_URL=<postgrest endpoint>`
    - `VITE_UPLOAD_URL=<upload endpoint>`
    - `VITE_AUTH_URL=<auth endpoint>`

6. Then run the command `docker compose up --build -d` to build and run the svelte application 

# Usage

To use the application simply visit the website on the following which applies:
- `http://<your-ip>` for accessing by ip address 
- `http://<your-domain>` for accessing by domain
- `http://localhost` for accessing locally

If the application was set up for testing, you can log into the website with the following credentials:
- Username: `admin`
- Password: `admin`

If needed, the user guide can be found [here](./docs/UserManual.md)

# Development team
- Kavishnayan Nadarajah
- Kevin Nikolai Mathisen
- Carl Petter Mørch-Reiersen
- Martin Solevåg Glærum

In collaboration with [NTNU](https://www.ntnu.no) and [NINA](https://www.nina.no).
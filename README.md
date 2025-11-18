# Lennar Sales Dashboard

This project is a sales dashboard for Lennar, a leading homebuilder in the US. It is designed to provide a comprehensive view of sales data, enabling users to track performance, identify trends, and make data-driven decisions. The dashboard is built with Node.js, and uses a Snowflake database for data storage.

The project is divided into two main parts: the backend and the frontend. The backend is responsible for fetching, processing, and serving data from the Snowflake database. The frontend is a web application that presents the data in a user-friendly format.


## Requirements

- `node` 18.x
  - It's recommended to use [nvm](https://github.com/nvm-sh/nvm) for this.
    Install with `brew install nvm` and then run `nvm use` in the root directory
    of this repo.
- `npm` 8.x
  - If you used `nvm`, this should be set up for you after running `nvm use`.
- `git`


## Local Development

### Backend

Follow these steps to set up the backend:

1. Clone the repository using `git clone`.
2. Navigate to the server directory and copy the example environment file to a new `.env` file: `cd server && cp .env.example .env`.
3. Update the environment variables in `.env` with your Snowflake credentials.
4. Install the necessary dependencies with `npm i`.
5. Build the project with `npm run build`.
6. Fetch the cache data from Snowflake with `npm run start-cron:now`.
7. Start the backend server with `npm start`.


### Frontend

Follow these steps to set up the frontend:

1. In the root folder, copy the example environment file to a new `.env` file: `cp .env.example .env`.
2. Update the environment variables in `.env` as necessary.
3. Install the necessary dependencies with `npm i`.
4. Start the local development server with `npm start`.

## Deployment

1. Connect the servers using the credentials provided by DSS Team.
  - Dev Server: `ssh {username}@10.252.15.19`
  - Prod Server: `ssh {username}@10.76.137.10`

    **Note:**
    - The repository is cloned in `/opt/node/projects` folder.
    - DNS Certificates are located in `/opt/node/projects/cert_files`.
    - We use hosting service - Nginx and pm2 for Node.js Process Manager

2. To update the project, navigate to the project folder and pull the latest changes (you can skip this step if only restarting processes is required).
    ```bash
    cd /opt/node/projects/corp_hub
    git pull
    ```

3. If you need to rebuild server bundles (you can skip this step if only restarting processes is needed):
      ```bash
      cd server
      npm run build
      cd ..
      npm run build
      ```

4. To restart all registered pm2 processes, run:
    ```bash
    pm2 resurrect
    ```

## Architecture

### Backend.

We have two main processes running in the background: one for the Rest API and one for CronJob.

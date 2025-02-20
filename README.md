# YouCC Fullstack Test

### The Stack

- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Drizzle ORM](https://orm.drizzle.team/docs/overview)

## Install NVM

This project uses nvm to manage node versions.

#### Mac / Linux:

https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

#### Windows:

https://github.com/coreybutler/nvm-windows

## Getting Started

First activate the node version via nvm

```sh
# Install node version specified in .nvmrc file
$ nvm install

# Use the version in the current terminal
$ nvm use
```

We will use pnpm as a package manager (instead of npm)

```sh
# Install pnpm
$ npm install -g pnpm

# Install all dependencies
$ pnpm i
```

### Docker Compose

Via docker compose we have postgres db and pgAdmin here:

```
http://localhost:8888
username: test@youcc.net
password: Aa123456
```

Start the docker compose

```sh
$ docker compose up -d
```

## Running the services

```sh
# Run the FE & API
$ pnpm dev

# Run the API only (if needed)
$ pnpm dev:api

# Run the FE only (if needed)
$ pnpm dev:fe

# Run the data synchronizer
$ pnpm dev:synchronizer
```

_in vscode, you have settings for a debugger of both_

### Frontend

http://127.0.0.1:3000

### Swagger

http://127.0.0.1:8000/docs

## Working with Drizzle ORM

All existing DB migrations run on API startup, no need to run it manually

```sh
# Generate a new migration
$ pnpm db:generate

# Run existing migrations
$ pnpm db:migrate

# Starts a studio to view and edit data
$ pnpm db:studio
```

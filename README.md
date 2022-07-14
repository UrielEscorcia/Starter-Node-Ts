# Graphql Starter


#### Technologies 

- NodeJS and TypeScript
- GraphQL with Apollo Server and Type GraphQL
- MongoDB Database integrated with Mongoose/TypeGoose
- Docker (Not mandatory)

<!-- ## Folder structure

#### Overview

```
.
├── src                        # Where your source code lives
│   ├── bootstrap              # Bootstrapping and loading of the API dependencies (Express, Apollo, Database, ...)
│   ├── entities               # Used to generate typing, schemas and ORM models
│   ├── modules                # Business logic of the app divided by domain (eg: User, Post, Todo)
│   ├── tests                  # Where all our testing strategy lives
│   ├── utils                  # Collection of utils function that we use in the project
│   ├── config.ts              # Config of the app, sourced by environment variables
│   └── index.ts               # Entry point of the API
│
├── jest-mongodb-config.js     # Optional if you don't use MongoDB!
├── jest.config.js             # Jest configuration
├── docker-compose.yml         # Docker compose configuration (Optional !)
├── .env.example               # Example of what your .env file should look like
├── .gitignore                 # Standard gitignore file
├── package.json               # Node module dependencies
├── README.md                  # Simple readme file
└── tsconfig.json              # TypeScript compiler options
``` -->

#### Module example (Domain)

```
.
├── src
│   └── modules
│       └── user               # Module name
│           ├── input.ts       # Input validation for mutations and queries using class-validator
│           ├── model.ts       # Database model
│           ├── resolver.ts    # GraphQL revolver
│           └── service.ts     # Business logic of your app
```

## How to use

- Duplicate the `.env.example` file and rename it `.env`
- Run `npm install`

#### Start mongoDB with docker-compose

- Make sure you have docker installed on your machine
- Run `docker-compose up` to start the containers
- Run `docker-compose down` to remove the running containers

#### Start server for development

- Run `npm run start:dev`

#### Build and start server for production

- Run `npm start`

#### Run integration tests

- Run 'npm test'

> Integration tests are done with Jest, Apollo Server Testing and MongoDB Memory Server. This way every test are testing our entire logic with every graphQL request, from our resolvers to our models!

#### Access to the GraphQL Playground (Dev only)

- `http://localhost:5000/graphql`

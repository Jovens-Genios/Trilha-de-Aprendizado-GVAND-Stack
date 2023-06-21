# GRANDstack Starter - GraphQL API

## Quick Start

Install dependencies:

```
npm install
```

Start the GraphQL service:

```
npm start
```

This will start the GraphQL service (by default on localhost:4000) where you can issue GraphQL requests or access GraphQL Playground in the browser:

![GraphQL Playground](img/graphql-playground.png)

## Configure

Set your Neo4j connection string and credentials in `.env`. For example:

_.env_

```
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=letmein
```

Note that grand-stack-starter does not currently bundle a distribution of Neo4j. You can download [Neo4j Desktop](https://neo4j.com/download/) and run locally for development, spin up a [hosted Neo4j Sandbox instance](https://neo4j.com/download/), run Neo4j in one of the [many cloud options](https://neo4j.com/developer/guide-cloud-deployment/), or [spin up Neo4j in a Docker container](https://neo4j.com/developer/docker/). Just be sure to update the Neo4j connection string and credentials accordingly in `.env`.

## Seeding The Database

@TODO
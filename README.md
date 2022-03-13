[![client](https://github.com/miraajkadam/BooksGQL/actions/workflows/client.yml/badge.svg)](https://github.com/miraajkadam/BooksGQL/actions/workflows/client.yml)
[![server](https://github.com/miraajkadam/BooksGQL/actions/workflows/server.yml/badge.svg)](https://github.com/miraajkadam/BooksGQL/actions/workflows/server.yml)
[![CodeQL](https://github.com/miraajkadam/BooksGQL/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/miraajkadam/BooksGQL/actions/workflows/codeql-analysis.yml)

# BooksGQL
Interactive book store designed on GraphQL queries.

## Tech Stack
* Written in [typescript](https://www.typescriptlang.org/)
### Server
* [NodeJS](https://nodejs.org/en/) with [Express](https://expressjs.com/)
* [GraphQL](https://graphql.org/)
### Client
* [React.js](https://reactjs.org/)
* GraphQL operations with [Apollo](https://www.apollographql.com/) 

## Installation
* **Step 1:** Clone this repository.
* **Step 2:** Change your directory to the clone.
```bash
cd <folder_name>
```
* **Step 3:** .Install all dependencies
```bash
npm run setup-server && npm run setup-client
```
* **Step 4:** Run the server
```bash
npm run serve-server
```
* **Step 4:** Run the client
```bash
npm run serve-client 
```
## Available Scripts
In the project directory, you can run:
##### `npm run setup-server`
Installs all server dependencies listed in `./server/package.json`.

##### `npm run build-server`
Builds the server and outputs the build files in `./server/dist`.

##### `npm run serve-server`
Starts server on port `process.env.PORT`.

##### `npm run setup-client`
Installs all client dependencies listed in `./client/package.json`.

##### `npm run build-client`
Builds the app for production to the `./client/build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

##### `npm run serve-client`
Serves react application on `PORT 3000`

## License
Distributed under the MIT License. See `LICENSE.txt` for more information


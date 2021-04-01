# bauphi-backend

## Production

### Heroku
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ad97c2601dc458057390)

You can run the app from [here](https://bauphi-api.herokuapp.com/).

- If you use Postman collection, change requests' URL domain from "localhost:5000" to "bauphi-api.herokuapp".

## Development

### Dependencies

Use `npm install` to install dependencies.

- Express JS: version ^4.17.1
- Nodemon: version ^2.0.7 (for development purposes)
- Knex: version ^0.95.1
- pg: ^8.5.1
- postgres: ^1.0.2
- Node-Fetch: ^2.6.1


### Setup
Go to `/bauphi-backend/api/dbfunctions` and init postgres database via `npx knex migrate:latest`

Use `npm start` or `yarn server` to start the server in http://localhost:5000/.

### Endpoints

Endpoints will be documented [here](https://github.com/BauPhi/bauphi-backend/issues/3#issuecomment-782308406).

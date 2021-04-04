# bauphi-backend

## Production

### Heroku
[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/a6e1f3576a7e85ac635b)

You can run the app from [here](https://bauphi-api.herokuapp.com/).

- If you use Postman collection, change requests' URL domain from "localhost:5000" to "bauphi-api.herokuapp.com".

## Development

### Dependencies

Use `npm install` to install dependencies.

### Setup
Go to `/bauphi-backend/api/dbfunctions` and init postgres database via `npx knex migrate:latest`

Use `npm start` or `yarn server` to start the server in http://localhost:5000/.

### Endpoints

Endpoints will be documented [here](https://github.com/BauPhi/bauphi-backend/issues/3#issuecomment-782308406).

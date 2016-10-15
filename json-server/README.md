# Mock Server

The mock server uses `json-server` which is based on `express`. By default the server runs on port `3000`.

## Routes

###  `POST` /admin/login

Login using a username-password pair. If the credentials are valid, a new JWT is returned.

#### Request
~~~~
  {
    "username": String,
    "password": String
  }
~~~~

The only accepted username-password pair by default is

~~~~
{
  "username": "user",
  "password": "pw"
}
~~~~

#### Response

On success:

~~~~
  {
    "token": String
  }
~~~~

****

### `GET` /admin/tokens

Returns the list of active tokens.

#### Response

~~~~
  [
    {
      "token": String,
      "expDate": String
    }
  ]
~~~~

****

### `POST` /admin/tokens

Creates a new token. The created token is **not** returned. 

****

### `POST` /register

Registration endpoint for players. Stores the user data on the server.

#### Request
~~~~
  {
    "username": String,
    "password": String,
    "email": String,
    "token": String
  }
~~~~

# API Documentation

APIs that you can use in frontend to encode, decode and verify JWT.

Things that are true for all the API endpoints

* Returns `json` or `html` data only.
* For `json` response, add `Content-Type: application/json` in headers. This documentation assumes that you're requesting `json` content type only.
* Each API response will have `{ statusText: "", statusCode: "" }` where
    * `statusText` is the status of the response that can be shown to the user to inform about the status of request
    * `statusCode` is a code that can be used by the developer to handle various cases for the request
* Follows HTTP status code semantics for REST i.e. 
    * `HTTP 200` for successful request
    * `HTTP 201` for successfully creating the resource
    * `HTTP 400` for validation error
    * `HTTP 403` for unauthorized access
    * `HTTP 500` for internal error on the server

## API Endpoints

* Get default token
* Create token
* Verify token

### Get default token

`GET /jwt`

**Response**

```
{ token: jwtJson }
```

### Create new token

`POST /jwt`

**Request body**

* `alg`: algorithm to use for signing token
* `payload`: payload for JWT

**Response**

```
{ token: jwtJson }
```

### Verify token

`POST /jwt/verify/:jwtTokenString`

* `jwtTokenString`: JWT as a token string

**Response**

```
{ decodedToken: decodedTokenJsonObject }
```


### Access JWT protected endpoints


`POST /demo/protected/api/bearer`

**Headers**

* `Authorization`: JWT string written as `Bearer ${jwtString}`
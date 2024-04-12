# Authentication solution
Endpoints for handling the authentication on the web page.  

## Login
Tries to log in a user with given username and password. Sends this to login endpoint, and if it succeds an authentication cookie is set. 

### Request
```http
POST /api/auth/login/ HTTP/1.1
Host: localhost
Content-Type: application/json

{
  "username": "string",
  "email": "user@example.com",
  "password": "string"
}
```

### Response success
```http
HTTP/1.1 200 OK
Set-Cookie: test=token_value; HttpOnly; SameSite=Strict
Content-Type: application/json

{
  "access": "string",
  "refresh": "string",
  "user": {
    "pk": 0,
    "username": "NnnbyRtlH0Mo11z6fO_Wr7CHJ9Cn9E6GWyHlNvbGXYLIxdZYba3GJ1ugAslyP8v",
    "email": "user@example.com",
    "first_name": "string",
    "last_name": "string"
  }
}
```
### Response failed
```http
HTTP/1.1 401 Unauthorized
```

## Logout
Should be called when a user clicks on log out. 

### Request
```http
/api/auth/logout/ HTTP/1.1
Host: localhost
```
### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "detail": "string"
}
```
## Refresh token
Should be called when a request was not authenticated to try to get a new token if possible. If the request fails, the user should be redirected to the log in page.

### Request
```http
POST /api/auth/token/refresh/ HTTP/1.1
Host: localhost
Content-Type: application/json

{
  "refresh": "string"
}
```

### Response success
```http
HTTP/1.1 200 OK
Set-Cookie: test=token_value; HttpOnly; SameSite=Strict

{
  "access": "string"
}
```
### Response failed

```http
HTTP/1.1 401 Unauthorized
```

## Verify token
Should be called when the website loads to check if the user is authenticated.

### Request
```http
POST /api/auth/token/verify/ HTTP/1.1
Host: localhost
Content-Type: application/json

{
  "token": "string"
}
```

### Response success
```http
HTTP/1.1 200 OK

{ }
```
### Response failed

```http
HTTP/1.1 401 Unauthorized
```

## Request resource
When a user tries to request a resource which required authentication.

### Response
The response does not have to do anything, as long as the request is to the same domain as the website the cookie will automatically be sent. 

### Response success
```http
HTTP/1.1 200 OK
```
### Response failed
```http
HTTP/1.1 401 Unauthorized
```

If request failed, the website should try to [refresh the token](#refresh-token), and if this fails the user should be redirected to the [login page](#login).   
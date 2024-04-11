# Authentication solution

## Login

Tries to log in a user with given username and password. Sends this to login endpoint, and if it succeds an authentication cookie is set. 

### Request
```http
POST /api/auth/login HTTP/1.1
Host: localhost
Content-Type: application/json

{
  "key1": "value1",
  "key2": "value2"
}
```

### Response success
```http
HTTP/1.1 200 OK
Set-Cookie: test=token_value; HttpOnly; SameSite=Strict
```
### Response failed

```http
HTTP/1.1 401 Unauthorized
```

## Logout

/api/auth/logout

## Refresh token

### Request
```http
POST /api/auth/token/refresh HTTP/1.1
Host: localhost
Content-Type: application/json

{
  "key1": "value1",
  "key2": "value2"
}
```

### Response success
```http
HTTP/1.1 200 OK
Set-Cookie: test=token_value; HttpOnly; SameSite=Strict
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
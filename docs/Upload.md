# Upload solution
API logic for uploading files on the webpage.

## Request
The website has to make the following request to upload a file:

```http
POST /api/upload/ HTTP/1.1
Host: localhost
Content-Type: multipart/form-data

file 
string($binary)
```

## Response
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true
}
```
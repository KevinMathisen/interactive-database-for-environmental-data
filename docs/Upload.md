# Upload solution
API logic and file schema for uploading files on the webpage.

## File schema
The file uploaded has to have the following sheets defined with the correct format

### Elvedata

| Column Header          | Type   | Required? |
| ---------------------- | ------ | --------- |
| Start dato             | dato   | krevd     |
| Slutt dato             | dato   | krevd     |
| Elv                    | tekst  | krevd     |
| Båttype                | tekst  | krevd     |
| Lat                    | nummer | krevd     |
| Long                   | nummer | krevd     |
| Vannføring (sildre.no) | nummer |           |
| Skipper                | tekst  | krevd     |
| Mannskap1              | tekst  |           |
| Mannskap2              | tekst  |           |
| Mannskap3              | tekst  |           |
| Prosjekt               | tekst  |           |
| Prosjektnummer         | tekst  | krevd     |
| Kommentar              | tekst  |           |

### Stasjonsdata

| Column Header             | Type   | Required? |
| ------------------------- | ------ | --------- |
| Stasjon                   | nummer | krevd     |
| Båttype                   | tekst  | krevd     |
| Dato                      | dato   | krevd     |
| Klokkeslett start         | tekst  | krevd     |
| Lat start                 | nummer | krevd     |
| Long start                | nummer | krevd     |
| Lat stopp                 | nummer | krevd     |
| Long stopp                | nummer | krevd     |
| Dominerende elvetype      | tekst  |           |
| Vær                       | tekst  |           |
| Vanntemp (Celsius)        | nummer |           |
| Lufttemperatur (Celsius)  | nummer |           |
| Ledningsevne (µs/cm)      | nummer |           |
| Transektlengde (m)        | nummer |           |
| Sekunder fisket (s)       | nummer |           |
| Volt                      | nummer | krevd     |
| Puls (DC)                 | nummer | krevd     |
| Display                   | nummer | krevd     |
| Gpx file?                 | tekst  |           |
| Stasjonsbeskrivelse       | tekst  |           |
| Kommentarer til fiske (observasjoner osv) | tekst | |

### Individdata

| Column Header         | Type   | Required? |
| --------------------- | ------ | --------- |
| ID                    | nummer |           |
| Stasjon               | nummer | krevd     |
| Omgang                | nummer |           |
| Art                   | tekst  | krevd     |
| Lengde                | nummer |           |
| Antall                | nummer |           |
| Kjønn                 | tekst  |           |
| Alder                 | nummer |           |
| Gjenutsatt (ja/nei)   | tekst  |           |
| Prøvetatt (ja/nei)    | tekst  |           |
| Kommentar             | tekst  |           |

## API Logic
### Request
The website has to make the following request to upload a file:

```http
POST /api/upload/ HTTP/1.1
Content-Type: multipart/form-data

file 
string($binary)
```

### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true
}
```
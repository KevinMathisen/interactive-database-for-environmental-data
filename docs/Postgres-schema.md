# Database Schema
This is the database schema the [postgrest api documentation](Postgrest-api.md) assumes. The schema does not have to be identical as long as the sql views defined in the postgrest api documentation is compatible. 

## Table: elvedata

| Attribute     | Type                  | Description |
| ------------- | --------------------- | ----------- |
| id            | integer               | Primary key |
| dato          | daterange             | Not null    |
| elv           | text                  | Not null    |
| baattype      | text                  | Not null    |
| posisjon      | geometry(point, 4326) | Not null    |
| vannfoering   | integer               |             |
| skipper       | text                  | Not null    |
| mannskap      | text[]                |             |
| prosjektnavn  | text                  |             |
| prosjektnummer| text                  | Not null    |
| kommentar     | text                  |             |

## Table: stasjonsdata

| Attribute           | Type                  | Description |
| ------------------- | --------------------- | ----------- |
| id                  | integer               | Primary key |
| elvedata            | integer               | Not null, references elvedata(id) |
| stasjonnummer       | integer               | Not null    |
| klokkeslett_start   | timestamp             | Not null    |
| posisjon_start      | geometry(point, 4326) | Not null    |
| posisjon_stopp      | geometry(point, 4326) | Not null    |
| dominerende_elvetype| text                  |             |
| vaer                | text                  |             |
| vanntemp            | decimal               |             |
| lufttemperatur      | integer               |             |
| ledningsevne        | integer               |             |
| transektlengde      | integer               |             |
| sekunder_fisket     | integer               | Not null    |
| volt                | integer               | Not null    |
| puls                | integer               | Not null    |
| display             | decimal               |             |
| gpx_file            | bool                  |             |
| stasjonsbeskrivelse | text                  |             |
| kommentar           | text                  |             |

## Table: individdata

| Attribute   | Type    | Description |
| ----------- | ------- | ----------- |
| id          | integer | Primary key |
| stasjon     | integer | Not null, references stasjonsdata(id) |
| omgang      | integer |             |
| art         | text    | Not null    |
| lengde      | integer |             |
| antall      | integer |             |
| kjoenn      | text    |             |
| alder       | integer |             |
| gjenutsatt  | bool    |             |
| proevetype  | text    |             |
| kommentar   | text    |             |
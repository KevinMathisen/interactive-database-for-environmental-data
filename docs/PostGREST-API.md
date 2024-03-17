# Postgrest API usage

burde specifye i request hvilke attributes som mangler
 - nyttig hvis allerede hvert på kart side og skal laste inn liste siden

## Queries
### Map page
For all rivers and station, we want to get the following attributes: `ID`, `Coordinates`, `Species`, `Date`

#### Get all rivers with their underlying species
Use the following request to get all river with their underlying species for filtering:
`GET /rivers_with_species`


#### Get all stations with their underlying species
Use the following request to get all stations with their underlying species for filtering:
`GET /station_with_species`


### Get summary information for a river
For a choosen river, we want to retrieve the following information if it has not already been retrived.
- ID
- Date
- Name
- Project ID
- Water flow
- Boat type
- Crew
- Comments
- For each underlying station:
  - Station number
  - Rivertype
  - Weather
  - Minutes fished
  - Amount of fish catched

First query to get the river and which stations are under it:

`GET /river_summary?id=eq.${id}`

Then get the stations under the river:
`GET /station_summary?id=in.(${station1}, ${station2})`

### Get summary information for a station
For a choosen station, we want to retrieve the following information if it has not already been retrived.
- ID
- Date
- Time of day
- Station number
- Project ID
- Station description
- Conditions
  - Rivertype
  - Weather
  - Water temperature
  - Air temperature
  - Time spent fishing
- Power setting
  - Voltage
  - Pulse (DC)
  - Conductivity
- For each species (and the sum)
  - Amount 
  - Median
  - Average
  - Minimum 
  - Maximum

Query to get the station information and underlying observations
`GET /station_summary?id=eg.${id}`

### List page
Exactly the same queries as the map page, except for selecting different attributes when quering all rivers and stations. The attributes we want here are `ID`, `Name`, `Date`, `Project number`, and `Species`. The stations will in addition require `Station number` and `time of day`. 


### Graph page
If a river is choosen, and the rivers stations are not defined, we need to query for the river stations
`GET /river_summary?select=id,stations&id=eg.${riverid}`

Then for each station, we need to finds its observations. Or, if one station is selected, we simply get the observations for that station.
`GET /station_with_observations?id=in.(${station1},${station2})`

### Download page
If river and station are not already queries from other pages, these will be queried the same way as the map and list page, with the following attributes: `ID`, `Name`, `Date`, and `Species`. The stations will in addition require `Station number`. 

For the download of the data ...
 -----------------------------------------


## SQL Views

### All rivers with underlying species
Elvedata.start_dato og elvedata.slutt_data is not yet included in the SQL schema.
```sql
CREATE VIEW river_with_species AS
SELECT elvedata.id AS id, 
elvedata.elv AS name, 
elvedata.posisjon AS pos, 
elvedata.start_dato AS start_date, 
elvedata.slutt_dato AS end_date, 
jsonb_agg(DISTINCT individdata.art) AS species
FROM elvedata INNER JOIN stasjonsdata ON elvedata.id = stasjonsdata.elvedata INNER JOIN individdata ON stasjonsdata.id = individdata.stasjon 
GROUP BY elvedata.id;
```

### All stations with underlying species 
Stasjonsdata.nummer and .dato is not yet included in the SQL schema.
```sql
CREATE VIEW station_with_species AS
SELECT stasjonsdata.id AS id,
CONCAT(elvedata.elv, ' ', stasjonsdata.nummer) AS name,
stasjonsdata.posisjon_start AS start_pos,
stasjonsdata.posisjon_stop AS end_pos,
stasjonsdata.dato AS date, 
jsonb_agg(DISTINCT individdata.art) AS species
FROM elvedata INNER JOIN stasjonsdata ON elvedata.id = stasjonsdata.elvedata INNER JOIN individdata ON stasjonsdata.id = individdata.stasjon 
GROUP BY stasjon.id;
```

### Summary information for River
```sql
CREATE VIEW river_summary AS
SELECT elvedata.id AS ID, 
elvedata.elv AS name, 
elvedata.start_dato AS start_date,
elvedata.slutt_dato AS end_date,
elvedata.prosjektnummer AS project_id,
elvedata.vannfoering AS waterflow,
elvedata.baattype AS boattype,
elvedata.skipper AS skipper,
elvedata.mannskap AS crew,
elvedata.comment AS comment,
jsonb_agg(DISTINCT stasjonsdata.id) AS stations
FROM elvedata INNER JOIN stasjonsdata ON elvedata.id = stasjonsdata.elvedata
GROUP BY elvedata.id;
```

### Summary information for Station
```sql
CREATE VIEW station_summary AS
SELECT stasjonsdata.id AS id, 
CONCAT(elvedata.elv, ' ', stasjonsdata.nummer) AS name, 
stasjonsdata.dato AS date, 
stasjonsdata.klokkeslett_start AS time, 
stasjonsdata.elvedata AS river_id, 
stasjonsdata.stasjonsbeskrivelse AS description, 
stasjonsdata.dominerende_elvetype AS rivertype, 
stasjonsdata.vaer AS weather, 
stasjonsdata.vanntemp AS water_temp, 
stasjonsdata.lufttemperatur AS air_temp, 
stasjonsdata.sekunder_fisket AS sec_fished, 
stasjonsdata.volt AS voltage, 
stasjonsdata.puls AS pulse, 
stasjonsdata.ledningsevne AS conductivity, 
jsonb_agg(jsonb_build_object('species', individdata.art, 'size', individdata.lengde, 'amount', individdata.antall)) AS observations 
FROM stasjonsdata INNER JOIN elvedata ON stasjonsdata.elvedata = elvedata.id INNER JOIN individdata ON stasjonsdata.id = individdata.stasjon;
```

### Download information for River
There is no need for a sql view for river download data, as the river summary page already exposes all of the required data for download. Therefore the river_summary view should be used for this purpose. 

### Download information for Station
All the station information not included in the summary view. Includes all the observation data. 
```sql
CREATE VIEW station_download AS
SELECT stasjonsdata.id AS id,
stasjonsdata.transektlengde AS transect_length
stasjonsdata.display AS display,
stasjonsdata.gpx_file AS gpx_file,
jsonb_agg(
  jsonb_build_object(
    'id', individdata.id,
    'station', individdata.stasjon,
    'round', individdata.omgang,
    'species', individdata.art,
    'length', individdata.lengde,
    'count', individdata.antall,
    'gender', individdata.kjoenn,
    'age', individdata.alder,
    'released', individdata.gjenutsatt,
    'sample_type', individdata.proevetype,
    'comment', individdata.kommentar
    )
  ) AS observations 
FROM stasjonsdata INNER JOIN elvedata ON stasjonsdata.elvedata = elvedata.id INNER JOIN individdata ON stasjonsdata.id = individdata.stasjon;
```

### Observations under River
To get the obsevations under a river, ask for the observations for the stations under the river. 

### Observations under Station
When using data for the webpage, which includes showing summary information and graphs, the properties `species`, `size`, and `amount` are needed. Because of this the endpoint `station_summary` will return sufficient data for the observations.
When using the data for downloading csv and xlsx files, all the properties of observations are needed. Here the endpoint `station_download` should be used.



## Data structure
There will be a map of River objects, and a map of station objects. Both will use the river and station IDs as keys.

River object:
- ID (Non-nullable)
- Name
- Start Date
- End Date
- Project ID
- Water Flow
- Boat Type
- Crew (List of crew members)
- Position
- Comment
- Species (List)
- Stations (List of their IDs):

Station object:
- ID (Non-nullable)
- Name
- Date
- Start Position
- End Position
- Time of day
- River ID
- Description
- Comment
- River Type
- Weather
- Water Temperature
- Air Temperature
- Time spent fishing
- Power setting
  - Voltage
  - Pulse (DC)
  - Conductivity
- Species (List)
- Observations (List)
  - ID
  - Station
  - Round
  - Species
  - Length
  - Count
  - Gender
  - Age
  - Released
  - Sample Type
  - Comment
- Transect Length
- Display
- GPX File

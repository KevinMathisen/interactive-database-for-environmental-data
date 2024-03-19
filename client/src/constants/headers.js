const RIVER_HEADERS_TABLE = ['Navn', 'Dato', 'Projektnummer']
const STATION_HEADERS_TABLE = ['Navn', 'Dato', 'Kl.']

const STATION_SUMMARY_HEADERS_TABLE = ['Stasjon', 'Elvtype', 'Vær', 'Min fisket', 'Ant fisk', 'Fisk/min']

const RIVER_HEADERS_EXCEL = [
  'Start dato', 'Slutt dato', 'Elv', 'Båttype', 'Lat', 'Long',
  'Vannføring (sildre.no)', 'Skipper', 'Mannskap1', 'Mannskap2',
  'Mannskap3', 'Prosjekt', 'Prosjektnummer', 'Kommentar'
]
const STATION_HEADERS_EXCEL = [
  'Stasjon', 'Båttype', 'Dato', 'Klokkeslett start', 'Lat start', 'Long start',
  'Lat stopp', 'Long stopp', 'Dominerende elvtype', 'Vær',
  'Vanntemperatur (Celsius)', 'Lufttemperatur (Celsius)',
  'Ledningsevne (µs/cm)', 'Transektlengde (m)', 'Sekunder fisket (s)', 'Volt',
  'Puls (DC)', 'Oservasjoner', 'Display', 'Gpx File', 'Stasjonsbeskrivelse',
  'Kommentar til fiske (observasjoner osv)'
]
const OBSERVATION_HEADERS_EXCEL = [
  'ID', 'Stasjon', 'Omgang', 'Art', 'Lengde', 'Antall', 'Kjønn', 'Alder',
  'Gjenutsatt(ja/nei)', 'Prøvetatt(ja/nei)', 'Kommentar'
]

export default { RIVER_HEADERS_TABLE, STATION_HEADERS_TABLE, STATION_SUMMARY_HEADERS_TABLE, RIVER_HEADERS_EXCEL, STATION_HEADERS_EXCEL, OBSERVATION_HEADERS_EXCEL }

export const FEEDBACK_TYPES = {
  SUCCESS: 'SUCCESS',
  INFO: 'INFO',
  ERROR: 'ERROR'
}

export const FEEDBACK_CODES = {
  INFO: 'INFO',
  GENERIC: 'GENERIC',
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
  UNAUTHORIZED: 'UNAUTHORIZED',
  POSTGREST_UNAVAILABLE: 'POSTGREST_UNAVAILABLE',
  UPLOAD_UNAVAILABLE: 'UPLOAD_UNAVAILABLE',
  UPLOAD_REJECTED: 'UPLOAD_REJECTED',
  UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
  AUTH_UNAVAILABLE: 'AUTH_UNAVAILABLE',
  AUTH_REJECTED: 'AUTH_REJECTED',
  AUTH_SUCCESS: 'AUTH_SUCCESS'
}

export const FEEDBACK_MESSAGES = {
  GENERIC: 'En feil oppstod',
  NOT_FOUND: 'Kunne ikke finne den forespurte ressursen',
  NO_FILE_FORMAT_SELECTED: 'Ingen filformat valgt, velg enten .xslx eller .csv for å laste ned',

  NO_FILE_SELCETED: 'Velg en fil før du klikker last opp',
  MULTIPLE_SELECTION_NOT_ALLOWED: 'Kun en fil kan lastes opp om gangen',
  UNSUPPORTED_CONTENT_TYPE: 'Filtypen du forsøkte å laste opp støttes ikke',
  CONTENT_TO_LARGE: 'Filen er for stor, maks størrelse er 10MB',
  INVALID_EXCEL_FORMAT: 'Filen du forsøkte å laste opp er ikke i riktig format, sjekk fil og prøv igjen',
  UPLOAD_UNAVAILABLE: 'Kunne ikke laste opp filen, prøv igjen senere',
  UPLOAD_REJECTED: 'Filen ble ikke akseptert, sjekk innholdet og prøv igjen',
  UPLOAD_SUCCESS: 'Opplasting vellykket',

  RIVER_NOT_SELECTABLE: 'Elven er ikke valgbar på grunn av filter, endre filter så prøv på nytt',
  STATION_NOT_SELECTABLE: 'Stasjonen er ikke valgbar på grunn av filter, endre filter så prøv på nytt',
  NO_RIVERS_SELECTED: 'Ingen elver valgt, velg en eller flere elver før du klikker last ned',
  NO_STATIONS_SELECTED: 'Ingen stasjoner valgt, velg en eller flere stasjoner før du klikker last ned',
  ERROR_GENERATING_FILE: 'En feil oppstod under nedlasting av filen',

  POSTGREST_UNAVAILABLE: 'Kunne ikke hente data fra serveren, prøv igjen senere',
  ERROR_PLOTTING_DATA: 'En feil oppstod under plotting av data',

  AUTH_UNAVAILABLE: 'Kunne ikke autentisere brukeren, prøv igjen senere',
  UNAUTHORIZED: 'Du er ikke logget inn, logg inn før du prøver igjen',
  AUTH_REJECTED: 'Brukernavn eller passord er feil, prøv igjen',
  AUTH_SUCCESS: 'Innlogging vellykket',
  LOGOUT_SUCCESS: 'Utlogging vellykket',
  REFRESH_SUCCESS: 'Du ble logget inn på nytt, last inn siden på nytt for å fortsette',

  INVALID_TEXT: 'Teksten du skrev inneholder ugyldige tegn',
  INVALID_PASSWORD: 'Passordet du skrev inneholder ugyldige tegn',
  INVALID_NUMBER: 'Tallet du skrev inn er ugyldig'

}

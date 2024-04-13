export const FEEDBACK_TYPES = {
  SUCCESS: 'SUCCESS',
  INFO: 'INFO',
  ERROR: 'ERROR'
}

export const FEEDBACK_CODES = {
  CREATED: 'CREATED',
  INFO: 'INFO',
  GENERIC: 'GENERIC',
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
  UNAUTHORIZED: 'UNAUTHORIZED',
  CONTENT_TO_LARGE: 'CONTENT_TO_LARGE',
  UNSUPPORTED_CONTENT_TYPE: 'UNSUPPORTED_CONTENT_TYPE',
  POSTGREST_UNAVAILABLE: 'POSTGREST_UNAVAILABLE',
  UPLOAD_UNAVAILABLE: 'UPLOAD_UNAVAILABLE',
  UPLOAD_REJECTED: 'UPLOAD_REJECTED',
  UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
  AUTH_UNAVAILABLE: 'AUTH_UNAVAILABLE',
  AUTH_REJECTED: 'AUTH_REJECTED',
  AUTH_SUCCESS: 'AUTH_SUCCESS'
}

export const FEEDBACK_MESSAGES = {
  UPLOAD_SUCCESS: 'Opplasting vellykket',
  GENERIC: 'En feil oppstod',
  ERROR_PLOTTING_DATA: 'En feil oppstod under plotting av data',
  NO_FILE_SELCETED: 'Velg en fil før du klikker last opp',
  NO_FILE_FORMAT_SELECTED: 'Ingen filformat valgt, velg enten .xslx eller .csv for å laste ned',
  NOT_FOUND: 'Kunne ikke finne den forespurte ressursen',
  RIVER_NOT_SELECTABLE: 'Elven er ikke valgbar på grunn av filter, endre filter så prøv på nytt',
  STATION_NOT_SELECTABLE: 'Stasjonen er ikke valgbar på grunn av filter, endre filter så prøv på nytt',
  NO_RIVERS_SELECTED: 'Ingen elver valgt, velg en eller flere elver før du klikker last ned',
  NO_STATIONS_SELECTED: 'Ingen stasjoner valgt, velg en eller flere stasjoner før du klikker last ned',
  ERROR_GENERATING_FILE: 'En feil oppstod under nedlasting av filen',
  FORBIDDEN: 'Handlingen du utførte ble ikke akseptert',
  MULTIPLE_SELECTION_NOT_ALLOWED: 'Kun en fil kan lastes opp om gangen',
  UNAUTHORIZED: 'Du har ikke tillatelse til å utføre handlingen du forsøkte',
  CONTENT_TO_LARGE: 'Filen du forsøkte å laste opp er for stor',
  UNSUPPORTED_CONTENT_TYPE: 'Filtypen du forsøkte å laste opp støttes ikke',
  POSTGREST_UNAVAILABLE: 'Kunne ikke hente data fra serveren, prøv igjen senere',
  UPLOAD_UNAVAILABLE: 'Kunne ikke laste opp filen, prøv igjen senere',
  UPLOAD_REJECTED: 'Filen ble ikke akseptert, sjekk innholdet og prøv igjen',
  AUTH_UNAVAILABLE: 'Kunne ikke autentisere brukeren, prøv igjen senere',
  AUTH_REJECTED: 'Brukernavn eller passord er feil, prøv igjen',
  AUTH_SUCCESS: 'Innlogging vellykket'
}

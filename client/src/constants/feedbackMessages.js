const FEEDBACK_TYPES = {
  SUCCESS: 'SUCCESS',
  INFO: 'INFO',
  ERROR: 'ERROR'
}

const FEEDBACK_CODES = {
  CREATED: 'CREATED',
  INFO: 'INFO',
  GENERIC: 'GENERIC',
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
  UNAUTHORIZED: 'UNAUTHORIZED',
  CONTENT_TO_LARGE: 'CONTENT_TO_LARGE',
  UNSUPPORTED_CONTENT_TYPE: 'UNSUPPORTED_CONTENT_TYPE',
  POSTGREST_UNAVAILABLE: 'POSTGREST_UNAVAILABLE',
  AUTH_UNAVAILABLE: 'AUTH_UNAVAILABLE'
}

const FEEDBACK_MESSAGES = {
  CREATED: 'Opplasting vellykket',
  GENERIC: 'En feil oppstod',
  NOT_FOUND: 'Kunne ikke finne den forespurte ressursen',
  FORBIDDEN: 'Handlingen du utførte ble ikke akseptert',
  UNAUTHORIZED: 'Du har ikke tillatelse til å utføre handlingen du forsøkte',
  CONTENT_TO_LARGE: 'Filen du forsøkte å laste opp er for stor',
  UNSUPPORTED_CONTENT_TYPE: 'Filtypen du forsøkte å laste opp støttes ikke',
  POSTGREST_UNAVAILABLE: 'Kunne ikke hente data fra serveren, prøv igjen senere',
  AUTH_UNAVAILABLE: 'Kunne ikke autentisere brukeren, prøv igjen senere'
}

export default { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES }
export const config = {
  // ---------------------------------------------------------------------------
  // -- Server config
  // ---------------------------------------------------------------------------
  server: {
    protocol: process.env.RATP_PROTOCOL || "http",
    port: process.env.RATP_PORT || "3300",
    host: process.env.RATP_HOST || "localhost",
  },
  // ---------------------------------------------------------------------------
  // -- Logs config
  // ---------------------------------------------------------------------------
  logs: {
    level: process.env.RATP_LOGS_LEVEL || "debug",
    name: process.env.RATP_LOGS_NAME || "ratp-technical-test",
  },
};

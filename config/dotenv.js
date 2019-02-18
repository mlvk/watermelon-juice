// config/dotenv.js
module.exports = function() {
  return {
    clientAllowedKeys: ['API_HOST', 'LOG_ENTRIES_KEY'],
    // Fail build when there is missing any of clientAllowedKeys environment variables.
    // By default false.
    failOnMissingKey: false,
  };
};

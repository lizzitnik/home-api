exports.PORT = process.env.PORT || 3001
exports.DATABASE_URL =
  'mongodb://localhost/home-api'
exports.TEST_DATABASE_URL =
  //process.env.TEST_DATABASE_URL ||
  'mongodb://localhost/home-api-test'
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || "7d"

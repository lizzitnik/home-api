exports.PORT = process.env.PORT || 3001
exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  'mongodb://localhost/home-api'
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  'mongodb://localhost/home-api'
exports.JWT_SECRET = process.env.JWT_SECRET
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || "7d"

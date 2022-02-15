require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET ,
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER
}
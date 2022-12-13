const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(user_id, first_name, email, address, mobile, role) {
  const payload = {
    userId: user_id,
    first_name: first_name,
    email: email,
    address: address,
    mobile: mobile,
    role: role,
  }

  return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 60 * 60 })
}

module.exports = jwtGenerator;
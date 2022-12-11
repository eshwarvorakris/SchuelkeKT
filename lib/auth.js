const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = class {
  generateToken(data) {
    var token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 60 });
    return token;
  }

  verify(token, res) {
    let tokenStatus = jwt.decode(token, process.env.JWT_SECRET);
    if (!tokenStatus) {
      res.send({ message: "login please" }).status("401");
    }
    return tokenStatus;
  }
};

module.exports = new Auth();

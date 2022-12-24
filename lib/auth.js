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
      res.status("401").send({ message: "login please" });
    }
    return tokenStatus;
  }
};

module.exports = new Auth();

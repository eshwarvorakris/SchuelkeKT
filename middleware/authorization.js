const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async(req, res, next) => {
  try {
    console.log(req.header("token"));
    const jwtToken = req.header("token");
    if(!jwtToken){
      console.log("not authorized");
      return res.status(401).json("You Are Not Authorized");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.userId = payload.userId;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json("You Are Not Authorized");
  }
}
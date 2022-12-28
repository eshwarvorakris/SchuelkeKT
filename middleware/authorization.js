const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async(req, res, next) => {
  try {
    console.log(req.headers["authorization"]);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
      console.log("not authorized");
      return res.status(401).json("You Are Not Authorized");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = payload.id;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json("You Are Not Authorized");
  }
}
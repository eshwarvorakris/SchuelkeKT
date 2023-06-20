const jwt = require("jsonwebtoken");
require('dotenv').config();

const Authorization = class {

  async verifyUser(req, res, next) {
    try {
      console.log(req.headers["authorization"]);
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        console.log("Token Not Found");
        return res.status(401).json("You Are Not Authorized");
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = payload.id;
      req.userRole = payload.role;
      req.userCountry = payload.country;
      req.userName = payload.full_name;
      req.userEmail = payload.email;
      req.userEmpCode = payload.user_id;
      next();
    } catch (err) {
      console.error(err.message);
      return res.status(401).json("You Are Not Authorized");
    }
  }

  async verifyAdmin(req, res, next) {
    try {
      //console.log(req.headers["authorization"]);
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        console.log("Token Not Found");
        return res.status(401).json("You Are Not Authorized");
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.role != "admin") {
        console.log("Not Admin");
        return res.status(401).json("You Are Not Authorized");
      }
      req.userId = payload.id;
      req.userRole = payload.role;
      req.userCountry = payload.country;
      req.userName = payload.full_name;
      req.userEmail = payload.email;
      req.userEmpCode = payload.user_id;
      next();
    } catch (err) {
      console.error(err.message);
      return res.status(401).json("You Are Not Authorized");
    }
  }

  async verifyAdminTrainer(req, res, next) {
    try {
      //console.log(req.headers["authorization"]);
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        console.log("Token Not Found");
        return res.status(401).json("You Are Not Authorized");
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.role == "trainer" || payload.role == "admin") {
        req.userId = payload.id;
        req.userRole = payload.role;
        req.userCountry = payload.country;
        req.userName = payload.full_name;
        req.userEmail = payload.email;
        req.userEmpCode = payload.user_id;
        next();
      }
      else {
        console.log("Not Admin Or Trainer current role : " + payload.role);
        return res.status(401).json("You Are Not Authorized To Perform This Operation");
      }
    } catch (err) {
      console.error(err.message);
      return res.status(401).json("You Are Not Authorized");
    }
  }

  async verifyTrainer(req, res, next) {
    try {
      //console.log(req.headers["authorization"]);
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        console.log("Token Not Found");
        return res.status(401).json("You Are Not Authorized");
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.role != "trainer") {
        console.log("Not Trainer");
        return res.status(401).json("You Are Not Authorized To Perform This Operation");
      }
      req.userId = payload.id;
      req.userRole = payload.role;
      req.userCountry = payload.country;
      req.userName = payload.full_name;
      req.userEmail = payload.email;
      req.userEmpCode = payload.user_id;
      next();
    } catch (err) {
      console.error(err.message);
      return res.status(401).json("You Are Not Authorized");
    }
  }

  async verifyTrainee(req, res, next) {
    try {
      //console.log(req.headers["authorization"]);
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        console.log("Token Not Found");
        return res.status(401).json("You Are Not Authorized");
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.role != "trainee") {
        console.log("You Are Not Authorized To Perform This Operation");
        return res.status(401).json("You Are Not Authorized");
      }
      req.userId = payload.id;
      req.userRole = payload.role;
      req.userCountry = payload.country;
      req.userName = payload.full_name;
      req.userEmail = payload.email;
      req.userEmpCode = payload.user_id;
      next();
    } catch (err) {
      console.error(err.message);
      return res.status(401).json("You Are Not Authorized");
    }
  }
};

module.exports = new Authorization();
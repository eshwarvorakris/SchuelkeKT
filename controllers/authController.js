const express = require("express");
const validator = require("Validator");
const router = express.Router();
const _ = require("lodash");
const auth = require("../lib/auth");
const customValidation = require("../lib/customValidation");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
exports.profile = function (req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const user = auth.verify(token, res);
  res.send({ data: user });
};

exports.login = function (req, res) {
  const rules = {
    email: "required|email",
    password: "required",
  };
  const validation = validator.make(req.body, rules);
  if (validation.fails()) {
    return res.status(422).send(
      {
        message: _.chain(validation.getErrors()).flatMap().head(),
        errors: validation.getErrors(),
      }
    );
  }
  User.findOne({
    attributes: [
      'id', 'full_name', 'contact_no', 'dob', 'address', 'role', 'password'],
    where: { email: req.body.email, status: 'active' }
  }).then(async (result) => {
    const validPassword = await bcrypt.compare(req.body.password, result.password);
    if (!validPassword) {
      return res.status(401).json("Email Or Password is incorect");
    }
    var userData = {
      id: result.dataValues.id,
      full_name: result.dataValues.full_name,
      contact_no: result.dataValues.contact_no,
      dob: result.dataValues.dob,
      address: result.dataValues.address,
      role: result.dataValues.role
    };
    //console.log(userData);
    var access_token = auth.generateToken(userData);
    res.send({ data: userData, access_token });
  }).catch((error) => {
    console.error("Unable To Find User : ", error);
    res.status(422).send(
      {
        message: "Unable To Find User",
        errors: error.errors,
      }
    );
  });
};

exports.registration = async function (req, res) {
  const data = req.body;
  const rules = {
    full_name: "required",
    email: "required|email|unique:users,email",
    contact_no: "required|unique:users,contact_no",
    password:
      "required|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$|confirmed",
  };
  const validation = validator.make(req.body, rules, {
    "password.regex":
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
  });
  validation.extend(
    "unique", customValidation.unique,
    ":attr already exists"
  );
  
  if (await validation.passes()) {
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    User.create(req.body).then((result) => {
      res.send({ data: result });
    }).catch((error) => {
      console.error("Unable To Add User : ", error);
      res.status(422).send(
        {
          message: "Unable To Add User",
          errors: error.errors,
        }
      );
    });
  }
  return res.status(422).send(
    {
      message: _.chain(validation.getErrors()).flatMap().head(),
      errors: validation.getErrors(),
    }
  );
};


exports.addTrainer = async function (req, res) {
  const data = req.body;
  const rules = {
    full_name: "required",
    email: "required|email|unique:users,email",
    contact_no: "required|unique:users,contact_no",
    password:
      "required|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$|confirmed",
  };
  const validation = validator.make(req.body, rules, {
    "password.regex":
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
  });
  validation.extend(
    "unique", customValidation.unique,
    ":attr already exists"
  );

  if (await validation.passes()) {
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    req.body.role = "trainer";
    User.create(req.body).then((result) => {
      res.send({ data: result });
    }).catch((error) => {
      console.error("Unable To Add User : ", error);
      res.status(422).send(
        {
          message: "Unable To Add User",
          errors: error.errors,
        }
      );
    });
  }
  return res.status(422).send(
    {
      message: _.chain(validation.getErrors()).flatMap().head(),
      errors: validation.getErrors(),
    }
  );
};

exports.addTrainee = async function (req, res) {
  const data = req.body;
  const rules = {
    full_name: "required",
    email: "required|email|unique:users,email",
    contact_no: "required|unique:users,contact_no",
    password:
      "required|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$|confirmed",
  };
  const validation = validator.make(req.body, rules, {
    "password.regex":
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
  });
  validation.extend(
    "unique", customValidation.unique,
    ":attr already exists"
  );
  
  if (await validation.passes()) {
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    req.body.role = "trainee";
    User.create(req.body).then((result) => {
      res.send({ data: result });
    }).catch((error) => {
      console.error("Unable To Add User : ", error);
      res.status(422).send(
        {
          message: "Unable To Add User",
          errors: error.errors,
        }
      );
    });
  }
  return res.status(422).send(
    {
      message: _.chain(validation.getErrors()).flatMap().head(),
      errors: validation.getErrors(),
    }
  );
  
};
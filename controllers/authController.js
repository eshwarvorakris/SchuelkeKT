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
    res.send(
      {
        message: _.chain(validation.getErrors()).flatMap().head(),
        errors: validation.getErrors(),
      },
      422
    );
  }
  var access_token = auth.generateToken(req.body);
  res.send({ data: req.body, access_token });
};

exports.registration = function (req, res) {
  const data = req.body;
  const rules = {
    first_name: "required",
    last_name: "required",
    email: "required|email",
    mobile: "required",
    // password: 'required|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$|confirmed|',
    password:
      "required|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$|confirmed|",
  };
  const validation = validator.make(req.body, rules, {
    "password.regex":
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
  });
  validation.extend(
    "unique",customValidation.unique,
    ":attr already exisitdd"
  );
  if (validation.fails()) {
    res.send(
      {
        message: _.chain(validation.getErrors()).flatMap().head(),
        errors: validation.getErrors(),
      },
      422
    );
  }
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  User.create(req.body).then((result) => {
    res.send({ data: result });
  });
};

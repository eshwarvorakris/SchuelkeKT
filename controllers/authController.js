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

exports.login = async function (req, res) {
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
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  await User.findOne({
    where: { email:req.body.email}
  }).then(async (result) => {
    var access_token = auth.generateToken(_.pick(result?.dataValues,['role','id']));
    res.send({ data: result?.dataValues, access_token });
  });
};


exports.registration = async function (req, res) {
  const data = req.body;
  const rules = {
    name: "required",
    email: "required|email|unique:users,email",
    mobile: "required|unique:users,mobile",
    password:
      "required|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$|confirmed",
  };
  const validation =validator.make(req.body, rules, {
    "password.regex":
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
  });
   validation.extend(
    "unique", customValidation.unique,
    ":attr already existed"
  );

  if (await validation.passes()) {

    req.body.password = bcrypt.hashSync(req.body.password, salt);

    return User.create(req.body).then((result) => {
      res.send({ data: result });
    });
  }
  return res.status(422).send(
    {
      message: _.chain(validation.getErrors()).flatMap().head(),
      errors: validation.getErrors(),
    }
  );
};
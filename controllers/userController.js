const express = require("express");
const { getPaginate } = require("../lib/helpers");
const User = require("../models/User.model");
const validator = require("Validator");
const bcrypt = require("bcrypt");
const customValidation = require("../lib/customValidation");
const { Op } = require("sequelize");
const _ = require("lodash");
const userController = class {
  async index(req, res) {
    await User
      .findAndCountAll({ offset: pageNumber * pageLimit, limit: pageLimit, where: req.query, order: [orderByColumn] })
      .then((result) => {
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }

  async getNexUserId(req, res) {
    const userId = await User.max('id');
    res.send({ data: userId });
  }
  async getTrainee(req, res) {
    await User
      .findAndCountAll({
        where: {
          role: "trainee"
        }, offset: req.query.page, limit: 15
      })
      .then((result) => {
        res.send(getPaginate(result, req.query.page ?? 1, 15));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }

  async getTrainer(req, res) {
    await User
      .findAndCountAll({
        where: {
          role: "trainer"
        }, offset: req.query.page, limit: 15
      })
      .then((result) => {
        res.send(getPaginate(result, req.query.page ?? 1, 15));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }

  async addUser(req, res) {
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
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
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
    else
    {
      return res.status(422).send(
        {
          message: _.chain(validation.getErrors()).flatMap().head(),
          errors: validation.getErrors(),
        }
      );
    }
  };

  async store(req, res) {
    await User
      .create(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async updateProfile(req, res) {
    const user = await User.findByPk(req.userId);
    if (user) {
      await User
        .update(req.body, { where: { id: req.userId } })
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.error("Unable To Update Profile : ", error);
          return res.status(422).send(
            {
              message: "Unable To Update Profile. Try Again Later",
            }
          );
        });
      // user.update(req.body);
      // return res.send({ data: user });
    }
    else {
      return res.status(422).send(
        {
          message: "Unable to find user",
        }
      );
    }
  }
  async show(req, res) {
    const user = await User.findByPk(req.params.id);
    res.send({ data: user });
  }
  async update(req, res) {
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.update(req.body);
      return res.send({ data: user });
    }
    return res.status(422).send(
      {
        message: "Unable to find user",
      }
    );
  }

  async destroy(req, res) {
    const user = await User.destroy({ where: { id: req.params.id } }).then((result) => {
      return { message: "user Deleted" };
    });
    res.send(user);
  }
};

module.exports = new userController();

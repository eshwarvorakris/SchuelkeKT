const express = require("express");
const { getPaginate } = require("../lib/helpers");
const User = require("../models/User.model");
const Course = require("../models/Course.model");
const CourseView = require("../models/Course_views.model");
const validator = require("Validator");
const bcrypt = require("bcrypt");
const customValidation = require("../lib/customValidation");
const { Sequelize, Op } = require("sequelize");
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
    console.log("request = ", req?.query);
    var userId = await User.max('user_id', { where: { role: "trainee" } });
    var userIdInitial = 50000000;
    if (req.query.role !== undefined) {
      userIdInitial = 10000000;
      userId = await User.max('user_id', { where: req?.query });
    }
    console.log("userid = ", userId);
    if (userId == 0 || userId == null) {
      userId = userIdInitial;
    }
    userId++;
    //const userId = await User.max('id');
    res.send({ data: userId });
  }
  async getTrainee(req, res) {

    if (req.query.filter) {
      if (req.query.filter == "country") {
        if (req.query.search) {
          req["query"][Op.or] = [
            { 'country': { [Op.iLike]: `%${req.query.search}%`, }, },
          ];
        }
      } else if (req.query.filter == "status") {
        if (req.query.filterParam) {
          if(req.query.filterParam != "all") {
            req["query"][Op.and] = [
              { 'status': { [Op.iLike]: `%${req.query.filterParam}%` } },
            ];
          }

          if (req.query.search) {
            if(req.query.search != "") {
              req["query"][Op.or] = [
                { 'full_name': { [Op.iLike]: `%${req.query.search}%`, }, },
                { 'email': { [Op.iLike]: `%${req.query.search}%`, }, },
                { 'contact_no': { [Op.iLike]: `%${req.query.search}%`, }, },
                { 'country': { [Op.iLike]: `%${req.query.search}%`, }, },
                { 'status': { [Op.iLike]: `%${req.query.search}%` } },
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('user_id'), 'varchar'),
                  {[Op.iLike]: `%${req.query.search}%`}
                ),
              ];
            }
          }
          console.log("check");
          delete req.query.filterParam;
        }
      } else if (req.query.filter == "all") {
        if(req.query.search) {
          req["query"][Op.or] = [
            { 'full_name': { [Op.iLike]: `%${req.query.search}%`, }, },
            { 'email': { [Op.iLike]: `%${req.query.search}%`, }, },
            { 'contact_no': { [Op.iLike]: `%${req.query.search}%`, }, },
            { 'country': { [Op.iLike]: `%${req.query.search}%`, }, },
            { 'status': { [Op.iLike]: `%${req.query.search}%` } },
            Sequelize.where(
              Sequelize.cast(Sequelize.col('user_id'), 'varchar'),
              {[Op.iLike]: `%${req.query.search}%`}
            ),
          ];
        }
      }
      delete req.query.filterParam;
      delete req.query.search;
      delete req.query.filter;
    } else if (req.query.search) {
      req["query"][Op.or] = [
        { 'full_name': { [Op.iLike]: `%${req.query.search}%`, }, },
        { 'email': { [Op.iLike]: `%${req.query.search}%`, }, },
        { 'contact_no': { [Op.iLike]: `%${req.query.search}%`, }, },
        { 'country': { [Op.iLike]: `%${req.query.search}%`, }, },
        { 'status': { [Op.iLike]: `%${req.query.search}%` } },
      ];
      delete req.query.search;
    }
    req["query"]["role"] = "trainee";

    await User
      .findAndCountAll({
        where: req.query,
        offset: req.query.page, limit: pageLimit, order: [orderByColumn]
      })
      .then(async (result) => {
        let allUsers = [];
        for (const curUser of result.rows) {
          const count = await CourseView.count({ where: { trainee_id: curUser?.dataValues?.id } });
          curUser.dataValues.totalCourse = count;
          allUsers.push(curUser);
          //console.log(count);
        }
        result.rows = allUsers;
        res.send(getPaginate(result, req.query.page ?? pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }

  async getTrainer(req, res) {

    if (req.query.filter) {
      if (req.query.filter == "country") {
        if (req.query.search) {
          req["query"][Op.or] = [
            { 'country': { [Op.iLike]: `%${req.query.search}%`, }, },
          ];
        }
      } else if (req.query.filter == "status") {
        if (req.query.filterParam) {
          if(req.query.filterParam != "all") {
            req["query"][Op.and] = [
              { 'status': { [Op.iLike]: `%${req.query.filterParam}%` } },
            ];
          }

          if (req.query.search) {
            if(req.query.search != "") {
              req["query"][Op.or] = [
                { 'full_name': { [Op.iLike]: `%${req.query.search}%`, }, },
                { 'email': { [Op.iLike]: `%${req.query.search}%`, }, },
                { 'contact_no': { [Op.iLike]: `%${req.query.search}%`, }, },
                { 'country': { [Op.iLike]: `%${req.query.search}%`, }, },
                { 'status': { [Op.iLike]: `%${req.query.search}%` } },
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('user_id'), 'varchar'),
                  {[Op.iLike]: `%${req.query.search}%`}
                ),
              ];
            }
          }
          //console.log("check");
          delete req.query.filterParam;
        }
      } else if (req.query.filter == "all") {
        if(req.query.search) {
          req["query"][Op.or] = [
            { 'full_name': { [Op.iLike]: `%${req.query.search}%`, }, },
            { 'email': { [Op.iLike]: `%${req.query.search}%`, }, },
            { 'contact_no': { [Op.iLike]: `%${req.query.search}%`, }, },
            { 'country': { [Op.iLike]: `%${req.query.search}%`, }, },
            { 'status': { [Op.iLike]: `%${req.query.search}%` } },
            Sequelize.where(
              Sequelize.cast(Sequelize.col('user_id'), 'varchar'),
              {[Op.iLike]: `%${req.query.search}%`}
            ),
          ];
        }
      }
      delete req.query.filterParam;
      delete req.query.search;
      delete req.query.filter;
    } else if (req.query.search) {
      req["query"][Op.or] = [
        { 'full_name': { [Op.iLike]: `%${req.query.search}%`, }, },
        { 'email': { [Op.iLike]: `%${req.query.search}%`, }, },
        { 'contact_no': { [Op.iLike]: `%${req.query.search}%`, }, },
        { 'country': { [Op.iLike]: `%${req.query.search}%`, }, },
        { 'status': { [Op.iLike]: `%${req.query.search}%` } },
      ];
      delete req.query.search;
    }
    req["query"]["role"] = "trainer";
    await User
      .findAndCountAll({
        where: req.query,
        offset: req.query.page, limit: pageLimit, order: [orderByColumn]
      })
      .then(async (result) => {
        //console.clear();
        //console.log(result.rows)
        let allUsers = [];
        for (const curUser of result.rows) {
          const count = await Course.count({ where: { trainer_id: curUser?.dataValues?.id } });
          curUser.dataValues.totalCourse = count;
          allUsers.push(curUser);
          //console.log(count);
        }
        result.rows = allUsers;
        res.send(getPaginate(result, req.query.page ?? pageNumber, pageLimit));
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

      var userId = await User.max('user_id', { where: { role: "trainee" } });
      var userIdInitial = 50000000;
      if (req.body.role) {
        userIdInitial = 10000000;
        userId = await User.max('user_id', { where: { role: req.body.role } });
      }

      if (userId == 0 || userId == null) {
        userId = userIdInitial;
      }
      userId++;
      req.body.user_id = userId;
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
    else {
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
          User.findByPk(req.userId).then(function (updateUser) {
            res.send(updateUser);
          });
          //res.send(updateUser);
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
    if (req.params.id !== undefined && req.params.id !== "undefined") {
      const user = await User.findByPk(req.params.id);
      res.send({ data: user });
    } else {
      return res.status(422).send(
        {
          message: "Please Re-Select User",
        }
      );
    }
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

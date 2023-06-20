const express = require("express");
const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Course = require("../models/Course.model");
const User = require("../models/User.model");
const { Sequelize, Op, DataTypes } = require("sequelize");
const Assigned_courses = require("../models/Assigned_courses.model");
const { traineeCourseEnrollmentToTrainee } = require("../lib/emails")
const courseAssignController = class {
  async index(req, res) {
    if (req?.query?.id) {
      const course_id = req.query.id;
      User.hasMany(Assigned_courses, { foreignKey: 'trainee_id' });
      await User.findAndCountAll({
        include: [
          {
            model: Assigned_courses,
            where: { course_id: course_id },
          }
        ],
        offset: pageNumber * pageLimit, limit: pageLimit, order: [orderByColumn]
      })
      .then((users) => res.send(getPaginate(users, pageNumber, pageLimit)))

      /* await User.sequelize.query('SELECT users.* FROM users INNER JOIN assigned_courses ON users.id=assigned_courses.trainee_id WHERE assigned_courses.course_id='+course_id+' LIMIT '+pageLimit+' OFFSET '+pageNumber * pageLimit, { type: User.sequelize.QueryTypes.SELECT })
        .then((result) => {
          
          res.send(result);
        })
        .catch((error) => {
          console.error("Failed to retrieve data : ", error);
        }); */
    } else {
      res.status(422).send(
        {
          message: "Please Select Course"
        }
      );
    }
  }
  async store(req, res) {
    const data = req.body;
    const rules = {
      course_id: "required",
      trainee_ids: "required"
    };
    const validation = validator.make(req.body, rules);
    if (validation.fails()) {
      res.status(422).send(
        {
          message: _.chain(validation.getErrors()).flatMap().head(),
          errors: validation.getErrors(),
        }
      );
    } else {
      var inCount = 0;
      var totalCount = 0;
      req.body.trainee_ids.forEach(async (trainee_id) => {
        totalCount++;
        await Assigned_courses
          .findOrCreate({
            where: { course_id: req.body.course_id, trainee_id: trainee_id },
            defaults: {
              assigned_by_id: req.userId,
            }
          }).then((result) => {
            inCount++;
          }).catch((error) => {
            console.error("Failed to retrieve data : ", error.message);
          });
      });
      res.send({ totalCount: totalCount, inCount: inCount })
    }
  }
  async show(req, res) {
    if (req.params.id !== undefined && req.params.id != "undefined") {
      const course = await Course.findByPk(req.params.id, { include: ['category'] });
      if (course) {
        return res.send({ data: course });
      }
      return res.status(422).send(
        {
          message: "Course not Found",
        }
      );
    }
    return res.status(422).send(
      {
        message: "Please Re-Select Course",
      }
    );
  }

  async destroy(req, res) {
    //console.clear();
    await Assigned_courses.destroy({ where: { id: req.params.id } }).then((result) => {
      res.send({ message: "Course Unassigned" });
    });
  }

  async multipleDestroy(req, res) {
    try {
      const ids = req.body.ids.split(",")
      await Assigned_courses.destroy({ where: { id: ids } }).then((result) => {
        res.send({ message: "Course Unassigned" });
      });
    } catch (error) {
      console.log(error.message)
      return res.status(422).send(
        {
          message: "Please try again later",
          err_message: error.message
        }
      );
    }
    
  }
};

module.exports = new courseAssignController();

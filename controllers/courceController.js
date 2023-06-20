const express = require("express");
const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Course = require("../models/Course.model");
const Module = require("../models/Module.model");
const User = require("../models/User.model");
const { Sequelize, Op, DataTypes } = require("sequelize");
const Assigned_courses = require("../models/Assigned_courses.model");
const CourseView = require("../models/Course_views.model");
const AssignmentAttempt = require("../models/Assignment_attempt.model");
const Revisit = require("../models/Course_revisit.model");
const { newCourseAddedMail, courseModified, courseModifiedToTrainer } = require("../lib/emails")
const courseController = class {
  async index(req, res) {
    let search = req.query.search;
    if (req.query.filter) {
      if (req.query.filter == "category") {
        if (req.query.filterParam) {
          if (req.query.filterParam != "all") {
            req["query"][Op.and] = [
              { '$category.category_name$': { [Op.iLike]: `%${req.query.filterParam}%` } },
            ];
          }
          if (req.query.search) {
            if (req.query.search != "") {
              req["query"][Op.or] = [
                { 'course_name': { [Op.iLike]: `%${req.query.search}%`, }, },
                { '$category.category_name$': { [Op.iLike]: `%${req.query.search}%` } },
                { '$trainer.full_name$': { [Op.iLike]: `%${req.query.search}%` } },
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('week_duration'), 'varchar'),
                  { [Op.iLike]: `%${req.query.search}%` }
                ),
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('total_modules'), 'varchar'),
                  { [Op.iLike]: `%${req.query.search}%` }
                ),
              ];
            }
          }
        }
        delete req.query.filterParam;
      } else if (req.query.filter == "country") {
        if (req.query.filterParam) {
          if (req.query.filterParam != "all") {
            req["query"][Op.and] = [
              { '$trainer.country$': { [Op.iLike]: `%${req.query.filterParam}%` } },
            ];
          }

          if (req.query.search) {
            if (req.query.search != "") {
              req["query"][Op.or] = [
                { 'course_name': { [Op.iLike]: `%${req.query.search}%`, }, },
                { '$category.category_name$': { [Op.iLike]: `%${req.query.search}%` } },
                { '$trainer.full_name$': { [Op.iLike]: `%${req.query.search}%` } },
                { 'status': { [Op.iLike]: `%${req.query.search}%` } },
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('week_duration'), 'varchar'),
                  { [Op.iLike]: `%${req.query.search}%` }
                ),
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('total_modules'), 'varchar'),
                  { [Op.iLike]: `%${req.query.search}%` }
                ),
              ];
            }
          }
          delete req.query.filterParam;
        }
      } else if (req.query.filter == "status") {
        if (req.query.filterParam) {
          if (req.query.filterParam != "all") {
            req["query"][Op.and] = [
              { 'status': { [Op.iLike]: `%${req.query.filterParam}%` } },
            ];
          }

          if (req.query.search) {
            if (req.query.search != "") {
              req["query"][Op.or] = [
                { 'course_name': { [Op.iLike]: `%${req.query.search}%`, }, },
                { '$category.category_name$': { [Op.iLike]: `%${req.query.search}%` } },
                { '$trainer.full_name$': { [Op.iLike]: `%${req.query.search}%` } },
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('week_duration'), 'varchar'),
                  { [Op.iLike]: `%${req.query.search}%` }
                ),
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('total_modules'), 'varchar'),
                  { [Op.iLike]: `%${req.query.search}%` }
                ),
              ];
            }
          }
          delete req.query.filterParam;
        }
      } else if (req.query.filter == "all") {
        //console.log("check");
        if (req.query.search) {
          if (req.query.search != "") {
            req["query"][Op.or] = [
              { 'course_name': { [Op.iLike]: `%${req.query.search}%`, }, },
              { '$category.category_name$': { [Op.iLike]: `%${req.query.search}%` } },
              { '$trainer.full_name$': { [Op.iLike]: `%${req.query.search}%` } },
              { 'status': { [Op.iLike]: `%${req.query.search}%` } },
              Sequelize.where(
                Sequelize.cast(Sequelize.col('week_duration'), 'varchar'),
                { [Op.iLike]: `%${req.query.search}%` }
              ),
              Sequelize.where(
                Sequelize.cast(Sequelize.col('total_modules'), 'varchar'),
                { [Op.iLike]: `%${req.query.search}%` }
              ),
            ];
          }
        }
      }
      delete req.query.search;
      delete req.query.filter;
    } else if (req.query.search) {
      req["query"][Op.or] = [
        { 'course_name': { [Op.iLike]: `%${req.query.search}%`, }, },
        { '$category.category_name$': { [Op.iLike]: `%${req.query.search}%` } },
        { '$trainer.full_name$': { [Op.iLike]: `%${req.query.search}%` } },
        { '$trainer.country$': { [Op.iLike]: `%${req.query.search}%` } },
        { 'status': { [Op.iLike]: `%${req.query.search}%` } },
        Sequelize.where(
          Sequelize.cast(Sequelize.col('week_duration'), 'varchar'),
          { [Op.iLike]: `%${req.query.search}%` }
        ),
        Sequelize.where(
          Sequelize.cast(Sequelize.col('total_modules'), 'varchar'),
          { [Op.iLike]: `%${req.query.search}%` }
        ),
        /* Sequelize.where(
          Sequelize.cast(Sequelize.col('trainer.contact_no'), 'varchar'),
          {[Op.iLike]: `%${req.query.search}%`}
        ), */
      ];
      delete req.query.search;
    }
    if (req.userRole == "trainer") {
      req["query"]["trainer_id"] = req.userId;
    }
    if(req.query.year) {
      let dtString = req.query.year+'-01-01';
      let nextdtString = (parseInt(req.query.year) + 1)+'-01-01';
      req["query"]["created_at"] = {
        [Op.gte]: new Date(dtString), // Greater than or equal to January 1, 2022
        [Op.lt]: new Date(nextdtString), // Less than January 1, 2023
      };
      delete req.query.year;
    }
    

    if (req.userRole == "trainee") {
      req["query"]["status"] = { [Op.or]: ['active', 'approved'] }
      Course.hasMany(Assigned_courses, { foreignKey: 'course_id' });
      await Course
        .findAndCountAll({
          include: ["category", "trainer", {
            model: Assigned_courses,
            where: { trainee_id: req.userId },
          }],
          offset: pageNumber * pageLimit,
          limit: pageLimit,
          where: req.query,
          order: [orderByColumn]
        })
        .then((result) => {
          
          res.send(getPaginate(result, pageNumber, pageLimit));
        })
        .catch((error) => {
          console.error("Failed to retrieve data : ", error);
        });
    } else {
      await Course
        .findAndCountAll({ include: ["category", "trainer"], offset: pageNumber * pageLimit, limit: pageLimit, where: req.query, order: [orderByColumn] })
        .then(async (result) => {
          // console.clear();
          // console.log("================================================course=================================");
          let passing_rate = 0;
          let average_score = 0;
          let passed_trainee = 0;
          let total_trainee_attempt = 0;
          let total_score = 0;
          let i = 0;
          for (const item of result.rows) {
            passing_rate = 0;
            average_score = 0;
            passed_trainee = 0;
            total_trainee_attempt = 0;
            total_score = 0;

            total_trainee_attempt = await AssignmentAttempt.count({
              where: { course_id: item.id, status: 'submitted' }
            });

            passed_trainee = await AssignmentAttempt.count({
              where: {
                course_id: item.id, status: 'submitted', correct_percentage: {
                  [Op.gte]: 80
                }
              }
            });

            if (total_trainee_attempt > 0 && passed_trainee > 0) {
              passing_rate = Math.round((passed_trainee / total_trainee_attempt) * 100);
            }

            total_score = await AssignmentAttempt.sum('correct_percentage',
              { where: { course_id: item.id, status: 'submitted' } });

            if (total_score > 0 && total_trainee_attempt > 0) {
              average_score = Math.round(total_score / total_trainee_attempt);
            }

            result.rows[i].dataValues.passing_rate = passing_rate;
            result.rows[i].dataValues.average_score = average_score;
            //console.log("total_trainee_attempt",item.id);

            i++;
          }
          
          //console.log("================================================course=================================");
          res.send(getPaginate(result, pageNumber, pageLimit));
        })
        .catch((error) => {
          console.error("Failed to retrieve data : ", error);
        });
    }
  }
  async store(req, res) {
    const data = req.body;
    const rules = {
      course_name: "required",
      course_description: "required"
    };
    const validation = validator.make(req.body, rules);
    if (validation.fails()) {
      res.status(422).send(
        {
          message: _.chain(validation.getErrors()).flatMap().head(),
          errors: validation.getErrors(),
        }
      );
    }
    req.body.trainer_id = req.userId;
    req.body.country = req.userCountry;
    await Course
      .create(req.body)
      .then((result) => {
        newCourseAddedMail(req?.body?.course_name, "", req?.userName, req?.body?.week_duration, req?.body?.course_description)
        User.increment({ course_count: 1 }, { where: { id: req.userId } })
        res.send(result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
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

  async modules(req, res) {
    if (req.params.id !== undefined && req.params.id != "undefined") {
      const module = await Module.findAll({ where: { course_id: req.params.id }, order: [orderByColumn] });
      if (module) {
        return res.send({ data: module });
      }
      return res.status(422).send(
        {
          message: "module not Found",
        }
      );
    }
    return res.status(422).send(
      {
        message: "Please Re-Select Course",
      }
    );
  }

  async update(req, res) {
    // console.clear();
    // console.log("update query ", req.body);
    if (req.body?.status) {
      if (req.body?.status == "approved") {
        //req.body.status_update_on = 
      }
    }
    const course = await Course.findByPk(req.params.id);
    if (course) {
      const courseup = await course.update(req.body);
      courseModified(req?.body?.course_name, req?.userName);
      courseModifiedToTrainer(req?.body?.course_name, req?.userName);
      return res.send({ data: courseup });
    }
    return res.status(422).send(
      {
        message: "Course not found",
      }
    );
  }

  async destroy(req, res) {
    //console.clear();
    const coursefind = await Course.findByPk(req.params.id);
    if (coursefind) {
      //console.log(coursefind.trainer_id);
      const course = await Course.destroy({ where: { id: req.params.id } }).then((result) => {
        User.decrement({ course_count: 1 }, { where: { id: coursefind.trainer_id } })
        return { message: "Course Deleted" };
      });
      res.send(course);
    } else {
      return res.status(422).send(
        {
          message: "Course not update",
        }
      );
    }
  }

  async courseAnalytics(req, res) {
    let condition = {};
    if (req.body.country !== "all" && req.body.country !== undefined && req.body.country !== null) {
      condition.country = req.body.country;
    }

    if (req.body.category !== "all" && req.body.category !== undefined && req.body.category !== null) {
      condition.category_id = req.body.category;
    }
    await Course
      .findAndCountAll({
        offset: pageNumber * pageLimit,
        limit: pageLimit,
        where: condition,
        order: [orderByColumn]
      })
      .then(async (result) => {
        
        if (result.count > 0) {
          let trainee_enrolled = 0;
          let average_course_completion_time = 0;
          let passing_rate = 0;
          let average_score = 0;
          let average_no_of_attempt = 0;
          let course_id = 0;
          let passed_trainee = 0;
          let total_trainee_attempt = 0;
          let total_score = 0;
          let distinct_trainee_attempt = 0;
          let completionSec = 0;
          var i = 0;
          for (const item of result.rows) {
            trainee_enrolled = 0;
            average_course_completion_time = 0;
            passing_rate = 0;
            average_score = 0;
            average_no_of_attempt = 0;
            passed_trainee = 0;
            total_trainee_attempt = 0;
            total_score = 0;
            distinct_trainee_attempt = 0;
            completionSec = 0;

            course_id = item.id;

            trainee_enrolled = await Assigned_courses.count({
              distinct: true,
              col: 'trainee_id',
              where: { course_id: item.id }
            });

            completionSec = await CourseView.sum('viewed_seconds', { where: { status: 'completed', course_id: item.id } });
            if (completionSec > 0) {
              average_course_completion_time = Math.round(completionSec / 3600)
            }

            total_trainee_attempt = await AssignmentAttempt.count({
              where: { course_id: item.id, status: 'submitted' }
            });

            passed_trainee = await AssignmentAttempt.count({
              where: {
                course_id: item.id, status: 'submitted', correct_percentage: {
                  [Op.gte]: 80
                }
              }
            });

            if (total_trainee_attempt > 0 && passed_trainee > 0) {
              passing_rate = Math.round((passed_trainee / total_trainee_attempt) * 100);
            }

            total_score = await AssignmentAttempt.sum('correct_percentage',
              { where: { course_id: item.id, status: 'submitted' } });

            if (total_score > 0 && total_trainee_attempt > 0) {
              average_score = Math.round(total_score / total_trainee_attempt);
            }

            distinct_trainee_attempt = await AssignmentAttempt.count({
              distinct: true,
              col: 'trainee_id',
              where: { course_id: item.id, status: 'submitted' }
            });

            if (total_trainee_attempt > 0) {
              average_no_of_attempt = Math.round(total_trainee_attempt / distinct_trainee_attempt);
            }

            result.rows[i].dataValues.trainee_enrolled = trainee_enrolled;
            result.rows[i].dataValues.average_course_completion_time = average_course_completion_time;
            result.rows[i].dataValues.passing_rate = passing_rate;
            result.rows[i].dataValues.average_score = average_score;
            result.rows[i].dataValues.average_no_of_attempt = average_no_of_attempt;
            //console.log("total_trainee_attempt = >", total_trainee_attempt);
            i++;
          }
        }
        //console.log(result);
        
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
        res.status(422).send({ message: "Please Try Again Later", error: error.message });
      });
  }

  async assignedTraineeCourses(req, res) {
    let condition = {};
    condition.status = "approved";
    if(req.userRole == "trainer") {
      condition.trainer_id = req.userId;
    } 
    if (req.body.trainee_id) {
      await Assigned_courses.findAll(
        { where: {trainee_id: req.body.trainee_id},
        include: [
          {
            model: Course,
            as: 'course',
            include: ['category'],
            where: condition ,
          }
        ]
      }).then(async (result) => {
        
        if(result) {
          let i = 0;
          let revisit = 0;
          console.clear();

          for (const item of result) {
            revisit = 0;
            revisit = await Revisit.findAndCountAll({
              where: {
                trainee_id: req.body.trainee_id,
                course_id: item.course_id,
              },
            });
            console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",revisit);
            result[i].dataValues.revisit = revisit;
            i++;
          }
          res.send(result)
        } else {
          res.status(404).send({ message: "No courses assigned to this trainee" })
        }
        
      }).catch((err) => {
        res.status(422).send({ message: "Please Try Again Later", error: err.message })
      })
    } else {
      res.status(422).send({ message: "Please Select trainee" })
    }
  }
};

module.exports = new courseController();

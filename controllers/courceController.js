const express = require("express");
const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Course = require("../models/Course.model");
const Module = require("../models/Module.model");
const User = require("../models/User.model");
const { Sequelize, Op, DataTypes } = require("sequelize");
const Category = require("../models/Category.model");
const courseController = class {
  async index(req, res) {
    let search = req.query.search;
    if(req.query.filter) {
      if(req.query.filter == "category") {
        if (req.query.filterParam) {
          if(req.query.filterParam != "all") {
            req["query"][Op.and] = [
              { '$category.category_name$': { [Op.iLike]: `%${req.query.filterParam}%` } },
            ];
          }
          if (req.query.search) {
            if(req.query.search != "") {
              req["query"][Op.or] = [
                { 'course_name': { [Op.iLike]: `%${req.query.search}%`, }, },
                { '$category.category_name$': { [Op.iLike]: `%${req.query.search}%` } },
                { '$trainer.full_name$': { [Op.iLike]: `%${req.query.search}%` } },
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('week_duration'), 'varchar'),
                  {[Op.iLike]: `%${req.query.search}%`}
                ),
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('total_modules'), 'varchar'),
                  {[Op.iLike]: `%${req.query.search}%`}
                ),
              ];
            }
          }
        }
        delete req.query.filterParam;
      } else if (req.query.filter == "country") {
        if (req.query.filterParam) {
          if(req.query.filterParam != "all") {
            req["query"][Op.and] = [
              { '$trainer.country$': { [Op.iLike]: `%${req.query.filterParam}%` } },
            ];
          }

          if (req.query.search) {
            if(req.query.search != "") {
              req["query"][Op.or] = [
                { 'course_name': { [Op.iLike]: `%${req.query.search}%`, }, },
                { '$category.category_name$': { [Op.iLike]: `%${req.query.search}%` } },
                { '$trainer.full_name$': { [Op.iLike]: `%${req.query.search}%` } },
                { 'status': { [Op.iLike]: `%${req.query.search}%` } },
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('week_duration'), 'varchar'),
                  {[Op.iLike]: `%${req.query.search}%`}
                ),
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('total_modules'), 'varchar'),
                  {[Op.iLike]: `%${req.query.search}%`}
                ),
              ];
            }
          }
          delete req.query.filterParam;
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
                { 'course_name': { [Op.iLike]: `%${req.query.search}%`, }, },
                { '$category.category_name$': { [Op.iLike]: `%${req.query.search}%` } },
                { '$trainer.full_name$': { [Op.iLike]: `%${req.query.search}%` } },
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('week_duration'), 'varchar'),
                  {[Op.iLike]: `%${req.query.search}%`}
                ),
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('total_modules'), 'varchar'),
                  {[Op.iLike]: `%${req.query.search}%`}
                ),
              ];
            }
          }
          delete req.query.filterParam;
        }
      } else if (req.query.filter == "all") {
        //console.log("check");
        if (req.query.search) {
          if(req.query.search != "") {
            req["query"][Op.or] = [
              { 'course_name': { [Op.iLike]: `%${req.query.search}%`, }, },
              { '$category.category_name$': { [Op.iLike]: `%${req.query.search}%` } },
              { '$trainer.full_name$': { [Op.iLike]: `%${req.query.search}%` } },
              { 'status': { [Op.iLike]: `%${req.query.search}%` } },
              Sequelize.where(
                Sequelize.cast(Sequelize.col('week_duration'), 'varchar'),
                {[Op.iLike]: `%${req.query.search}%`}
              ),
              Sequelize.where(
                Sequelize.cast(Sequelize.col('total_modules'), 'varchar'),
                {[Op.iLike]: `%${req.query.search}%`}
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
          {[Op.iLike]: `%${req.query.search}%`}
        ),
        Sequelize.where(
          Sequelize.cast(Sequelize.col('total_modules'), 'varchar'),
          {[Op.iLike]: `%${req.query.search}%`}
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
    else if (req.userRole == "trainee") {
      req["query"]["status"] = { [Op.or]: ['active', 'approved'] }
    }

    await Course
      .findAndCountAll({ include: ["category","trainer"], offset: pageNumber * pageLimit, limit: pageLimit, where: req.query, order: [orderByColumn] })
      .then((result) => {
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
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
    await Course
      .create(req.body)
      .then((result) => {
        User.increment({course_count: 1}, { where: { id: req.userId } })
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
      const module = await Module.findAll({ where: { course_id: req.params.id } , order: [orderByColumn]});
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
    console.clear();
    console.log("update query ", req.body);
    if(req.body?.status) {
      if(req.body?.status == "approved") {
        //req.body.status_update_on = 
      }
    }
    const course = await Course.findByPk(req.params.id);
    if (course) {
      const courseup = await course.update(req.body);
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
        User.decrement({course_count: 1}, { where: { id: coursefind.trainer_id } })
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
};

module.exports = new courseController();
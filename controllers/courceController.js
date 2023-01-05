const express = require("express");
const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Course = require("../models/Course.model");
const Module = require("../models/Module.model");
const { Op } = require("sequelize");
const courseController = class {
  async index(req, res) {
    
    if(req.userRole == "trainer") {
      req["query"]["trainer_id"]=req.userId;
    }
    else if(req.userRole == "trainee") {
      req["query"]["status"] = {[Op.or]: ['active', 'approved']}
    }
    if(req.query.search) {
      req["query"]["course_name"] = {[Op.like]: '%'+req.query.search+'%'};
      delete req.query.search;
    }
    console.clear();
    console.error("query : ",req.query);
    await Course
      .findAndCountAll({ include: ["category", "trainer"], offset: pageNumber * pageLimit, limit: pageLimit, where: req.query, order: [orderByColumn] })
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
        res.send(result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async show(req, res) {
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

  async modules(req, res) {
    
    const module = await Module.findAll({where:{course_id:req.params.id}});
    if (module) {
      return res.send({ data: module });
    }
    return res.status(422).send(
      {
        message: "module not Found",
      }
    );
  }

  async update(req, res) {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      course.update(req.body);
      return res.send({ data: course });
    }
    return res.status(422).send(
      {
        message: "Course not update",
      }
    );
  }
  async destroy(req, res) {
    console.log(req.params)
    const course= await Course.destroy({where:{id:req.params.id}}).then((result)=>{
     return {message:"Course Deleted"};
    });
     res.send(course);
   }
};

module.exports = new courseController();

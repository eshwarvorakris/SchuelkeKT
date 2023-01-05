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
    if(req.params.id !== undefined && req.params.id != "undefined"){
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
    console.clear();
    console.log("update query ", req.body);
    const course = await Course.findByPk(req.params.id);
    if (course) {
      const courseup = await course.update(req.body);
      return res.send({ data: courseup });
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

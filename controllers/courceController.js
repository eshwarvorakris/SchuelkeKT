const express = require("express");
const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Course = require("../models/Course.model");
const courseController = class {
  async index(req, res) {
    await Course
      .findAndCountAll({include:["category","trainer"], offset: req.query.page, limit: 2,where:req.query })
      .then((result) => {
        res.send(getPaginate(result, req.query.page ?? 1, 2));
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
    const course=await Course.findByPk(req.params.id);
    if(course)
    {
    return res.send({data:course});
    }
    return res.status(422).send(
      {
        message:"Course not Found" ,
      }
    );
  }
  async update(req, res) {
    const course=await Course.findByPk(req.params.id);
    if(course)
    {
      course.update(req.body);
    return  res.send({data:course});
    }
    return res.status(422).send(
      {
        message:"Course not update" ,
      }
    );
  }
  async destroy(req, res) {
    const course = await Course.destroy({ where: { id: req.params.id } }).then((result) => {
      return { message: "Course Deleted" };
    });
    res.send(course);
  }
};

module.exports = new courseController();

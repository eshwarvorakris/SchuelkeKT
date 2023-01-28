const express = require("express");
const { getPaginate } = require("../lib/helpers");
const Course = require("../models/Course.model");
const courseController = class {
  async index(req, res) {
    await Course
      .findAndCountAll({ offset: pageNumber * pageLimit, limit: pageLimit, order:[orderByColumn]  })
      .then((result) => {
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
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
    const course = await Course.findByPk(req.params.id);
    res.send({ data: Course });
  }
  update(req, res) {
    res.send(req.body);
  }
  async destroy(req, res) {
    const course = await Course.destroy({ where: { id: req.body.id } }).then((result) => {
      return { message: "Course Deleted" };
    });
    res.send(Course);
  }
};

module.exports = new courseController();

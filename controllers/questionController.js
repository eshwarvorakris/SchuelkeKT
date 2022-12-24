const express = require("express");
const { getPaginate } = require("../lib/helpers");
const Question = require("../models/Question.model");
const questionController = class {
  async index(req, res) {
    await Question
      .findAndCountAll({ offset: req.query.page, limit: 2 })
      .then((result) => {
        res.send(getPaginate(result, req.query.page ?? 1, 2));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
    await Question
      .create(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async show(req, res) {
    const question = await Question.findByPk(req.params.id);
    res.send({ data: question });
  }
  update(req, res) {
    res.send(req.body);
  }
  async destroy(req, res) {
    const question = await Question.destroy({ where: { id: req.body.id } }).then((result) => {
      return { message: "Question Deleted" };
    });
    res.send(Question);
  }
};

module.exports = new questionController();

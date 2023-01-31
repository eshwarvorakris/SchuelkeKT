const express = require("express");
const { getPaginate } = require("../lib/helpers");
const AssignmentAttempt = require("../models/Assignment_attempt.model");
const QuestionAttempt = require("../models/Question_attempt.model");
const questionAttemptController = class {
  async index(req, res) {
    await QuestionAttempt
      .findAndCountAll({ offset: pageNumber * pageLimit, limit: pageLimit })
      .then((result) => {
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
    console.clear();
    req.body.trainee_id = req.userId;
    console.log(req.body);
    await AssignmentAttempt.create(req.body, {
      include: "question_attempted"
    });
    const updateQuery = await QuestionAttempt.bulkCreate(req.body.questions, { fields: ['id', 'question', 'answer'], updateOnDuplicate: ['id', 'question', 'answer'] });
    res.send("inhere=");
  }
  async show(req, res) {
    const questionAttempt = await QuestionAttempt.findByPk(req.params.id);
    res.send({ data: questionAttempt });
  }
  update(req, res) {
    res.send(req.body);
  }
  async destroy(req, res) {
    const questionAttempt = await QuestionAttempt.destroy({ where: { id: req.body.id } }).then((result) => {
      return { message: "QuestionAttempt Deleted" };
    });
    res.send(questionAttempt);
  }
};

module.exports = new questionAttemptController();

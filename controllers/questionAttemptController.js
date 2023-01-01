const express = require("express");
const { getPaginate } = require("../lib/helpers");
const QuestionAttempt = require("../models/Question_attempt.model");
const questionAttemptController = class {
  async index(req, res) {
    await QuestionAttempt
      .findAndCountAll({offset: pageNumber*pageLimit, limit: pageLimit})
      .then((result) => {
        res.send(getPaginate(result,pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
    await QuestionAttempt
      .create(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async show(req, res) {
    const questionAttempt=await QuestionAttempt.findByPk(req.params.id);
    res.send({data:questionAttempt});
  }
  update(req, res) {
    res.send(req.body);
  }
  async destroy(req, res) {
   const questionAttempt= await QuestionAttempt.destroy({where:{id:req.body.id}}).then((result)=>{
    return {message:"QuestionAttempt Deleted"};
   });
    res.send(questionAttempt);
  }
};

module.exports = new questionAttemptController();

const express = require("express");
const { getPaginate } = require("../lib/helpers");
const QuestionOption = require("../models/Question_option.model");
const questionOptionController = class {
  async index(req, res) {
    await QuestionOption
      .findAndCountAll({offset: pageNumber*pageLimit, limit: pageLimit})
      .then((result) => {
        res.send(getPaginate(result,pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
    await QuestionOption
      .create(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async show(req, res) {
    const questionOption=await QuestionOption.findByPk(req.params.id);
    res.send({data:questionOption});
  }
  update(req, res) {
    res.send(req.body);
  }
  async destroy(req, res) {
   const questionOption= await QuestionOption.destroy({where:{id:req.body.id}}).then((result)=>{
    return {message:"Question Option Deleted"};
   });
    res.send(questionOption);
  }
};

module.exports = new questionOptionController();

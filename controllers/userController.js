const express = require("express");
const { getPaginate } = require("../lib/helpers");
const User = require("../models/User.model");
const { Op } = require("sequelize");
const userController = class {
  async index(req, res) {
    await User
      .findAndCountAll({where: {
        role: { [Op.ne]: "admin"},
      },offset:req.query.page,limit:15})
      .then((result) => {
        res.send(getPaginate(result,req.query.page ?? 1,15));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async getTrainee(req, res) {
    await User
      .findAndCountAll({where: {
        role: "trainee"
      },offset:req.query.page,limit:15})
      .then((result) => {
        res.send(getPaginate(result,req.query.page ?? 1,15));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async getTrainer(req, res) {
    await User
      .findAndCountAll({where: {
        role: "trainer"
      },offset:req.query.page,limit:15})
      .then((result) => {
        res.send(getPaginate(result,req.query.page ?? 1,15));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
    await User
      .create(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async show(req, res) {
    const user=await User.findByPk(req.params.id);
    res.send({data:user});
  }
  update(req, res) {
    res.send(req.body);
  }
  async destroy(req, res) {
   const user= await User.destroy({where:{id:req.body.id}}).then((result)=>{
    return {message:"user Deleted"};
   });
    res.send(user);
  }
};

module.exports = new userController();

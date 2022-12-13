const express = require("express");
const { getPaginate } = require("../lib/helpers");
const User = require("../models/User.model");
const userController = class {
  async index(req, res) {
    await User
      .findAndCountAll({offset:req.query.page,limit:2})
      .then((result) => {
        res.send(getPaginate(result,req.query.page ?? 1,2));
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
    return {message:"user Deteletd"};
   });
    res.send(user);
  }
};

module.exports = new userController();

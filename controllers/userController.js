const express = require("express");
const { getPaginate } = require("../lib/helpers");
const User = require("../models/User.model");
const userController = class {
  async index(req, res) {
    await User
      .findAndCountAll()
      .then((result) => {
        res.send(getPaginate(result));
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
  show(req, res) {
    res.send(req.params.id);
  }
  update(req, res) {
    res.send(req.body);
  }
  destroy(req, res) {
    res.send(req.body);
  }
};

module.exports = new userController();

const express = require("express");
const userController = class {
  index(req, res) {
    res.send(req.query);
  }
  store(req, res) {
    res.send(req.body);
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

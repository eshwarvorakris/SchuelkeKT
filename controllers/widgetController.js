const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Module = require("../models/Module.model");
const Course = require("../models/Course.model");
const User = require("../models/User.model");
const { Op } = require("sequelize");
const widgetController = class {
  async course(req, res) {
    if(req.userRole == "trainer") {
      req["query"]["trainer_id"]=req.userId;
    }
    else if(req.userRole == "trainee") {
      req["query"]["status"] = {[Op.or]: ['active', 'approved']}
    }
    console.log(req.params);
    switch (req.params.type) {
      case "total":
        let courseCount = await Course.count({where: req.query});
        console.log(req.query);
        res.send({ data: { total: courseCount || 0 } });
        break;
      case "weekDuration":
        let totalWeek = await Course.sum('week_duration',{where: req.query});
        console.log(req.query);
        res.send({ data: { total: totalWeek || 0 } });
        break;
    }
  }

  async module(req, res) {
    switch (req.params.type) {
      case "total":
        let moduleCount = await Module.count();
        res.send({ data: { total: moduleCount || 0 } });
        break;
      case "timing":
        let moduleTiming = await Module.count();
        res.send({ data: { total: moduleTiming || 0 } });
        break;
    }
  }

  async trainee(req, res) {
    req["query"]["role"]="trainee";
    switch (req.params.type) {
      case "total":
        let traineeCount = await User.count({where: req.query});
        console.log("total trainee:",traineeCount);
        res.send({ data: { total: traineeCount || 0 } });
        break;
    }
  }

  async trainer(req, res) {
    req["query"]["role"]="trainer";
    switch (req.params.type) {
      case "total":
        let trainerCount = await User.count({where: req.query});
        console.log("total trainer:",trainerCount);
        res.send({ data: { total: trainerCount || 0 } });
        break;
    }
  }

};

module.exports = new widgetController();

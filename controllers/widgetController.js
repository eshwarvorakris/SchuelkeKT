const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Module = require("../models/Module.model");
const Course = require("../models/Course.model");
const widgetController = class {
  async course(req, res) {
    console.log(req.params);
    switch (req.params.type) {
      case "total":
        let courseCount = await Course.count();
        console.log(courseCount);
        res.send({ data: { total: courseCount || 0 } });
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

};

module.exports = new widgetController();

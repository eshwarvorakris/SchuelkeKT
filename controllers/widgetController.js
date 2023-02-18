const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Module = require("../models/Module.model");
const Course = require("../models/Course.model");
const CourseView = require("../models/Course_views.model");
const AssignmentAttempt = require("../models/Assignment_attempt.model")
const User = require("../models/User.model");
const { Op } = require("sequelize");
const widgetController = class {
  async course(req, res) {
    if (req.userRole == "trainer") {
      req["query"]["trainer_id"] = req.userId;
    }
    else if (req.userRole == "trainee") {
      req["query"]["status"] = { [Op.or]: ['active', 'approved'] }
    }
    //console.log(req.params);
    switch (req.params.type) {
      case "total":
        let courseCount = await Course.count({ where: req.query });
        //console.log(req.query);
        res.send({ data: { total: courseCount || 0 } });
        break;
      case "weekDuration":
        let totalWeek = await Course.sum('week_duration', { where: req.query });
        //console.log(req.query);
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
    req["query"]["role"] = "trainee";
    switch (req.params.type) {
      case "total":
        let traineeCount = await User.count({ where: req.query });
        //console.log("total trainee:", traineeCount);
        res.send({ data: { total: traineeCount || 0 } });
        break;
    }
  }

  async traineeKpis(req, res) {
    if (req.userRole == "trainer") {
      req["query"]["trainer_id"] = req.userId;
    }
    else if (req.userRole == "trainee") {
      req["query"]["status"] = { [Op.or]: ['active', 'approved'] }
    }
    const totalCourse = await Course.count({ where: req.query });
    const totalCourseCompleted = await CourseView.count({ where: {trainee_id: req.userId, status:'completed'} });
    const totalCourseViewed = await CourseView.sum('viewed_seconds',{ where: {trainee_id: req.userId} });
    let totalTrainingHour = 0;
    if(totalCourseViewed > 0) {
      let maxmin = Math.floor(totalCourseViewed / 60);
      var Hours = Math.floor(maxmin / 60);
      var minutes = maxmin % 60;
      var hourOut = maxmin + "mins";
      totalTrainingHour = hourOut;
    }
    const data = {
      totalCourse:totalCourse,
      totalCourseCompleted:totalCourseCompleted,
      totalCourseViewed:totalCourseViewed,
      totalTrainingHour:totalTrainingHour
    }
    //console.log(data);
    res.send(data);
  }

  async traineeStatusKpis(req, res) {
    const totalCourse = await Course.count({ where: {status:"approved"} });
    const totalCourseCompleted = await CourseView.count({ where: {trainee_id: req.body.trainee_id, status:'completed'} });
    const totalCourseViewed = await CourseView.sum('viewed_seconds',{ where: {trainee_id: req.body.trainee_id} });
    const scoreTotal = await AssignmentAttempt.sum('correct_percentage', {where: {trainee_id: req.body.trainee_id}});
    const scoreCount = await AssignmentAttempt.count({where: {trainee_id: req.body.trainee_id}});
    let averageScore = 0;
    if(scoreTotal !== null && scoreCount !== null) {
      averageScore = Math.floor(scoreTotal/scoreCount)
    }
    let totalTrainingHour = 0;
    if(totalCourseViewed > 0) {
      let maxmin = Math.floor(totalCourseViewed / 60);
      var Hours = Math.floor(maxmin / 60);
      var minutes = maxmin % 60;
      var hourOut = maxmin + "mins";
      totalTrainingHour = hourOut;
    }
    const data = {
      totalCourse:totalCourse,
      totalCourseCompleted:totalCourseCompleted,
      totalCourseViewed:totalCourseViewed,
      totalTrainingHour:totalTrainingHour,
      averageScore:averageScore
    }
    //console.log(data);
    res.send(data);
  }

  async trainer(req, res) {
    req["query"]["role"] = "trainer";
    switch (req.params.type) {
      case "total":
        let trainerCount = await User.count({ where: req.query });
        //console.log("total trainer:", trainerCount);
        res.send({ data: { total: trainerCount || 0 } });
        break;
    }
  }

};

module.exports = new widgetController();

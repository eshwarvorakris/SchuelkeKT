const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Module = require("../models/Module.model");
const Course = require("../models/Course.model");
const CourseView = require("../models/Course_views.model");
const AssignmentAttempt = require("../models/Assignment_attempt.model")
const Assigned_courses = require("../models/Assigned_courses.model");
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
      case "totalApproved":
        let courseApproved = await Course.count({ where: { status: 'approved' } });
        //console.log(req.query);
        res.send({ data: { total: courseApproved || 0 } });
        break;
      case "weekDuration":
        let totalWeek = await Course.sum('week_duration', { where: req.query });
        //console.log(req.query);
        res.send({ data: { total: totalWeek || 0 } });
        break;
      case "courseHour":
        req["query"]["status"] = { [Op.or]: ['active', 'approved'] }
        let totalHour = await Course.sum('total_training_hour', { where: req.query });
        res.send({ data: { total: totalHour || 0 } });
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
        let traineeCount = 0;
        if (req.userRole == "trainer") {
          Course.hasMany(Assigned_courses, { foreignKey: 'course_id' });
          traineeCount = await Assigned_courses.count({
            distinct: true,
            col: 'trainee_id',
            include: [{
              model: Course,
              as: 'course',
              attributes: [['id', 'courses_id']],
              where: { trainer_id: req.userId },
            }]
          });
        } else {
          traineeCount = await User.count({ where: req.query });
        }

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

    let totalCourse = await Course.count({ where: req.query });
    let totalCourseCompleted = await CourseView.count({ where: { trainee_id: req.userId, status: 'completed' } });
    let totalCourseViewed = await CourseView.sum('viewed_seconds', { where: { trainee_id: req.userId } });
    if (req.userRole == "trainee") {
      Course.hasMany(Assigned_courses, { foreignKey: 'course_id' });
      totalCourse = await Course.count({
        where: req.query,
        include: [{
          model: Assigned_courses,
          where: { trainee_id: req.userId },
        }]
      });
      totalCourseCompleted = await CourseView.count({ where: { trainee_id: req.userId, status: 'completed' } });
      totalCourseViewed = await CourseView.sum('viewed_seconds', { where: { trainee_id: req.userId } });
    }

    let totalTrainingHour = 0;
    if (totalCourseViewed > 0) {
      let maxmin = Math.floor(totalCourseViewed / 60);
      var Hours = Math.floor(maxmin / 60);
      var minutes = maxmin % 60;
      var hourOut = maxmin + "mins";
      totalTrainingHour = hourOut;
    }
    const data = {
      totalCourse: totalCourse,
      totalCourseCompleted: totalCourseCompleted,
      totalCourseViewed: totalCourseViewed,
      totalTrainingHour: totalTrainingHour
    }
    //console.log(data);
    res.send(data);
  }

  async traineeStatusKpis(req, res) {
    let condition = {};
    condition.status = "approved";
    if (req.userRole == "trainer") {
      condition.trainer_id = req.userId;
    }
    const assigned_course_count = await Assigned_courses.count({
      where: { trainee_id: req.body.trainee_id },
      include: [{
        model: Course,
        as: 'course',
        attributes: [],
        where: condition,
      }],
    });
    const totalCourse = await Course.count({ where: { status: "approved" } });
    const totalCourseCompleted = await CourseView.count({ where: { trainee_id: req.body.trainee_id, status: 'completed' } });
    const totalCourseViewed = await CourseView.sum('viewed_seconds', { where: { trainee_id: req.body.trainee_id } });
    const scoreTotal = await AssignmentAttempt.sum('correct_percentage', { where: { trainee_id: req.body.trainee_id } });
    const scoreCount = await AssignmentAttempt.count({ where: { trainee_id: req.body.trainee_id } });
    let averageScore = 0;
    if (scoreTotal !== null && scoreCount !== null) {
      averageScore = Math.floor(scoreTotal / scoreCount)
    }
    let totalTrainingHour = 0;
    if (totalCourseViewed > 0) {
      let maxmin = Math.floor(totalCourseViewed / 60);
      var Hours = Math.floor(maxmin / 60);
      var minutes = maxmin % 60;
      var hourOut = maxmin + "mins";
      totalTrainingHour = hourOut;
    }
    const data = {
      totalCourse: totalCourse,
      totalCourseCompleted: totalCourseCompleted,
      totalCourseViewed: totalCourseViewed,
      totalTrainingHour: totalTrainingHour,
      averageScore: averageScore,
      assigned_course_count: assigned_course_count
    }
    //console.log(data);
    res.send(data);
  }

  async trainerKpis(req, res) {
    let course_completion = 0;
    let total_course_published = await Course.count({
      where: { status: 'approved', trainer_id: req.userId }
    });
    let total_course_complete = await CourseView.count({
      where: { status: 'completed' },
      include: [{
        model: Course,
        as: 'course',
        attributes: [],
        where: { trainer_id: req.userId },
      }]
    });
    if (total_course_published > 0 && total_course_complete > 0) {
      course_completion = Math.round((total_course_complete / total_course_published) * 100)
    }
    res.send({ course_completion: course_completion });
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

  async adminGraph1(req, res) {
    var totalTraineeEnrolled = 0;
    var learningSec = 0;
    var learningHour = 0;
    var completionHour = 0;
    var completionSec = 0;

    let temp = null;
    var traineeCondition = [];
    var learningSecCondition = {};
    if (req.body.category !== "all" && req.body.category !== undefined) {
      temp = {
        model: Course,
        as: 'course',
        attributes: [],
        where: { category_id: req.body.category },
      }
      traineeCondition.push(temp);
      learningSecCondition.category_id = req.body.category;
    }

    if (req.body.country !== "all" && req.body.country !== undefined) {
      Course.hasMany(Assigned_courses, { foreignKey: 'course_id' });
      temp = {
        model: User,
        as: 'trainee',
        attributes: [['id']],
        where: { country: req.body.country },
      }
      traineeCondition.push(temp);
      learningSecCondition.country = req.body.country;
    }


    if (traineeCondition.length > 0) {

      totalTraineeEnrolled = await Assigned_courses.count({
        distinct: true,
        col: 'trainee_id',
        include: traineeCondition,
      });

      learningSec = await CourseView.sum('viewed_seconds', {
        include: [
          {
            model: Course,
            as: 'course',
            attributes: [],
            where: learningSecCondition,
          }
        ]
      });
      completionSec = await CourseView.sum('viewed_seconds', {
        where: { status: 'completed' },
        include: [
          {
            model: Course,
            as: 'course',
            attributes: [],
            where: learningSecCondition,
          }
        ]
      });

    } else {
      totalTraineeEnrolled = await Assigned_courses.count({
        distinct: true,
        col: 'trainee_id'
      });
      learningSec = await CourseView.sum('viewed_seconds');
      completionSec = await CourseView.sum('viewed_seconds', { where: { status: 'completed' } });
    }

    if (learningSec > 0) {
      learningHour = Math.round(learningSec / 3600)
    }

    if (completionSec > 0) {
      completionHour = Math.round(completionSec / 3600)
    }

    res.send({
      data: {
        totalTraineeEnrolled: totalTraineeEnrolled,
        learningHour: learningHour,
        completionHour: completionHour
      }
    });
  }

  async adminGraph11(req, res) {
    console.clear();
    console.log("============================================here started=====================================");
    console.log(req.body.country)
    const array = req.body?.country.split(',');
    // array.map((item) => {
    //   console.log("curen country = ", item);
    // })

    var totalTraineeEnrolled = 0;
    var learningSec = 0;
    var learningHour = 0;
    var completionHour = 0;
    var completionSec = 0;

    let temp = null;
    var traineeCondition = [];
    var learningSecCondition = {};

    var chartData = [];

    if (array.length > 0) {
      for (const item of array) {

        totalTraineeEnrolled = 0;
        learningSec = 0;
        learningHour = 0;
        completionHour = 0;
        completionSec = 0;

        temp = null;
        traineeCondition = [];
        learningSecCondition = {};

        Course.hasMany(Assigned_courses, { foreignKey: 'course_id' });
        if (item !== "all" && item !== undefined) {
          temp = {
            model: User,
            as: 'trainee',
            attributes: [['id']],
            where: { country: item },
          }
          traineeCondition.push(temp);
          learningSecCondition.country = item;
        }

        if (req.body.category !== "all" && req.body.category !== undefined) {
          temp = {
            model: Course,
            as: 'course',
            attributes: [],
            where: { category_id: req.body.category },
          }
          traineeCondition.push(temp);
          learningSecCondition.category_id = req.body.category;
        }

        if (traineeCondition.length > 0) {

          totalTraineeEnrolled = await Assigned_courses.count({
            distinct: true,
            col: 'trainee_id',
            include: traineeCondition,
          });

          learningSec = await CourseView.sum('viewed_seconds', {
            include: [
              {
                model: Course,
                as: 'course',
                attributes: [],
                where: learningSecCondition,
              }
            ]
          });
          completionSec = await CourseView.sum('viewed_seconds', {
            where: { status: 'completed' },
            include: [
              {
                model: Course,
                as: 'course',
                attributes: [],
                where: learningSecCondition,
              }
            ]
          });

        } else {
          totalTraineeEnrolled = await Assigned_courses.count({
            distinct: true,
            col: 'trainee_id'
          });
          learningSec = await CourseView.sum('viewed_seconds');
          completionSec = await CourseView.sum('viewed_seconds', { where: { status: 'completed' } });
        }

        if (learningSec > 0) {
          learningHour = Math.round(learningSec / 3600)
        }

        if (completionSec > 0) {
          completionHour = Math.round(completionSec / 3600)
        }

        let tempData = {
          labels: item, totalTraineeEnrolled: totalTraineeEnrolled, learningHour: learningHour, completionHour: completionHour
        }
        chartData.push(tempData);
      }
    } else {
      if (req.body.category !== "all" && req.body.category !== undefined) {
        temp = {
          model: Course,
          as: 'course',
          attributes: [],
          where: { category_id: req.body.category },
        }
        traineeCondition.push(temp);
        learningSecCondition.category_id = req.body.category;
      }

      if (traineeCondition.length > 0) {

        totalTraineeEnrolled = await Assigned_courses.count({
          distinct: true,
          col: 'trainee_id',
          include: traineeCondition,
        });

        learningSec = await CourseView.sum('viewed_seconds', {
          include: [
            {
              model: Course,
              as: 'course',
              attributes: [],
              where: learningSecCondition,
            }
          ]
        });
        completionSec = await CourseView.sum('viewed_seconds', {
          where: { status: 'completed' },
          include: [
            {
              model: Course,
              as: 'course',
              attributes: [],
              where: learningSecCondition,
            }
          ]
        });

      } else {
        totalTraineeEnrolled = await Assigned_courses.count({
          distinct: true,
          col: 'trainee_id'
        });
        learningSec = await CourseView.sum('viewed_seconds');
        completionSec = await CourseView.sum('viewed_seconds', { where: { status: 'completed' } });
      }

      if (learningSec > 0) {
        learningHour = Math.round(learningSec / 3600)
      }

      if (completionSec > 0) {
        completionHour = Math.round(completionSec / 3600)
      }

      let tempData = {
        labels: 'All', totalTraineeEnrolled: totalTraineeEnrolled, learningHour: learningHour, completionHour: completionHour
      }
      chartData.push(tempData);
    }

    res.send({
      data: {
        chartData: chartData
      }
    });
  }

  async adminGraph2(req, res) {
    var productTopic = 0;
    var blanketTopic = 0;
    var countryTopic = 0;
    if (req.body.country !== "all" && req.body.country !== undefined) {
      productTopic = await Course.count({ where: { category_id: '1', country: req.body.country } });
      blanketTopic = await Course.count({ where: { category_id: '3', country: req.body.country } });
      countryTopic = await Course.count({ where: { category_id: '2', country: req.body.country } });
    } else {
      productTopic = await Course.count({ where: { category_id: '1', status: "approved" } });
      blanketTopic = await Course.count({ where: { category_id: '3', status: "approved" } });
      countryTopic = await Course.count({ where: { category_id: '2', status: "approved" } });
    }

    res.send({
      data: {
        productTopic: productTopic,
        blanketTopic: blanketTopic,
        countryTopic: countryTopic
      }
    });
  }

  async trainerGraph1(req, res) {
    var enrolledTrainee = 0;
    var traineeCompleted = 0;
    console.clear();
    let temp = null;
    let temp2 = null;
    var traineeCondition = [];
    var traineeCondition2 = [];
    Course.hasMany(CourseView, { foreignKey: 'course_id' });
    CourseView.belongsTo(Course, { foreignKey: 'course_id' });
    temp = {
      model: Course,
      as: 'course',
      attributes: [],
      where: { trainer_id: req.userId },
    }
    if (req.body.category !== "all" && req.body.category !== undefined) {
      temp.where = { category_id: req.body.category, trainer_id: req.userId };
    }
    traineeCondition.push(temp);
    temp2 = {
      model: Course,
      as: 'course',
      attributes: [],
      where: { trainer_id: req.userId },
    };
    if (req.body.category !== "all" && req.body.category !== undefined) {
      temp2.where = { category_id: req.body.category, trainer_id: req.userId};
    }
    temp2.include = [
      {
        model: CourseView,
        where: { status: 'completed' },
      },
    ];
    console.log(traineeCondition)
    traineeCondition2.push(temp2);

    if (req.body.country !== "all" && req.body.country !== undefined) {
      temp = {
        model: User,
        as: 'trainee',
        attributes: [['id']],
        where: { country: req.body.country },
      }
      traineeCondition.push(temp);
      traineeCondition2.push(temp);
    }

    enrolledTrainee = await Assigned_courses.count({
      distinct: true,
      col: 'trainee_id',
      include: traineeCondition,
    });

    traineeCompleted = await Assigned_courses.count({
      distinct: true,
      col: 'trainee_id',
      include: traineeCondition2,
    });

    res.send({
      data: {
        enrolledTrainee: enrolledTrainee,
        traineeCompleted: traineeCompleted
      }
    });
  }

};

// SELECT COUNT(id) AS total_trainee FROM assigned_course 
// INNER JOIN courses ON assigned_course.course_id = courses.id
// INNER JOIN courses_views ON courses.id = courses_views.course_id
// WHERE courses.category_id = 1 AND courses_views.statu='completed'

module.exports = new widgetController();

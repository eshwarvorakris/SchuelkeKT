const express = require("express");
const { getPaginate } = require("../lib/helpers");
const Course = require("../models/Course.model");
const Content = require("../models/Module_content.model");
const CourseView = require("../models/Course_views.model");
const ModuleView = require("../models/Module_views.model");
const ChapterView = require("../models/Chapter_views.model");
const User = require("../models/User.model");
const Module = require("../models/Module.model");
const { Op } = require("sequelize");
const courseController = class {
  async index(req, res) {
    await Course
      .findAndCountAll({ offset: pageNumber * pageLimit, limit: pageLimit, order: [orderByColumn] })
      .then((result) => {
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }

  async getAnyCourseChapterViewed(req, res) {
    if (req.body.course_id !== undefined && req.body.course_id != "undefined") {
      const courseViewSec = await ChapterView.sum('viewed_seconds', { where: { course_id: req.body.course_id, trainee_id: req.userId } });
      await ChapterView
        .findOne({ where: { trainee_id: req.userId, course_id: req.body.course_id }, order: [['chapter_id', 'DESC']] })
        .then((result) => {
          const data = { courseViewSec: courseViewSec, result: result }
          //console.log(result);
          res.send(data);
          //res.send("done");
        })
        .catch((error) => {
          console.error("Failed to retrieve data : ", error);
        });
    } else {
      return res.status(422).send(
        {
          message: "Please Re-Select Course",
        }
      );
    }

  }

  async getCourseViewData(req, res) {
    console.clear();
    //console.log(req.body);
    let allContentInCourse = await Content.count({ where: { course_id: req.body.course_id } });
    let courseContentCompletedCount = await ChapterView.count({ where: { course_id: req.body.course_id, trainee_id: req.body.trainee_id, status: 'completed' } });
    let totalCourseView = await CourseView.findOne({ where: { course_id: req.body.course_id, trainee_id: req.body.trainee_id } });
    const data = {
      allContentInCourse: allContentInCourse,
      courseContentCompletedCount: courseContentCompletedCount,
      totalCourseView: totalCourseView
    }
    res.send(data);
  }

  async getChapterView(req, res) {
    let isCurrentChapterLocked = false;
    const allContentInCourse = await Content.count({ where: { course_id: req.body.course_id } });
    const curChapterViews = await ChapterView.sum('viewed_seconds', { where: { chapter_id: req.body.chapter_id, trainee_id: req.userId } });

    if (curChapterViews === null || curChapterViews == 0) {
      const prevContentInModule = await Content.findOne(
        {
          where: {
            course_id: req.body.course_id, module_id: req.body.module_id,
            id: { [Op.lt]: req.body.chapter_id }
          }, order: [['id', 'DESC']]
        });
      if (prevContentInModule === null) {
        let curModuleSequence = req.body.module_sequence_no;
        if (curModuleSequence > 1) {
          let prevModuleSequence = curModuleSequence - 1;
          const prevModule = await Module.findOne({ attributes: ['id'], where: { course_id: req.body.course_id, sequence_no: prevModuleSequence } });
          const prevModuleContentCount = await Content.count({ where: { module_id: prevModule?.dataValues?.id } });
          const prevModuleContentCompleted = await ChapterView.count({ where: { module_id: prevModule?.dataValues?.id, trainee_id: req.userId, status: 'completed' } });
          if (prevModuleContentCount != prevModuleContentCompleted) {
            isCurrentChapterLocked = true;
          }
        }
      }
      else {
        let prevContentId = prevContentInModule.dataValues.id;
        const prevChapterViews = await ChapterView.findOne({ where: { chapter_id: req.body.chapter_id, trainee_id: req.userId, status: 'completed' } });
        if (prevChapterViews === null) {
          isCurrentChapterLocked = true;
        }
      }
    }
    const courseData = await Course.findOne({
      attributes: ['total_training_hour'],
      where: { id: req.body.course_id }
    });
    const data = {
      allContentInCourse: allContentInCourse,
      courseData: courseData,
      curChapterViews: curChapterViews,
      isCurrentChapterLocked: isCurrentChapterLocked
    };
    res.send(data);
  }

  async getChapterViewData(req, res) {
    //console.log(req.body);
    const curChapter = await ChapterView.findOne({ where: { chapter_id: req.body.chapter_id, trainee_id: req.userId } });
    res.send(curChapter);
  }

  async getModuleView(req, res) {
    var moduleStatus = 3;// 1 : completed, 2: ongoing, 3:all locked
    var lastchapter = null;
    const allContentInModule = await Content.count({ where: { module_id: req.body.module_id } });
    const allContentInCourse = await Content.count({ where: { course_id: req.body.course_id } });
    const curModuleViews = await ChapterView.sum('viewed_seconds', { where: { module_id: req.body.module_id, trainee_id: req.userId } });
    const curModuleContentCompletedCount = await ChapterView.count({ where: { module_id: req.body.module_id, trainee_id: req.userId, status: 'completed' } });
    const courseData = await Course.findOne({
      attributes: ['total_training_hour'],
      where: { id: req.body.course_id }
    });
    if (curModuleContentCompletedCount == allContentInModule) {
      moduleStatus = 1;
    } else {
      const firstModule = await Module.findOne({ attributes: ['id'], where: { course_id: req.body.course_id }, order: [['sequence_no', 'ASC']] });
      if (firstModule?.dataValues?.id != req.body.module_id) {
        let sequence_no = req.body.sequence_no;
        sequence_no--;
        moduleStatus = 2;
        if (sequence_no > 0) {
          const prevModule = await Module.findOne({ attributes: ['id'], where: { course_id: req.body.course_id, sequence_no: sequence_no } });
          const prevModuleContentCount = await Content.count({ where: { module_id: prevModule?.dataValues?.id } });
          const prevModuleContentCompleted = await ChapterView.count({ where: { module_id: prevModule?.dataValues?.id, trainee_id: req.userId, status: 'completed' } });
          if (prevModuleContentCompleted != prevModuleContentCount) {
            moduleStatus = 3;
          }
        }
      } else {
        moduleStatus = 2;
      }
    }

    if (moduleStatus == 2 || moduleStatus == 1) {
      lastchapter = await ChapterView.findOne({ attributes: ['chapter_id'], where: { module_id: req.body.module_id, trainee_id: req.userId }, order: [['chapter_id', 'DESC']] });
    }

    const data = {
      allContentInModule: allContentInModule,
      allContentInCourse: allContentInCourse,
      courseData: courseData,
      curModuleViews: curModuleViews,
      moduleStatus: moduleStatus,
      lastchapter: lastchapter
    };
    res.send(data);
  }

  async getRecentLearning(req, res) {
    const lastChapter = await ChapterView.findOne({ include: ['course'], where: { trainee_id: req.userId, status: 'ongoing' }, order: [['chapter_id', 'DESC']] });
    var data = null;
    if (lastChapter !== null) {
      //console.log("lastChapter", lastChapter.dataValues);
      let allContentInCourse = await Content.count({ where: { course_id: lastChapter.dataValues.course_id } });
      let courseContentCompletedCount = await ChapterView.count({ where: { course_id: lastChapter.dataValues.course_id, trainee_id: req.userId, status: 'completed' } });
      let totalCourseView = await ChapterView.sum('viewed_seconds', { where: { course_id: lastChapter.dataValues.course_id, trainee_id: req.userId } });
      data = {
        allContentInCourse: allContentInCourse,
        courseContentCompletedCount: courseContentCompletedCount,
        totalCourseView: totalCourseView,
        lastChapter: lastChapter
      }
    } else {
      data = {
        lastChapter: lastChapter
      }
    }
    res.send(data);
  }

  async getEachCourseStat(req, res) {
    const countTrainee = await CourseView.count({ where: { course_id:req.body.course_id } });
    const countCourseCompletedUsers = await CourseView.count( { where: { course_id:req.body.course_id, status:'completed' } } );
    const timeSpentByUserInCourse = await CourseView.sum('viewed_seconds', { where: { course_id:req.body.course_id } } );
    let userCompletePercent = 0;
    if(countCourseCompletedUsers > 0 && countTrainee > 0) {
      userCompletePercent = ((countCourseCompletedUsers/countTrainee)*100);
    }
    let weeksSpent =  Math.floor((((timeSpentByUserInCourse / 60) / 60) / 24) / 7);
    let data = {
      traineeEnrolled:countTrainee,
      userCompletePercent:userCompletePercent,
      weeksSpent:weeksSpent
    }
    res.send(data);
  }

  async store(req, res) {
    req.body.trainee_id = req.userId;
    const alreadyView = await CourseView.findOne({
      attributes: ['id'],
      where: { trainee_id: req.body.trainee_id, course_id: req.body.course_id }
    }).then(async (result) => {
      if (result !== null) {
        res.send(result);
        console.log("view result=>", result?.dataValues?.id);
        if (result?.dataValues?.id) {
          await CourseView
            .increment({ viewed_seconds: req.body.viewed_seconds }, { where: { id: result?.dataValues?.id } })
        }
      }
      else {
        await CourseView
          .create(req.body)
          .then((resultCreate) => {
            res.send(resultCreate);
          })
          .catch((error) => {
            console.error("Failed to retrieve data : ", error);
          });
      }
      //console.log("inside course");
      await moduleViewed();
      await chapterViewed();
    }).catch((error) => {
      return res.status(422).send(
        {
          message: "Unable To Submit Please Try Again Later.",
        }
      );
    });

    async function moduleViewed() {
      const alreadyView = await ModuleView.findOne({
        attributes: ['id'],
        where: { trainee_id: req.body.trainee_id, module_id: req.body.module_id }
      }).then(async (moduleResult) => {
        if (moduleResult !== null) {
          //res.send(result);
          console.log("module view result=>", moduleResult?.dataValues?.id);
          if (moduleResult?.dataValues?.id) {
            await ModuleView
              .increment({ viewed_seconds: req.body.viewed_seconds }, { where: { id: moduleResult?.dataValues?.id } })
          }
        }
        else {
          await ModuleView.create(req.body)
        }
        //console.log("inside module");
      })
    }

    async function chapterViewed() {
      const alreadyView = await ChapterView.findOne({
        attributes: ['id'],
        where: { trainee_id: req.body.trainee_id, chapter_id: req.body.chapter_id }
      }).then(async (chapterResult) => {
        if (chapterResult !== null) {
          //res.send(result);
          console.log("module view result=>", chapterResult?.dataValues?.id);
          if (chapterResult?.dataValues?.id) {
            await ChapterView
              .increment({ viewed_seconds: req.body.viewed_seconds },
                { where: { id: chapterResult?.dataValues?.id } }
              )
          }
        }
        else {
          await ChapterView.create(req.body)
        }
      })
      //console.log("inside chapter");
      await updateAll();
    }

    async function updateAll() {
      //console.log("inside update");
      const courseData = await Course.findOne({
        attributes: ['total_training_hour'],
        where: { id: req.body.course_id }
      });
      //console.log("courseData = ", courseData.dataValues.total_training_hour);
      const maxCourseContentId = await Content.max('id', { where: { course_id: req.body.course_id } });
      console.log("maxCourseContentId = ", maxCourseContentId);
      var isCourseLastContent = false;
      if (maxCourseContentId == req.body.chapter_id) {
        isCourseLastContent = true;
      }

      const maxModuleContentId = await Content.max('id', { where: { module_id: req.body.module_id } });
      console.log("maxModuleContentId = ", maxModuleContentId);
      var isModuleLastContent = false;
      if (maxModuleContentId == req.body.chapter_id) {
        console.log("lastmodulecontent")
        isModuleLastContent = true;
      }

      const totalCourseContent = await Content.count({ where: { course_id: req.body.course_id } });
      console.log("totalCourseContent = ", totalCourseContent);
      var perContentSecond = 0;
      if (courseData.dataValues.total_training_hour > 0) {
        let courseTrainingSecond = courseData.dataValues.total_training_hour * 60 * 60;
        perContentSecond = courseTrainingSecond / totalCourseContent;
      }

      const curChapterViewSeconds = await ChapterView.findOne({
        attributes: ['status', 'viewed_seconds'],
        where: { trainee_id: req.body.trainee_id, chapter_id: req.body.chapter_id }
      });
      if (curChapterViewSeconds.dataValues.viewed_seconds >= perContentSecond) {
        if (curChapterViewSeconds.dataValues.status != "completed") {
          const curChapterUpdate = await ChapterView.update({ status: 'completed' },
            { where: { trainee_id: req.body.trainee_id, chapter_id: req.body.chapter_id } });

          if (isModuleLastContent) {
            const curModuleUpdate = await ModuleView.update({ status: 'completed' },
              { where: { trainee_id: req.body.trainee_id, module_id: req.body.module_id } });
          }

          if (isCourseLastContent) {
            const curCourseUpdate = await CourseView.update({ status: 'completed' },
              { where: { trainee_id: req.body.trainee_id, course_id: req.body.course_id } });
          }
        }
      }
      console.log("perContentSecond = ", perContentSecond);
      console.log("curChapterViewSeconds = ", curChapterViewSeconds.dataValues.viewed_seconds);
      console.log("isCourseLastContent = " + isCourseLastContent + " isModuleLastContent " + isModuleLastContent + ", currentChapterId " + req.body.chapter_id);
    }
  }
  async show(req, res) {
    const course = await Course.findByPk(req.params.id);
    res.send({ data: Course });
  }
  update(req, res) {
    res.send(req.body);
  }
  async destroy(req, res) {
    const course = await Course.destroy({ where: { id: req.body.id } }).then((result) => {
      return { message: "Course Deleted" };
    });
    res.send(Course);
  }
};

module.exports = new courseController();

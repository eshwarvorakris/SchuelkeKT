const express = require("express");
const { getPaginate } = require("../lib/helpers");
const Course = require("../models/Course.model");
const Content = require("../models/Module_content.model");
const CourseView = require("../models/Course_views.model");
const ModuleView = require("../models/Module_views.model");
const ChapterView = require("../models/Chapter_views.model");
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
      const courseViewSec = await CourseView.sum('viewed_seconds',{where : {course_id:req.body.course_id, trainee_id:req.userId}});
      await ChapterView
        .findOne({where: { trainee_id: req.userId, course_id: req.body.course_id }, order: [['chapter_id', 'DESC']] })
        .then((result) => {
          const data = {courseViewSec:courseViewSec, result:result}
          //console.log(result);
          res.send(data);
          //res.send("done");
        })
        .catch((error) => {
          console.error("Failed to retrieve data : ", error);
        });
    } else  {
      return res.status(422).send(
        {
          message: "Please Re-Select Course",
        }
      );
    }
    
  }

  async getChapterView(req, res) {
    
    
    const allContentInCourse = await Content.count({where : {course_id:req.body.course_id}});
    const curChapterViews = await ChapterView.sum('viewed_seconds' ,{where : {chapter_id:req.body.chapter_id, trainee_id:req.userId}});
    const courseData = await Course.findOne({
      attributes: ['total_training_hour'],
      where: { id: req.body.course_id }
    });
    const data = {
      allContentInCourse:allContentInCourse, 
      courseData:courseData,
      curChapterViews:curChapterViews
    };
    res.send(data);
    
  }

  async getModuleView(req, res) {
    const allContentInModule = await Content.count({where : {module_id:req.body.module_id}});
    const allContentInCourse = await Content.count({where : {course_id:req.body.course_id}});
    const curModuleViews = await ModuleView.sum('viewed_seconds' ,{where : {module_id:req.body.module_id, trainee_id:req.userId}});
    const courseData = await Course.findOne({
      attributes: ['total_training_hour'],
      where: { id: req.body.course_id }
    });
    const data = {allContentInModule:allContentInModule, 
      allContentInCourse:allContentInCourse, 
      courseData:courseData,
      curModuleViews:curModuleViews
    };
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

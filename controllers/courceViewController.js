const express = require("express");
const { getPaginate } = require("../lib/helpers");
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
  async store(req, res) {
    req.body.trainee_id = req.userId;
    const alreadyView = await CourseView.findOne({
      attributes: ['id'],
      where: { trainee_id: req.body.trainee_id, course_id: req.body.course_id}
    }).then(async (result) => {
      if (result !== null) {
        res.send(result);
        console.log("view result=>", result?.dataValues?.id);
        if(result?.dataValues?.id) {
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
        where: { trainee_id: req.body.trainee_id, module_id: req.body.module_id}
      }).then(async (moduleResult) => {
        if (moduleResult !== null) {
          //res.send(result);
          console.log("module view result=>", moduleResult?.dataValues?.id);
          if(moduleResult?.dataValues?.id) {
            await ModuleView
              .increment({ viewed_seconds: req.body.viewed_seconds }, { where: { id: moduleResult?.dataValues?.id } })
          }
        }
        else {
          await ModuleView.create(req.body) 
        }
      })
    }

    async function chapterViewed() {
      const alreadyView = await ChapterView.findOne({
        attributes: ['id'],
        where: { trainee_id: req.body.trainee_id, chapter_id: req.body.chapter_id}
      }).then(async (chapterResult) => {
        if (chapterResult !== null) {
          //res.send(result);
          console.log("module view result=>", chapterResult?.dataValues?.id);
          if(chapterResult?.dataValues?.id) {
            await ChapterView
              .increment({ viewed_seconds: req.body.viewed_seconds }, { where: { id: chapterResult?.dataValues?.id } })
          }
        }
        else {
          await ChapterView.create(req.body) 
        }
      })
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

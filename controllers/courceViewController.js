const express = require("express");
const { getPaginate } = require("../lib/helpers");
const Course = require("../models/Course.model");
const Content = require("../models/Module_content.model");
const CourseView = require("../models/Course_views.model");
const ModuleView = require("../models/Module_views.model");
const ChapterView = require("../models/Chapter_views.model");
const Assigned_courses = require("../models/Assigned_courses.model");
const User = require("../models/User.model");
const Module = require("../models/Module.model");
const Revisit = require("../models/Course_revisit.model")
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
      const moduleCompletedCount = await ModuleView.count({ 
        where: { course_id: req.body.course_id, trainee_id: req.userId, status:'completed' },
        include: [
          {
            model: Module,
            as: 'module',
            where: {
              deleted_at: null
            },
            required: false
          }
        ]
      });
      const moduleTotalCount = await Module.count({ where: { course_id: req.body.course_id } });
      const courseReDoneCount = await CourseView.findOne({ attributes: ['id', 'viewed_seconds', 're_done_count'], where: { course_id: req.body.course_id, trainee_id: req.userId } });
      const courseViewData = await ChapterView.findAll({ attributes: ['id', 'viewed_seconds'], where: { course_id: req.body.course_id, trainee_id: req.userId } });
      const totalCourseContent = await Content.count({ where: { course_id: req.body.course_id } });
      await ChapterView
        .findOne({ where: { trainee_id: req.userId, course_id: req.body.course_id }, order: [['chapter_id', 'DESC']] })
        .then((result) => {
          const data = {
            courseViewSec: courseViewSec,
            courseViewData: courseViewData,
            totalCourseContent: totalCourseContent,
            courseReDoneCount: courseReDoneCount,
            moduleCompletedCount,
            moduleTotalCount,
            result: result
          }
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
    //console.clear();
    //console.log(req.body);
    req.body.trainee_id = req.userId;
    let allContentInCourse = await Content.count({ where: { course_id: req.body.course_id } });
    let courseData = await Course.findByPk(req?.body?.course_id);
    let courseContentCompletedCount = await ChapterView.count({ where: { course_id: req.body.course_id, trainee_id: req.body.trainee_id, status: 'completed' } });
    let totalCourseView = await CourseView.findOne({ where: { course_id: req.body.course_id, trainee_id: req.body.trainee_id } });
    const data = {
      allContentInCourse: allContentInCourse,
      courseContentCompletedCount: courseContentCompletedCount,
      totalCourseView: totalCourseView,
      courseData
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
            order: { [Op.lt]: req.body.chapter_order }
          }, order: [['order', 'DESC']]
        });
        console.log(prevContentInModule);

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
        const prevChapterViews = await ChapterView.findOne({ where: { chapter_id: prevContentId, trainee_id: req.userId, status: 'completed' } });
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

    const moduleViewesCount = await ModuleView.findOne({
      attributes: ['viewed_seconds'],where:{course_id: req.body.course_id ,  module_id: req.body.module_id , trainee_id: req.userId}
    })
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
      lastchapter: lastchapter,
      moduleViewesCount:moduleViewesCount?.dataValues.viewed_seconds
    };
    res.send(data);
  }

  async getRecentLearning(req, res) {


    const lastChapter = await ChapterView.findOne({ include: ['course'], where: { trainee_id: req.userId, status: 'ongoing' }, order: [['chapter_id', 'DESC']] });
    
    var data = null;
    if (lastChapter !== null) {
      const moduleCompletedCount = await ModuleView.count({ 
        where: { course_id: lastChapter.dataValues.course_id, trainee_id: req.userId, status:'completed' },
        include: [
          {
            model: Module,
            as: 'module',
            where: {
              deleted_at: null
            },
            required: false
          }
        ]
      });
      const moduleTotalCount = await Module.count({ where: { course_id: lastChapter.dataValues.course_id } });
      let allContentInCourse = await Content.count({ where: { course_id: lastChapter.dataValues.course_id } });
      let courseContentCompletedCount = await ChapterView.count({ where: { course_id: lastChapter.dataValues.course_id, trainee_id: req.userId, status: 'completed' } });
      let totalCourseView = await ChapterView.sum('viewed_seconds', { where: { course_id: lastChapter.dataValues.course_id, trainee_id: req.userId } });
      data = {
        allContentInCourse: allContentInCourse,
        courseContentCompletedCount: courseContentCompletedCount,
        totalCourseView: totalCourseView,
        lastChapter: lastChapter,
        moduleCompletedCount,
        moduleTotalCount
      }
    } else {
      data = {
        lastChapter: lastChapter
      }
    }
    res.send(data);
  }

  async getEachCourseStat(req, res) {
    const countTrainee = await Assigned_courses.count({ where: { course_id: req.body.course_id } });
    const countCourseCompletedUsers = await CourseView.count({ where: { course_id: req.body.course_id, status: 'completed' } });
    const timeSpentByUserInCourse = await CourseView.sum('viewed_seconds', { where: { course_id: req.body.course_id } });
    let userCompletePercent = 0;
    if (countCourseCompletedUsers > 0 && countTrainee > 0) {
      userCompletePercent = ((countCourseCompletedUsers / countTrainee) * 100);
    }
    let weeksSpent = Math.floor((((timeSpentByUserInCourse / 60) / 60) / 24) / 7);
    let data = {
      traineeEnrolled: countTrainee,
      userCompletePercent: userCompletePercent,
      weeksSpent: weeksSpent
    }
    res.send(data);
  }

  // async store(req, res) {
  //   req.body.trainee_id = req.userId;
  //   const currentDate = new Date();
  //   const formattedDate = currentDate.toISOString().substring(0, 10);
  //   const alreadyView = await CourseView.findOne({
  //     attributes: ['id', 'status'],
  //     where: { trainee_id: req.body.trainee_id, course_id: req.body.course_id }
  //   }).then(async (result) => {
  //     if (result !== null) {
  //       //res.send(result);
  //       console.log("view result=>", result?.dataValues?.id);
  //       if (result?.dataValues?.id) {
  //         if (result?.dataValues?.status === "completed") {
  //           const entryExists = await Revisit.findOne({
  //             attributes: ['id', 'visit_date'],
  //             where: {
  //               trainee_id: req.body.trainee_id,
  //               course_id: req.body.course_id,
  //               visit_date: formattedDate,
  //             },
  //           });

  //           if (!entryExists) {
  //             await Revisit.create({
  //               trainee_id: req.body.trainee_id,
  //               course_id: req.body.course_id,
  //               viewed_seconds: 30,
  //             });
  //           } else {
  //             await Revisit.increment({ viewed_seconds: req.body.viewed_seconds }, {
  //               where: { id: entryExists?.dataValues?.id }
  //             })
  //           }
  //         }
  //         await CourseView
  //           .increment({ viewed_seconds: req.body.viewed_seconds }, { where: { id: result?.dataValues?.id } })
  //       }
  //     }
  //     else {
  //       await CourseView
  //         .create(req.body)
  //         .then((resultCreate) => {
  //           //res.send(resultCreate);
  //           User.increment({ course_count: 1 }, { where: { id: req.userId } })
  //         })
  //         .catch((error) => {
  //           console.error("Failed to retrieve data : ", error);
  //         });
  //     }
  //     //console.log("inside course");
  //     await moduleViewed();
  //     await chapterViewed();
  //   }).catch((error) => {
  //     console.clear();
  //     console.log(error)
  //     return res.status(422).send(
  //       {
  //         message: "Unable To Submit Please Try Again Later.",
  //       }
  //     );
  //   });

  //   async function moduleViewed() {
  //     const alreadyView = await ModuleView.findOne({
  //       attributes: ['id'],
  //       where: { trainee_id: req.body.trainee_id, module_id: req.body.module_id }
  //     }).then(async (moduleResult) => {
  //       if (moduleResult !== null) {
  //         //res.send(result);
  //         console.log("module view result=>", moduleResult?.dataValues?.id);
  //         if (moduleResult?.dataValues?.id) {
  //           await ModuleView
  //             .increment({ viewed_seconds: req.body.viewed_seconds }, { where: { id: moduleResult?.dataValues?.id } })
  //         }
  //       }
  //       else {
  //         await ModuleView.create(req.body)
  //       }
  //       //console.log("inside module");
  //     })
  //   }

  //   async function chapterViewed() {
  //     const alreadyView = await ChapterView.findOne({
  //       attributes: ['id', 'viewed_seconds'],
  //       where: { trainee_id: req.body.trainee_id, chapter_id: req.body.chapter_id }
  //     }).then(async (chapterResult) => {
  //       if (chapterResult !== null) {
  //         //res.send(result);
  //         console.log("Chapter view result=>", chapterResult?.dataValues);
  //         if (chapterResult?.dataValues?.id) {
  //           await ChapterView
  //             .increment({ viewed_seconds: req.body.viewed_seconds },
  //               { where: { id: chapterResult?.dataValues?.id } }
  //             )
  //         }
  //       }
  //       else {
  //         await ChapterView.create(req.body)
  //       }
  //     })
  //     //console.log("inside chapter");
  //     await updateAll();
  //   }

  //   async function updateAll() {
  //     //console.log("inside update");
  //     const courseData = await Course.findOne({
  //       attributes: ['total_training_hour'],
  //       where: { id: req.body.course_id }
  //     });
  //     //console.log("courseData = ", courseData.dataValues.total_training_hour);
  //     const maxCourseContentId = await Content.max('id', { where: { course_id: req.body.course_id } });
  //     console.log("maxCourseContentId = ", maxCourseContentId);
  //     var isCourseLastContent = false;
  //     if (maxCourseContentId == req.body.chapter_id) {
  //       isCourseLastContent = true;
  //     }

  //     const maxModuleContentId = await Content.max('id', { where: { module_id: req.body.module_id } });
  //     console.log("maxModuleContentId = ", maxModuleContentId);
  //     var isModuleLastContent = false;
  //     if (maxModuleContentId == req.body.chapter_id) {
  //       console.log("lastmodulecontent")
  //       isModuleLastContent = true;
  //     }

  //     const totalCourseContent = await Content.count({ where: { course_id: req.body.course_id } });
  //     console.log("totalCourseContent = ", totalCourseContent);
  //     var perContentSecond = 0;
  //     if (courseData.dataValues.total_training_hour > 0) {
  //       let courseTrainingSecond = courseData.dataValues.total_training_hour * 60 * 60;
  //       perContentSecond = courseTrainingSecond / totalCourseContent;
  //     }

  //     const curChapterViewSeconds = await ChapterView.findOne({
  //       attributes: ['status', 'viewed_seconds'],
  //       where: { trainee_id: req.body.trainee_id, chapter_id: req.body.chapter_id }
  //     });
  //     if (curChapterViewSeconds.dataValues.viewed_seconds >= perContentSecond) {
  //       if (curChapterViewSeconds.dataValues.status != "completed") {
  //         const curChapterUpdate = await ChapterView.update({ status: 'completed' },
  //           { where: { trainee_id: req.body.trainee_id, chapter_id: req.body.chapter_id } });

  //         if (isModuleLastContent) {
  //           const curModuleUpdate = await ModuleView.update({ status: 'completed' },
  //             { where: { trainee_id: req.body.trainee_id, module_id: req.body.module_id } });
  //         }

  //         if (isCourseLastContent) {
  //           const curCourseUpdate = await CourseView.update({ status: 'completed' },
  //             { where: { trainee_id: req.body.trainee_id, course_id: req.body.course_id } });
  //         }
  //       }
  //     }
  //     console.log("perContentSecond = ", perContentSecond);
  //     console.log("curChapterViewSeconds = ", curChapterViewSeconds.dataValues.viewed_seconds);
  //     console.log("isCourseLastContent = " + isCourseLastContent + " isModuleLastContent " + isModuleLastContent + ", currentChapterId " + req.body.chapter_id);
  //     const resultData = {
  //       perContentSecond: perContentSecond,
  //       curChapterViewSeconds: curChapterViewSeconds.dataValues.viewed_seconds
  //     };
  //     res.send(resultData)
  //   }
  // }



  async store(req, res) {
    req.body.trainee_id = req.userId;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substring(0, 10);
    const alreadyView = await CourseView.findOne({
      attributes: ['id', 'status'],
      where: { trainee_id: req.body.trainee_id, course_id: req.body.course_id }
    }).then(async (result) => {
      if (result !== null) {
        //res.send(result);
        console.log("view result=>", result?.dataValues?.id);
        if (result?.dataValues?.id) {
          if (result?.dataValues?.status === "completed") {
            const entryExists = await Revisit.findOne({
              attributes: ['id', 'visit_date'],
              where: {
                trainee_id: req.body.trainee_id,
                course_id: req.body.course_id,
                visit_date: formattedDate,
              },
            });

            if (!entryExists) {
              await Revisit.create({
                trainee_id: req.body.trainee_id,
                course_id: req.body.course_id,
                viewed_seconds: 30,
              });
            } else {
              await Revisit.increment({ viewed_seconds: req.body.viewed_seconds }, {
                where: { id: entryExists?.dataValues?.id }
              })
            }
          }
          await CourseView
            .increment({ viewed_seconds: req.body.viewed_seconds }, { where: { id: result?.dataValues?.id } })
        }
      }
      else {
        await CourseView
          .create(req.body)
          .then((resultCreate) => {
            //res.send(resultCreate);
            User.increment({ course_count: 1 }, { where: { id: req.userId } })
          })
          .catch((error) => {
            console.error("Failed to retrieve data : ", error);
          });
      }
      //console.log("inside course");
      await chapterViewed();

      await moduleViewed();
    }).catch((error) => {
      console.clear();
      console.log(error)
      return res.status(422).send(
        {
          message: "Unable To Submit Please Try Again Later.",
        }
      );
    });

    async function moduleViewed() {
      const courseData = await Course.findOne({
        attributes: ['total_training_hour'],
        where: { id: req.body.course_id }
      });
      const maxCourseContent = await Content.count({ where: { course_id: req.body.course_id } });
      const secondsPerContent = (courseData.dataValues.total_training_hour * 3600) / maxCourseContent;

      const curChapterViewSeconds = await ChapterView.findOne({
        attributes: ['status', 'viewed_seconds'],
        where: { trainee_id: req.body.trainee_id, chapter_id: req.body.chapter_id }
      });

      const totalCompletedChapters = await ChapterView.count({
       
        where:{
        trainee_id: req.body.trainee_id, module_id: req.body.module_id ,status:'completed'
      }})
      const totalOngoingChapters = await ChapterView.min('id',{
       
        where:{
        trainee_id: req.body.trainee_id, module_id: req.body.module_id ,status:'ongoing'
      }})
      
      const ongoingChapterViewSeconds = await ChapterView.findOne({
        attributes: ['status', 'viewed_seconds'],
        where: { trainee_id: req.body.trainee_id, id: totalOngoingChapters }
      });
      
      let totalViewedTime = totalCompletedChapters * secondsPerContent;

      if(ongoingChapterViewSeconds != null)
      {
        if(ongoingChapterViewSeconds?.dataValues.viewed_seconds >= secondsPerContent){
          totalViewedTime = totalViewedTime + secondsPerContent;
        }
        else
        {
          
          totalViewedTime = totalViewedTime + ongoingChapterViewSeconds?.dataValues.viewed_seconds;
  
        }
      }
      

      // if(curChapterViewSeconds?.dataValues.viewed_seconds >= secondsPerContent){

        const alreadyView = await ModuleView.findOne({
          attributes: ['id','viewed_seconds'],
          where: { trainee_id: req.body.trainee_id, module_id: req.body.module_id }
        }).then(async (moduleResult) => {
          if (moduleResult !== null) {
            //res.send(result);
            console.log("module view result=>", moduleResult?.dataValues?.id);
            if (moduleResult?.dataValues?.id ) {

              if(moduleResult.dataValues.viewed_seconds < totalViewedTime)
              // await ModuleView
              //   .increment({ viewed_seconds: totalViewedTime }, { where: { id: moduleResult?.dataValues?.id } })
      console.log('totalviewed time '+totalViewedTime);

                await ModuleView
                .update({ viewed_seconds: totalViewedTime }, { where: { id: moduleResult?.dataValues?.id } })
            }
          }
          else {
            await ModuleView.create(req.body)
          }
          //console.log("inside module");
        })
      // }
      
    }

    async function chapterViewed() {
      const alreadyView = await ChapterView.findOne({
        attributes: ['id', 'viewed_seconds'],
        where: { trainee_id: req.body.trainee_id, chapter_id: req.body.chapter_id }
      }).then(async (chapterResult) => {
        if (chapterResult !== null) {
          //res.send(result);
          console.log("Chapter view result=>", chapterResult?.dataValues);
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
      const resultData = {
        perContentSecond: perContentSecond,
        curChapterViewSeconds: curChapterViewSeconds.dataValues.viewed_seconds
      };
      res.send(resultData)
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

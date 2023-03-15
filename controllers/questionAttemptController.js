const express = require("express");
const { getPaginate } = require("../lib/helpers");
const AssignmentAttempt = require("../models/Assignment_attempt.model");
const QuestionAttempt = require("../models/Question_attempt.model");
const QuestionOption = require("../models/Question_option.model");
const ChapterView = require("../models/Chapter_views.model");
const ModelView = require("../models/Module_views.model");
const CourseView = require("../models/Course_views.model");
const sequelize = require("../lib/dbConnection");
const { Op } = require("sequelize");
const questionAttemptController = class {
  async index(req, res) {
    await QuestionAttempt
      .findAndCountAll({
        offset: pageNumber * pageLimit, limit: pageLimit
      })
      .then((result) => {
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }

  async traineeAttemptList(req, res) {
    req.body.trainee_id = req.userId;
    //console.clear();
    //console.log(req.body);
    var outResult = [];
    var maxPercent = 0;
    var curData = [];
    async function attemptRes(allCourses) {
      let questionResp = async () => {
        var i = 0;
        for (const curCourse of allCourses) {
          //console.log("cur" + i, curCourse.DISTINCT);
          maxPercent = await AssignmentAttempt.max('correct_percentage',
            { where: { trainee_id: req.body.trainee_id, status: 'submitted', course_id: curCourse.DISTINCT } }
          );
          curData = await AssignmentAttempt.findOne(
            {include: ['course'],
            where: { trainee_id: req.body.trainee_id, status: 'submitted', course_id: curCourse.DISTINCT, correct_percentage:maxPercent } }
          );
          
          outResult.push({maxPercent:maxPercent, curData:curData})
          i++;
        }
      }
      let retResp = async () => {
        await questionResp();
        //console.log("outreult", outResult)
        res.send(outResult);
      }
      retResp();
    }
    await AssignmentAttempt
      .aggregate('course_id', 'DISTINCT', {
        plain: false,
        where: { trainee_id: req.body.trainee_id, status: 'submitted' }
      })
      .then((result) => {
        attemptRes(result)
        //console.log("result", result);
      })
      .catch((error) => {
        return res.status(422).send(
          {
            message: "Please Try Again Later.",
          }
        );
        console.error("Failed to retrieve data : ", error);
      });
  }

  async traineeAttempts(req, res) {
    //console.clear();
    //console.log(req.body);
    var outResult = [];
    var maxPercent = 0;
    var curData = [];
    var totalAttempts = 0;
    var totalScore = 0;


    async function attemptRes(allCourses) {
      let questionResp = async () => {
        var i = 0;
        for (const curCourse of allCourses) {
          //console.log("cur" + i, curCourse.DISTINCT);
          maxPercent = await AssignmentAttempt.max('correct_percentage',
            { where: { trainee_id: req.body.trainee_id, course_id: curCourse.DISTINCT } }
          );
          totalScore = await AssignmentAttempt.sum('correct_percentage',
            { where: { trainee_id: req.body.trainee_id, course_id: curCourse.DISTINCT } }
          );
          totalAttempts = await AssignmentAttempt.count(
            { where: { trainee_id: req.body.trainee_id, course_id: curCourse.DISTINCT } }
          );
          curData = await AssignmentAttempt.findOne(
            {include: ['course'],
            where: { trainee_id: req.body.trainee_id, course_id: curCourse.DISTINCT, correct_percentage:maxPercent } }
          );
          
          outResult.push({maxPercent:maxPercent, totalScore:totalScore, totalAttempts:totalAttempts, curData:curData})
          i++;
        }
      }
      let retResp = async () => {
        await questionResp();
        //console.log("outreult", outResult)
        res.send(outResult);
      }
      retResp();
    }
    await AssignmentAttempt
      .aggregate('course_id', 'DISTINCT', {
        plain: false,
        where: { trainee_id: req.body.trainee_id }
      })
      .then((result) => {
        attemptRes(result)
        //console.log("result", result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
        return res.status(422).send(
          {
            message: "Please Try Again Later.",
          }
        );
      });
  }

  async checkQuestions(req, res) {
    req.body.questions.forEach(async (curQuestion) => {
      is_correct = false;
      if (curQuestion.answer) {
        if (curQuestion.answer.length > 1) {
          answerAr = curQuestion.answer;
        } else {
          answerAr = curQuestion.answer.split(',');
        }
        const getOption = await QuestionOption.findAll(
          { where: { question_id: curQuestion.question, is_answer: true, id: answerAr }, attributes: ['id', 'is_answer'] }
        ).then(async (optionResult) => {
          if (answerAr.length == optionResult.length) {
            //console.log(curQuestion.question, "correct");
          } else {
            //console.log(curQuestion.question, "not correct");
          }
        });
      } else {
        console.log("mot answered");
      }
    });
  }

  async getSubmitted(req, res) {
    //console.clear();
    req.body.trainee_id = req.userId;
    //console.log(req.body);
    const attempt = await AssignmentAttempt.findOne({
      attributes: ['id'],
      where: { trainee_id: req.body.trainee_id, course_id: req.body.course_id, status: 'drafted' },
      include: ["question_attempted"]
    }).then(async (result) => {
      var is_attempted = false;
      var attemptData = result;
      if (result !== null) {
        is_attempted = true;
      }
      const data = { is_attempted: is_attempted, attemptData: attemptData };
      res.send(data);
    }).catch((error) => {
      return res.status(422).send(
        {
          message: "No Attempt Found",
        }
      );
    });
  }

  async store(req, res) {
    //console.clear();
    req.body.trainee_id = req.userId;
    //console.log(req.body);
    var attemptId = 0;
    const attempt = await AssignmentAttempt.findOne({
      attributes: ['id'],
      where: { trainee_id: req.body.trainee_id, course_id: req.body.course_id, status: 'drafted' }
    }).then(async (result) => {
      if (result !== null) {
        //console.log(result.dataValues);
        attemptId = result.dataValues.id;
        if (req.body.status == 'submitted') {
          await AssignmentAttempt
            .update({ status: 'submitted' }, { where: { id: attemptId } })
        }
        attemptRes(attemptId);
        return attemptId;
      }
      else {
        await AssignmentAttempt.create(req.body)
          .then(async (result) => {
            //console.log("result", result.dataValues);
            attemptId = result.dataValues.id;
            attemptRes(attemptId);
            return attemptId;
          })
        //console.log("not found");
      }
    }).catch((error) => {
      return res.status(422).send(
        {
          message: "Unable To Submit Please Try Again Later.",
        }
      );
    });

    async function attemptRes(attemptId) {

      let incorrectQues = [];
      let correctQues = [];
      var is_correct = false;
      var answerString = "";
      var answerAr = [];
      let totalQuestion = 0;
      let answeredQuestion = 0;
      var assignmentAttempt = [];
      //console.log(req.body.questions.length);
      let questionResp = async () => {
        for (const curQuestion of req.body.questions) {
          is_correct = false;
          answerAr = [];
          answerString = "";
          totalQuestion++;
          if (curQuestion.answer) {
            answeredQuestion++;
            if (Array.isArray(curQuestion.answer)) {
              answerAr = curQuestion.answer;
              answerString = curQuestion.answer.toString();
            } else {
              answerAr = curQuestion.answer.split(',');
              answerString = curQuestion.answer;
            }
            const getOption = await QuestionOption.findAll(
              { where: { question_id: curQuestion.question, is_answer: true, id: answerAr }, attributes: ['id', 'is_answer'] }
            ).then(async (optionResult) => {
              if (answerAr.length == optionResult.length) {
                //console.log(curQuestion.question, "correct");
                is_correct = true;
                correctQues.push(curQuestion.question);
              } else {
                incorrectQues.push(curQuestion.question);
                //console.log(curQuestion.question, "not correct");
              }
              const checkQuestion = await QuestionAttempt.findOne(
                { where: { assignment_attempt_id: attemptId, question: curQuestion.question } }
              ).then(async (qresult) => {
                if (qresult == null) {
                  const insertQuestion = await QuestionAttempt.create(
                    {
                      assignment_attempt_id: attemptId,
                      question: curQuestion.question,
                      answer: answerString,
                      is_correct_answer: is_correct
                    });
                } else {
                  const insertQuestion = await QuestionAttempt.update(
                    { answer: answerString, is_correct_answer: is_correct },
                    { where: { assignment_attempt_id: attemptId, question: curQuestion.question } });
                }
              });
            });
          } else {
            incorrectQues.push(curQuestion.question);
          }

        };
        
        assignmentAttempt = await AssignmentAttempt.count({
          where: { trainee_id: req.body.trainee_id, course_id: req.body.course_id, status: 'submitted' }
        })

        if(assignmentAttempt > 1) {
          const assignmentCorrect = await AssignmentAttempt.count({
            where: { trainee_id: req.body.trainee_id, course_id: req.body.course_id, status: 'submitted', correct_percentage: {[Op.gte]:80} }
          });

          if(assignmentCorrect == 0) {
            CourseView.update({viewed_seconds:'0', status: 'ongoing'}, { where :{trainee_id: req.body.trainee_id, course_id: req.body.course_id}});
            ModelView.destroy({ where :{trainee_id: req.body.trainee_id, course_id: req.body.course_id}});
            ChapterView.destroy({ where :{trainee_id: req.body.trainee_id, course_id: req.body.course_id}});
          } 
        }
      };

      let retResp = async () => {
        await questionResp();
        var resultData = [];
        resultData.push("assignmentAttempt", assignmentAttempt);
        var answerPercent = (correctQues.length / totalQuestion) * 100;
        //console.log("percent = ", answerPercent);
        await AssignmentAttempt
          .update({ total_questions: totalQuestion, attempted_questions: answeredQuestion, correct_percentage: answerPercent }, { where: { id: attemptId } })
        if (req.body.status == 'submitted') {
          resultData = {
            incorrectQues: incorrectQues,
            correctQues: correctQues,
            totalQuestion: totalQuestion,
            answeredQuestion: answeredQuestion,
            answerPercent: answerPercent,
            assignmentAttempt: assignmentAttempt
          };
        }
        res.send(resultData);
      };
      retResp();
    }

  }

  async countAttempt(req, res) {
    req.body.trainee_id = req.userId;
    const assignmentAttempt = await AssignmentAttempt.count({
      where: { trainee_id: req.body.trainee_id, course_id: req.body.course_id, status: 'submitted' }
    })
    res.send({ assignmentAttempt });
  }

  async show(req, res) {
    const questionAttempt = await QuestionAttempt.findByPk(req.params.id);
    res.send({ data: questionAttempt });
  }
  update(req, res) {
    res.send(req.body);
  }
  async destroy(req, res) {
    const questionAttempt = await QuestionAttempt.destroy({ where: { id: req.body.id } }).then((result) => {
      return { message: "QuestionAttempt Deleted" };
    });
    res.send(questionAttempt);
  }
};

module.exports = new questionAttemptController();

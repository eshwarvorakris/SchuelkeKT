const express = require("express");
const { getPaginate } = require("../lib/helpers");
const AssignmentAttempt = require("../models/Assignment_attempt.model");
const QuestionAttempt = require("../models/Question_attempt.model");
const QuestionOption = require("../models/Question_option.model");
const questionAttemptController = class {
  async index(req, res) {
    await QuestionAttempt
      .findAndCountAll({ offset: pageNumber * pageLimit, limit: pageLimit })
      .then((result) => {
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
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
            console.log(curQuestion.question, "correct");
          } else {
            console.log(curQuestion.question, "not correct");
          }
        });
      } else {
        console.log("mot answered");
      }
    });
  }

  async getSubmitted(req, res) {
    console.clear();
    req.body.trainee_id = req.userId;
    console.log(req.body);
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
      const data = {is_attempted:is_attempted, attemptData:attemptData};
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
    console.clear();
    req.body.trainee_id = req.userId;
    console.log(req.body);
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
        console.log("not found");
      }
    }).catch((error) => {
      return res.status(422).send(
        {
          message: "Question not Found",
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
      console.log(req.body.questions.length);
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
                console.log(curQuestion.question, "correct");
                is_correct = true;
                correctQues.push(curQuestion.question);
              } else {
                incorrectQues.push(curQuestion.question);
                console.log(curQuestion.question, "not correct");
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
      };

      let retResp = async () => {
        await questionResp();
        var resultData = [];
        var answerPercent = (correctQues.length/totalQuestion)*100;
        if (req.body.status == 'submitted') {
          resultData = { incorrectQues: incorrectQues,
            correctQues: correctQues,
            totalQuestion:totalQuestion,
            answeredQuestion:answeredQuestion,
            answerPercent:answerPercent
          };
        }
        res.send(resultData);
      };
      retResp();
    }
    
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

const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Question = require("../models/Question.model");
const Course = require("../models/Course.model");
const { query } = require("express");
const QuestionOption = require("../models/Question_option.model");
const sequelize = require("../lib/dbConnection");
const questionController = class {
  async index(req, res) {
    await Question
      .findAndCountAll({ distinct: true, include: ['course', 'options'], offset: pageNumber * pageLimit, limit: pageLimit, where: req.query ?? [], order: [orderByColumn] })
      .then((result) => {
        //console.log(result);
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }

  async indexrandom(req, res) {
    await Question
      .findAndCountAll({ distinct: true, include: ['course', 'options'], offset: pageNumber * pageLimit, limit: pageLimit, where: req.query ?? [], order: sequelize.random() })
      .then((result) => {
        //console.log(result);
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }

  async store(req, res) {
    const data = req.body;
    console.clear();
    req.body.questions.forEach(async (curQuestion) => {

      let i = 0;
      curQuestion?.options?.map((item, index) => {
        //console.log(curQuestion?.options[index]?.is_answer);
        if ((item?.is_answer === "false" || item?.is_answer === "true" || item?.is_answer === true) && curQuestion?.options[index]?.is_answer !== undefined) {
          curQuestion.options[index].is_answer = "true";
        } else {
          curQuestion.options[index].is_answer = "false";
        }

        if (item?.id == "") {
          delete curQuestion.options[i].id;
        }
        i++;
      });
      //console.log(curQuestion?.options);
      const rules = {
        course_id: "required",
        question: "required",
        question_type: "required",
        options: "required|array",
      };
      const validation = validator.make(curQuestion, rules);
      if (validation.fails()) {
        // return res.status(422).send(
        //   {
        //     message: _.chain(validation.getErrors()).flatMap().head(),
        //     errors: validation.getErrors(),
        //   }
        // );
        console.log(validation.getErrors())
      }
      else {
        if (curQuestion?.id != "") {
          const question = await Question.findByPk(curQuestion?.id);
          if (question) {
            question.update(curQuestion)
            const updateQuery = await QuestionOption.bulkCreate(curQuestion.options, { fields: ['id', 'option', 'is_answer'], updateOnDuplicate: ["id", "option", 'is_answer'] });
          }
          else {
            delete curQuestion.id;
            await Question
              .create(curQuestion, {
                include: "options"
              }).then(async (result) => {
                //console.log("hereeeeeeeee");
                await Course.update({ question_added: "yes" }, { where: { id: curQuestion.course_id } });
              }).catch((error) => {
                console.error("Failed to retrieve data : ", error);
              });
          }
        } else {
          delete curQuestion.id;
          await Question
            .create(curQuestion, {
              include: "options"
            }).then(async (result) => {
              //console.log("hereeeeeeeee");
              await Course.update({ question_added: "yes" }, { where: { id: curQuestion.course_id } });
            }).catch((error) => {
              console.error("Failed to retrieve data : ", error);
            });
        }
      }
    });
    res.send("Assignment Updated");
  }
  async show(req, res) {
    const question = await Question.findByPk(req.params.id, { include: ["course", "options"] });
    if (question) {
      return res.send({ data: question });
    }
    return res.status(422).send(
      {
        message: "Question not Found",
      }
    );
  }
  async update(req, res) {
    const question = await Question.findByPk(req.params.id);
    if (question) {
      question.update(req.body)
      const updateQuery = await QuestionOption.bulkCreate(req.body.options, { fields: ['id', 'option', 'is_answer'], updateOnDuplicate: ["id", "option", 'is_answer'] });
      //console.log(updateQuery);
      return res.send({ data: question });
    }
    return res.status(422).send(
      {
        message: "Question not update",
      }
    );
  }
  async destroy(req, res) {
    const question = await Question.destroy({ where: { id: req.params.id } }).then((result) => {
      return { message: "Question Deleted" };
    });
    res.send(question);
  }
};

module.exports = new questionController();

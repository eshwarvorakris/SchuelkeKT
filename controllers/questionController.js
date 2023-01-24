const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Question = require("../models/Question.model");
const questionController = class {
  async index(req, res) {
    await Question
      .findAndCountAll({ include: ['course', 'options'], offset: pageNumber * pageLimit, limit: pageLimit, where: req.query ?? [] })
      .then((result) => {
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

      curQuestion?.options?.map((item, index) => {
        //console.log(curQuestion?.options[index]?.is_answer);
        if((item?.is_answer === "false" || item?.is_answer === "true" || item?.is_answer === true) && curQuestion?.options[index]?.is_answer !== undefined) {
          curQuestion.options[index].is_answer = "true";
        } else {
          curQuestion.options[index].is_answer = "false";
        }
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
        return res.status(422).send(
          {
            message: _.chain(validation.getErrors()).flatMap().head(),
            errors: validation.getErrors(),
          }
        );
      }
      await Question
        .create(curQuestion, {
          include: "options"
        })
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.error("Failed to retrieve data : ", error);
        });
    });
  }
  async show(req, res) {
    const question = await Question.findByPk(req.params.id);
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
      question.update(req.body);
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

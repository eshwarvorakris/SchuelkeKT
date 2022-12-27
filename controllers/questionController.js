const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Question = require("../models/Question.model");
const questionController = class {
  async index(req, res) {
    await Question
      .findAndCountAll({include:['course'], offset:req.query.page,limit:15,where:req.query??[]})
      .then((result) => {
        res.send(getPaginate(result,req.query.page ?? 1,15));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
    const data = req.body;
    const rules = {
      question: "required",
      //description: "required"
    };
    const validation = validator.make(data, rules);
    if (validation.fails()) {
      return res.status(422).send(
        {
          message: _.chain(validation.getErrors()).flatMap().head(),
          errors: validation.getErrors(),
        }
      );
    }
    await Question
      .create(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async show(req, res) {
    const question=await Question.findByPk(req.params.id);
    if(question)
    {
    return res.send({data:question});
    }
    return res.status(422).send(
      {
        message:"Question not Found" ,
      }
    );
  }
  async update(req, res) {
    const question=await Question.findByPk(req.params.id);
    if(question)
    {
    question.update(req.body);
    return  res.send({data:question});
    }
    return res.status(422).send(
      {
        message:"Question not update" ,
      }
    );
  }
  async destroy(req, res) {
   const question= await Question.destroy({where:{id:req.params.id}}).then((result)=>{
    return {message:"Question Deleted"};
   });
    res.send(question);
  }
};

module.exports = new questionController();

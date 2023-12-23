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
      // curQuestion?.options?.map((item, index) => {
      //   //console.log(curQuestion?.options[index]?.is_answer);
      //   if ((item?.is_answer === "false" || item?.is_answer === "true" || item?.is_answer === true) && curQuestion?.options[index]?.is_answer !== undefined) {
      //     curQuestion.options[index].is_answer = "true";
      //   } else {
      //     curQuestion.options[index].is_answer = "false";
      //   }

      //   if (item?.id == "") {
      //     delete curQuestion.options[i].id;
      //   }
      //   i++;
      // });
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
        // return res.status(422).send(validation.getErrors());
      }
      else {
        if (curQuestion?.id != "") {
          const question = await Question.findByPk(curQuestion?.id);
          if (question) {
            question.update(curQuestion)
         

            
            const updatedOptions = curQuestion.options.map(async (option,index)=>{

              console.log(option.id);
              let is_answer = false;
              console.log(curQuestion.options_answers);
              if(curQuestion.options_answer != undefined)
              {
                  if(typeof curQuestion.options_answer === 'string' && index == curQuestion.options_answer)
                  {
                    is_answer = true;
                  }
                  console.log(curQuestion.options_answer.includes(index.toString()));
                  if(typeof curQuestion.options_answer === 'object' && curQuestion.options_answer.includes(index.toString()))
                  {
                    is_answer = true;

                  }
                  console.log(typeof curQuestion.options_answer);
              }
              if(option.id == "")
              {
                await QuestionOption.create({option:option.option,question_id:question.dataValues.id, is_answer});
              }

              if(option.id != "")
              {
                const optionResult = await QuestionOption.findByPk(option.id);

                if(option)
                {
                  optionResult.update({option:option.option,question_id:question.dataValues.id, is_answer})
                }

              }
              // let is_answer = false;
              // console.log(curQuestion.options_answers);
              // if(curQuestion.options_answer != undefined)
              // {
              //     if(typeof curQuestion.options_answer === 'string' && index == curQuestion.options_answer)
              //     {
              //       is_answer = true;
              //     }
              //     console.log(typeof curQuestion.options_answer);
              // }
              // await QuestionOption.create({...option,question_id:question.dataValues.id, is_answer});
            })

            

            // const updateQuery = await QuestionOption.bulkCreate(curQuestion.options);
          }
          else {
            delete curQuestion.id;
          
            await Question
              .create(curQuestion).then(async (result) => {
                //console.log("hereeeeeeeee");

                const updatedOptions = curQuestion.options.map(async (option,index)=>{
                  let is_answer = false;
                  if(curQuestion.options_answer != undefined)
                  {
                      if(typeof curQuestion.options_answer === 'string' && index == curQuestion.options_answer)
                      {
                        is_answer = true;
                      }
                      console.log(curQuestion.options_answer.includes(index.toString()));
                      if(typeof curQuestion.options_answer === 'object' && curQuestion.options_answer.includes(index.toString()))
                      {
                        is_answer = true;
    
                      }
                      console.log(typeof curQuestion.options_answer);
                  }
                  
                    await QuestionOption.create({option:option.option,question_id:result.dataValues.id, is_answer});
                  

                })




                await Course.update({ question_added: "yes" }, { where: { id: curQuestion.course_id } });
              }).catch((error) => {
                console.error("Failed to retrieve data : ", error);
              });
          }
        } else {
          
          delete curQuestion.id;



          await Question
            .create(curQuestion, {
          
            }).then(async (result) => {
          
              const updatedOptions = curQuestion.options.map(async (option,index)=>{
                let is_answer = false;
                if(curQuestion.options_answer != undefined)
                {
                    if(typeof curQuestion.options_answer === 'string' && index == curQuestion.options_answer)
                    {
                      is_answer = true;
                    }
                    console.log(curQuestion.options_answer.includes(index.toString()));
                    if(typeof curQuestion.options_answer === 'object' && curQuestion.options_answer.includes(index.toString()))
                    {
                      is_answer = true;
  
                    }
                    console.log(typeof curQuestion.options_answer);
                }
                
                  await QuestionOption.create({option:option.option,question_id:result.dataValues.id, is_answer});
                

              })

              await Course.update({ question_added: "yes" }, { where: { id: curQuestion.course_id } });
            }).catch((error) => {
              console.error("Failed to retrieve data : ", error);
            });
        }
      }
    });
    return res.send(req.body);
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



    async destroyOption(req, res) {


  const question = await QuestionOption.destroy({ where: { id: req.params.id } }).then((result) => {
    return { message: 'Option Removed' };
  });
  res.send(question);
}
  async destroy(req, res) {


    const question = await Question.destroy({ where: { id: req.params.id } }).then((result) => {
      return { message: 'Question Deleted' };
    });
    res.send(question);
  }

  async getQuestionsCountBycourse(req,res){
    const questions = await Question.count({where:{
      course_id:req.body.course_id
    }})

    console.log(questions);
    let data = {
      questionsCount:questions
    }
    return res.send(data);

  }
};

module.exports = new questionController();

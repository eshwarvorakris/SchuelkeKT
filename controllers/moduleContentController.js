const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Content = require("../models/Module_content.model");
const contentController = class {
  async index(req, res) {
    await Content
      .findAndCountAll({offset:req.query.page,limit:15})
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
      name: "required",
     // description: "required"
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
    await Content
      .create(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async show(req, res) {
    const content=await Content.findByPk(req.params.id);
    res.send({data:content});
  }
  update(req, res) {
    res.send(req.body);
  }
  async destroy(req, res) {
   const content= await Content.destroy({where:{id:req.body.id}}).then((result)=>{
    return {message:"Content Deleted"};
   });
    res.send(content);
  }
};

module.exports = new contentController();

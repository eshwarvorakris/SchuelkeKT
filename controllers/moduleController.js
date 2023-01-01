const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Module = require("../models/Module.model");
const moduleController = class {
  async index(req, res) {
    await Module
      .findAndCountAll({include:['course'], offset: pageNumber*pageLimit, limit: pageLimit,where:req.query})
      .then((result) => {
        res.send(getPaginate(result,pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
    const data = req.body;
    const rules = {
      name: "required",
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
    await Module
      .create(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async show(req, res) {
    const module=await Module.findByPk(req.params.id);
    if(module)
    {
    return res.send({data:module});
    }
    return res.status(422).send(
      {
        message:"Module not Found" ,
      }
    );
  }
  async update(req, res) {
    const module=await Module.findByPk(req.params.id);
    if(module)
    {
      module.update(req.body);
    return  res.send({data:module});
    }
    return res.status(422).send(
      {
        message:"Module not update" ,
      }
    );
  }
  async destroy(req, res) {
   const module= await Module.destroy({where:{id:req.params.id}}).then((result)=>{
    return {message:"Module Deleted"};
   });
    res.send(Module);
  }
};

module.exports = new moduleController();

const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Content = require("../models/Module_content.model");
const moduleContentController = class {
  async index(req, res) {
    await Content
      .findAndCountAll({ include: ['module'], offset: pageNumber * pageLimit, limit: pageLimit, where: req.query ?? [] })
      .then((result) => {
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
    const data = req.body;
    const rules = {
      content: "required",
      content_type: "required",
      module_id: "required"
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
    const content = await Content.findByPk(req.params.id);
    if (content) {
      return res.send({ data: content });
    }
    return res.status(422).send(
      {
        message: "Content not Found",
      }
    );
  }
  async update(req, res) {
    const content = await Content.findByPk(req.params.id);
    if (content) {
      content.update(req.body);
      return res.send({ data: content });
    }
    return res.status(422).send(
      {
        message: "Content not update",
      }
    );
  }
  async destroy(req, res) {
    const content = await Content.destroy({ where: { id: req.params.id } }).then((result) => {
      return { message: "Content Deleted" };
    });
    res.send(content);
  }
};

module.exports = new moduleContentController();

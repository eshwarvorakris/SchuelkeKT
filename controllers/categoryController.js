const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Category = require("../models/Category.model");
const categoryController = class {
  async index(req, res) {
    await Category
      .findAndCountAll({ offset: req.query.page, limit: 2 })
      .then((result) => {
        res.send(getPaginate(result, req.query.page ?? 1, 2));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
    const data = req.body;
    const rules = {
      name: "required",
      description: "required"
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
    await Category
      .create(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async show(req, res) {
    const category = await Category.findByPk(req.params.id);
    res.send({ data: Category });
  }
  update(req, res) {
    res.send(req.body);
  }
  async destroy(req, res) {
    const category = await Category.destroy({ where: { id: req.body.id } }).then((result) => {
      return { message: "Category Deleted" };
    });
    res.send(Category);
  }
};

module.exports = new categoryController();

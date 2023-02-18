const validator = require("Validator");
const _ = require("lodash");
const { getPaginate } = require("../lib/helpers");
const Module = require("../models/Module.model");
const Content = require("../models/Module_content.model");
const moduleController = class {
  async index(req, res) {
    await Module
      .findAndCountAll({ include: ['course'], offset: pageNumber * pageLimit, limit: pageLimit, where: req.query, order: [orderByColumn] })
      .then((result) => {
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
    let sequence_no = await Module.max('sequence_no', { where: { course_id: req.body.course_id } });
    if (sequence_no === null || sequence_no == 0) {
      sequence_no = 0;
    }
    sequence_no++;
    req.body.sequence_no = sequence_no;
    //console.log("module sequence", sequence_no);
    const data = req.body;
    const rules = {
      module_name: "required",
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
    const module = await Module.findByPk(req.params.id);
    if (module) {
      return res.send({ data: module });
    }
    return res.status(422).send(
      {
        message: "Module not Found",
      }
    );
  }
  async update(req, res) {
    const module = await Module.findByPk(req.params.id);
    if (module) {
      module.update(req.body);
      return res.send({ data: module });
    }
    return res.status(422).send(
      {
        message: "Module not update",
      }
    );
  }

  async updateAll(req, res) {
    //console.log(req.body);
    let updated = 0;
    let notUpdated = 0;
    req.body.modules.forEach(async (curModule) => {
      const module = await Module.findByPk(curModule.id);
      if (module) {
        module.update(curModule);
        updated++;
      } else  {
        notUpdated++
      }
      //console.log("curmodule = ", curModule);
    });
    res.send({updated:updated, notUpdated:notUpdated});
  }

  async destroy(req, res) {
    const module = await Module.destroy({ where: { id: req.params.id } }).then((result) => {
      return { message: "Module Deleted" };
    });
    res.send(module);
  }

  async storeModuleContent(req, res) {
    var allContentCount = 0;
    var addedContentCount = 0;
    req.body.content.forEach(async (element) => {
      allContentCount++;
      if (element?.id != "") {
        const contentDet = await Content.findByPk(element.id);
        if (contentDet) {
          contentDet.update(element);
        }
        else {
          delete element.id;
          await Content.create(element).then((result) => {
            addedContentCount++;
          })
        }
      }
      else {
        delete element.id;
        await Content.create(element).then((result) => {
          addedContentCount++;
        })
      }
    });
    //console.clear();
    //console.log("allcontents = " + allContentCount + " added content = " + addedContentCount);
    res.send("allcontents = " + allContentCount + " added content = " + addedContentCount);
  }
};

module.exports = new moduleController();

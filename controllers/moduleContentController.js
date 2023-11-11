const validator = require("Validator");
const _ = require("lodash");
const { getPaginate, deleteFileFromS3 } = require("../lib/helpers");
const Content = require("../models/Module_content.model");
const moduleContentController = class {
  async index(req, res) {
    await Content
      .findAndCountAll({ include: ['module','dos','donts'], offset: pageNumber * pageLimit, limit: pageLimit, where: req.query ?? [], order:[['sequence_no', 'ASC']]  })
      .then((result) => {
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
    const data = req.body;
    console.log(req.body,req.files);
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
    const content = await Content.findByPk(req.params.id,{
      include:['dos','donts']
    });
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

  async deleteCarouselImage(req,res){
    console.log(req.body);
    const response = deleteFileFromS3(req.body.file,async (error,data)=>{
      if(error){
        console.log(error);
          return res.send({error:"Can not delete file, Please try again later"});
      }

      const content = await Content.findByPk(req.body.id);
      content[req.body.column] = null;
      console.log(content);

      if(req.body.column.substring(0,req.body.column.length - 2) == 'carousel_image_one')
      {
        await content.update({carousel_image_one:null});

      }
      if(req.body.column.substring(0,req.body.column.length - 2) == 'carousel_image_two')
      {
        await content.update({carousel_image_two:null});

      }
      if(req.body.column.substring(0,req.body.column.length - 2) == 'carousel_image_three')
      {
        await content.update({carousel_image_three:null});

      }
      if(req.body.column.substring(0,req.body.column.length - 2) == 'carousel_image_four')
      {
        await content.update({carousel_image_four:null});

      }
      if(req.body.column.substring(0,req.body.column.length - 2) == 'carousel_image_five')
      {
        await content.update({carousel_image_five:null});

      }
      if(req.body.column.substring(0,req.body.column.length - 2) == 'content_video')
      {
        await content.update({content_video:null});

      }
      if(req.body.column.substring(0,req.body.column.length - 2) == 'file_url')
      {
        await content.update({file_url:null});

      }
      if(req.body.column.substring(0,req.body.column.length - 2) == 'banner_url')
      {
        await content.update({banner_url:null});

      }
      



      return res.send({message:data});

  })
    console.log(response);
  }
};

module.exports = new moduleContentController();

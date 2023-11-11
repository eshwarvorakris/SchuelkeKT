const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const Module = require("./Module.model");
const Course = require("./Course.model");
const ModuleContent = require("./Module_content.model");
class Dont extends Model { 

}

Dont.init({
  // Model attributes are defined here
  content_id: {
    type: DataTypes.INTEGER,
    references:{model:"module_contents",key:"id"}

  },
  title: {
    type: DataTypes.STRING,
  },


}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'dont', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  
  paranoid: true,
  underscored:true
});
sequelize.sync();


module.exports = Dont;
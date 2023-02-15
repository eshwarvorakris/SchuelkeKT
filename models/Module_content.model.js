const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const Module = require("./Module.model");
const Course = require("./Course.model");
class ModuleContent extends Model { }

ModuleContent.init({
  // Model attributes are defined here
  module_id: {
    type: DataTypes.INTEGER,
    references:{model:"modules",key:"id"}
  },
  course_id: {
    type: DataTypes.INTEGER,
    references:{model:"courses",key:"id"}
  },
  title: {
    type: DataTypes.STRING,
  },
  paragraph1: {
    type: DataTypes.TEXT,
  },
  paragraph2: {
    type: DataTypes.TEXT,
  },
  file_url: {
    type: DataTypes.STRING,
  },
  paragraph3: {
    type: DataTypes.TEXT,
  },
  file_ext: {
    type: DataTypes.STRING(50),
  },
  file_name: {
    type: DataTypes.STRING(100),
  },
  file_key: {
    type: DataTypes.STRING(50),
  },
  sequence_no: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.STRING(30),
    defaultValue: "active",
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'module_contents', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true,
  underscored:true
});
ModuleContent.belongsTo(Module,{foreignKey:"module_id",as:"module"});
ModuleContent.belongsTo(Course,{foreignKey:"course_id",as:"course"});
sequelize.sync();
module.exports = ModuleContent;
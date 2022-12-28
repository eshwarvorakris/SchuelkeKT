const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const Module = require("./Module.model");
class ModuleContent extends Model { }

ModuleContent.init({
  // Model attributes are defined here
  module_id: {
    type: DataTypes.INTEGER,
    references:{model:"modules",key:"id"}
  },
  content_type: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
  sequence_no: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.CHAR,
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
sequelize.sync();
module.exports = ModuleContent;
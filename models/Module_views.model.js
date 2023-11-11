const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const User = require("./User.model");
const Course = require("./Course.model");
const Module = require("./Module.model");
class ModuleView extends Model { }

ModuleView.init({
  // Model attributes are defined here
  trainee_id: {
    type: DataTypes.INTEGER,
    references:{model:"users",key:"id"}
  },
  course_id: {
    type: DataTypes.INTEGER,
    references:{model:"courses",key:"id"}
  },
  module_id: {
    type: DataTypes.INTEGER,
    references:{model:"modules",key:"id"}
  },
  viewed_seconds: {
    type: DataTypes.INTEGER,
    allowNull:true
  },
  status: {
    type: DataTypes.STRING(30),
    defaultValue: 'ongoing'
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'module_views', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true,
  underscored:true
});
ModuleView.belongsTo(User, { foreignKey: "trainee_id", as: "trainee" });
ModuleView.belongsTo(Course, { foreignKey: "course_id", as: "course" });
ModuleView.belongsTo(Module, { foreignKey: "module_id", as: "module" });
//sequelize.sync();
module.exports = ModuleView;
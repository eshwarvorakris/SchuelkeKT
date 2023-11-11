const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const User = require("./User.model");
const Course = require("./Course.model");
const Module = require("./Module.model");
const Chapter = require("./Module_content.model");
class ChapterView extends Model { }

ChapterView.init({
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
  chapter_id: {
    type: DataTypes.INTEGER,
    references:{model:"module_contents",key:"id"}
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
  modelName: 'chapter_views', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true,
  underscored:true
});
ChapterView.belongsTo(User, { foreignKey: "trainee_id", as: "trainee" });
ChapterView.belongsTo(Course, { foreignKey: "course_id", as: "course" });
ChapterView.belongsTo(Module, { foreignKey: "module_id", as: "module" });
ChapterView.belongsTo(Chapter, { foreignKey: "chapter_id", as: "module_content" });
//sequelize.sync();
module.exports = ChapterView;
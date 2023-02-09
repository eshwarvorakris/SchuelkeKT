const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const User = require("./User.model");
const Course = require("./Course.model");
class CourseView extends Model { }

CourseView.init({
  // Model attributes are defined here
  trainee_id: {
    type: DataTypes.INTEGER,
    references:{model:"users",key:"id"}
  },
  course_id: {
    type: DataTypes.INTEGER,
    references:{model:"courses",key:"id"}
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
  modelName: 'course_views', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true
});
CourseView.belongsTo(User, { foreignKey: "trainee_id", as: "trainee" });
CourseView.belongsTo(Course, { foreignKey: "course_id", as: "course" });
sequelize.sync();
module.exports = CourseView;
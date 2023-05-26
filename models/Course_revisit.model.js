const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const User = require("./User.model");
const Course = require("./Course.model");
class CourseRevisit extends Model { }

CourseRevisit.init({
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
  visit_date: {
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.literal('CURRENT_DATE'),
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'course_revisit', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true
});
CourseRevisit.belongsTo(User, { foreignKey: "trainee_id", as: "trainee" });
CourseRevisit.belongsTo(Course, { foreignKey: "course_id", as: "course" });
sequelize.sync();
module.exports = CourseRevisit;
const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const User = require("./User.model");
const Course = require("./Course.model");
class Assigned_courses extends Model { }

Assigned_courses.init({
  // Model attributes are defined here
  course_id: {
    type: DataTypes.INTEGER,
    references:{model:"courses",key:"id"}
  },
  trainee_id: {
    type: DataTypes.INTEGER,
    references:{model:"users",key:"id"}
  },
  assigned_by_id: {
    type: DataTypes.INTEGER,
    references:{model:"users",key:"id"}
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'assigned_courses', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true,
  underscored:true
});

Assigned_courses.belongsTo(User, { foreignKey: "trainee_id", as: "trainee" });
Assigned_courses.belongsTo(User, { foreignKey: "assigned_by_id", as: "asignee" });
Assigned_courses.belongsTo(Course, { foreignKey: "course_id", as: "course" });
//sequelize.sync();
module.exports = Assigned_courses;
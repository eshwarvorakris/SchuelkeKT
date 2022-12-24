const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
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
  start_date: {
    type: DataTypes.DATE
  },
  viewed_minute: {
    type: DataTypes.INTEGER,
    allowNull:true
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
sequelize.sync();
module.exports = CourseView;
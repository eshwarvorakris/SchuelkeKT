const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const User = require("./User.model");
const Course = require("./Course.model");
const QuestionAttemps = require("./Question_attempt.model");
class AssignmentAttempt extends Model { }

AssignmentAttempt.init({
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
  end_date: {
    type: DataTypes.DATE
  },
  total_questions: {
    type: DataTypes.INTEGER
  },
  attempted_questions: {
    type: DataTypes.INTEGER,
    allowNull:true,
  },
  correct_percentage: {
    type: DataTypes.FLOAT,
    allowNull:true,
  },
  status: {
    type: DataTypes.STRING(30),
    defaultValue: "drafted",
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'assignment_attempts', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true
});
AssignmentAttempt.belongsTo(Course,{foreignKey:"course_id",as:"course"});
AssignmentAttempt.belongsTo(User, { foreignKey: "trainee_id", as: "trainere" });
AssignmentAttempt.hasMany(QuestionAttemps,{foreignKey:"assignment_attempt_id",as:"question_attempted"});
sequelize.sync();
module.exports = AssignmentAttempt;
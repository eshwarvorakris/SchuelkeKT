const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const AssignmentAttempt = require("./Assignment_attempt.model");
const Question = require("./Question.model");
const QuestionOption = require("./Question_option.model");
class QuestionAttempt extends Model { }

QuestionAttempt.init({
  // Model attributes are defined here
  assignment_id: {
    type: DataTypes.INTEGER,
    references:{model:"assignment_attempts",key:"id"}
  },
  question_id: {
    type: DataTypes.INTEGER,
    references:{model:"questions",key:"id"}
  },
  option_id: {
    type: DataTypes.INTEGER,
    references:{model:"question_options",key:"id"}
  },
  is_correct_answer: {
    type: DataTypes.BOOLEAN,
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'question_attempts', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true,
  underscored:true
});

QuestionAttempt.belongsTo(Question);
QuestionAttempt.belongsTo(AssignmentAttempt);
QuestionAttempt.belongsTo(QuestionOption);
sequelize.sync();
module.exports = QuestionAttempt;
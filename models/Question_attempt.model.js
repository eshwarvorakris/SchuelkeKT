const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const AssignmentAttempt = require("./Assignment_attempt.model");
const Question = require("./Question.model");
class QuestionAttempt extends Model { }

QuestionAttempt.init({
  // Model attributes are defined here
  assignment_attempt_id: {
    type: DataTypes.INTEGER,
    references:{model:"assignment_attempts",key:"id"}
  },
  question: {
    type: DataTypes.INTEGER,
    references:{model:"questions",key:"id"}
  },
  isA_selected: {
    type: DataTypes.STRING(30)
  },
  isB_selected: {
    type: DataTypes.STRING(30)
  },
  isC_selected: {
    type: DataTypes.STRING(30)
  },
  isD_selected: {
    type: DataTypes.STRING(30)
  },
  answer: {
    type: DataTypes.STRING(100)
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

QuestionAttempt.belongsTo(Question,{foreignKey:"question",as:"questions"});
//QuestionAttempt.belongsTo(AssignmentAttempt,{foreignKey:"assignment_attempt_id",as:"assignment_attempt"});
sequelize.sync();
module.exports = QuestionAttempt;
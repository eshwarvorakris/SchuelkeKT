const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const Course = require("./Course.model");
const QuestionOption = require("./Question_option.model");
class Question extends Model { }

Question.init({
  // Model attributes are defined here
  course_id: {
    type: DataTypes.INTEGER,
    references:{model:"courses",key:"id"}
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  question_type: {
    type: DataTypes.STRING(30)
  },
  sequence_no: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.STRING(30),
    defaultValue: "active",
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'questions', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true,
  underscored:true
});
Question.belongsTo(Course,{foreignKey:"course_id",as:"course"});
Question.hasMany(QuestionOption,{foreignKey:"question_id",as:"options"});
sequelize.sync();
module.exports = Question;
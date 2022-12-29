const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
//const Question = require("./Question.model");
class QuestionOption extends Model { }


QuestionOption.init({
  // Model attributes are defined here
  question_id: {
    type: DataTypes.INTEGER,
    references:{model:"questions",key:"id"}
  },
  option: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_answer: {
    type: DataTypes.BOOLEAN
  },
  status: {
    type: DataTypes.STRING(30),
    defaultValue: "active",
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'question_options', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true,
  underscored:true
});

//QuestionOption.belongsTo(Question);

sequelize.sync();
module.exports = QuestionOption;
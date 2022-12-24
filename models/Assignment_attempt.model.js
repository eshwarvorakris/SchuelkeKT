const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
class AssignmentAttempt extends Model { }

AssignmentAttempt.init({
  // Model attributes are defined here
  trainee_id: {
    type: DataTypes.INTEGER,
    references:{model:"users",key:"id"}
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
    type: DataTypes.CHAR,
    defaultValue: "active",
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
sequelize.sync();
module.exports = AssignmentAttempt;
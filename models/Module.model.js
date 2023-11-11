const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const Course = require("./Course.model");
class Module extends Model { }

Module.init({
  // Model attributes are defined here
  module_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(400)
  },
  course_id: {
    type: DataTypes.INTEGER,
    references:{model:"courses",key:"id"}
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
  modelName: 'modules', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true,
  underscored:true
});


Module.belongsTo(Course,{foreignKey:"course_id",as:"course"});
//sequelize.sync();
module.exports = Module;
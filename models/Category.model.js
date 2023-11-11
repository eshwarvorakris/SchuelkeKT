const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
//const Course = require("./Course.model");
class Category extends Model { }

Category.init({
  // Model attributes are defined here
  category_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING(30),
    defaultValue: 'active'
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'categories', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true,
  underscored:true
});

//Category.hasMany(Course,{foreignKey:"category_id",as:"courses"});
//sequelize.sync();
module.exports = Category;
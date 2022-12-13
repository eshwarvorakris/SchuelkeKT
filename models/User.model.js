const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize =require("../lib/dbConnection");
class User extends Model {}

User.init({
  // Model attributes are defined here
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    // allowNull defaults to true
  },
  mobile: {
    type: DataTypes.CHAR
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull:true
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'users', // We need to choose the model name
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  updatedAt:"updated_at",
  createdAt:"created_at",
  //deletedAt:"deleted_at",
});
sequelize.sync();
module.exports=User;
const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
class User extends Model { }

User.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  mobile: {
    type: DataTypes.CHAR,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.CHAR,
    defaultValue: "trainee",
  },
  education: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.CHAR,
    allowNull: true,
  },
  status: {
    type: DataTypes.CHAR,
    defaultValue: "active",
  },
  password: {
    type: DataTypes.STRING
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'users', // We need to choose the model name
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true
});
sequelize.sync();
module.exports = User;
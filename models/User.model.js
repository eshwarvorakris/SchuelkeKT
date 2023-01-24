const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
class User extends Model { }

User.init({
  // Model attributes are defined here
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_img: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:null
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  contact_no: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  edu_background: {
    type: Sequelize.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING(20),
    defaultValue: "trainee",
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  joining_year: {
    type: DataTypes.STRING(4),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(30),
    defaultValue: "active",
  },
  password: {
    type: DataTypes.STRING
  },
  user_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
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
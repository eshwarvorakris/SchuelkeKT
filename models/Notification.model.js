const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
class Notification extends Model { }

Notification.init({
  // Model attributes are defined here
  user_id: {
    type: DataTypes.INTEGER,
    references:{model:"users",key:"id"}
  },
  title: {
    type: DataTypes.STRING
  },
  message: {
    type: DataTypes.STRING
  },
  data:{
    type:DataTypes.JSONB,
    allowNull:true
  },
  read_at: {
    type: DataTypes.DATE,
    allowNull:true
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'notifications', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true
});
sequelize.sync();
module.exports = Notification;
const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../lib/dbConnection");
const Category = require("./Category.model");
const User = require("./User.model");
class Course extends Model { }

Course.init({
  // Model attributes are defined here
  course_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  course_description: {
    type: DataTypes.TEXT
  },
  course_thumbnail: {
    type: DataTypes.TEXT
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: { model: "categories", key: "id" }
  },
  total_modules: {
    type: DataTypes.INTEGER
  },
  course_launch_date: {
    type: DataTypes.DATEONLY
  },
  week_duration: {
    type: DataTypes.INTEGER
  },
  country: {
    type: DataTypes.STRING
  },
  trainer_id: {
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" }
  },
  status: {
    type: DataTypes.STRING(30),
    defaultValue: "active",
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'courses', // We need to choose the model name
  updatedAt: "updated_at",
  createdAt: "created_at",
  deletedAt: "deleted_at",
  paranoid: true,
  //underscored: true,
  //trainer: Course.belongsTo(User, { foreignKey: "trainer_id", as: "trainer" }),
  //category: Course.belongsTo(Category, { foreignKey: "category_id", as: "category" })
}
);
Course.belongsTo(User, { foreignKey: "trainer_id", as: "trainer" });
Course.belongsTo(Category, { foreignKey: "category_id", as: "category" });
sequelize.sync();

module.exports = Course;
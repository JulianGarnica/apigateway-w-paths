'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppActions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AppActions.belongsTo(models.apps, {
        as: "apps",
        foreignKey: "appid",
        allowNull: false,
      });
    }
  }
  AppActions.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    path: DataTypes.STRING,
    nameAction: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AppActions',
  });
  return AppActions;
};
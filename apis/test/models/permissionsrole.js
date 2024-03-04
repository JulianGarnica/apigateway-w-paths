"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PermissionsUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PermissionsUser.belongsTo(models.User, {
        as: "user",
        foreignKey: "userid",
      });
      PermissionsUser.belongsTo(models.AppActions, {
        as: "appactions",
        foreignKey: "actionid",
      });
    }
  }
  PermissionsUser.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      // appID: DataTypes.INTEGER,
      // actionID: DataTypes.INTEGER,
      // userID: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "PermissionsUser",
    }
  );
  return PermissionsUser;
};

'use strict';
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InvoicesRecordsRelation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InvoicesRecordsRelation.belongsTo(models.gtFacturas_InvoicesRecords, {
        as: "invoicesrecords",
        foreignKey: "invoicesrecordsid",
      });
      InvoicesRecordsRelation.belongsTo(models.gtFacturas_Invoices, {
        as: "invoices",
        foreignKey: "invoicesid",
      });
    }
  }
  InvoicesRecordsRelation.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    payment: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'gtFacturas_InvoicesRecordsRelation',
  });
  return InvoicesRecordsRelation;
};
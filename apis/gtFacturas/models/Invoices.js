'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  Invoices.init({
    NUMERO: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    FECHA: DataTypes.DATE,
    NIT: DataTypes.STRING,
    NOMBRE: DataTypes.STRING,
    PEDIDO: DataTypes.STRING,
    ORDEN: DataTypes.STRING,
    CONDICION: DataTypes.STRING,
    REMISION: DataTypes.STRING,
    OBSERVACIO: DataTypes.STRING,
    OBSERVACI2: DataTypes.STRING,
    ANU: DataTypes.STRING,
    SUBTOTAL: DataTypes.BIGINT,
    IVA: DataTypes.BIGINT,
    EMPRESA: DataTypes.STRING,
    NOREMI: DataTypes.STRING,
    NOPEDIDO: DataTypes.STRING,
    IVALIQUI: DataTypes.INTEGER,
    TOTAL: DataTypes.INTEGER,
    REMI01: DataTypes.STRING,
    REMI02: DataTypes.STRING,
    REMI03: DataTypes.STRING,
    REMI04: DataTypes.STRING,
    REMI05: DataTypes.STRING,
    REMI06: DataTypes.STRING,
    REMI07: DataTypes.STRING,
    REMIGEN: DataTypes.STRING,
    VALDOLAR: DataTypes.BIGINT,
    TASADIA: DataTypes.BIGINT,
    FECHADOL: DataTypes.DATE,
    PESOBRUTO: DataTypes.BIGINT,
    RETFTEP: DataTypes.BIGINT,
    RETICAP: DataTypes.BIGINT,
    RETIVAP: DataTypes.BIGINT,
    RETFTEV: DataTypes.BIGINT,
    RETICAV: DataTypes.BIGINT,
    RETIVAV: DataTypes.BIGINT,
    PRECINTO: DataTypes.STRING,
    REMI08: DataTypes.BIGINT,
    REMI09: DataTypes.BIGINT,
    REMI10: DataTypes.BIGINT,
    REMI11: DataTypes.BIGINT,
    REMI12: DataTypes.BIGINT,
    REMI13: DataTypes.BIGINT,
    REMI14: DataTypes.BIGINT,
    REMI15: DataTypes.BIGINT,
    REMI16: DataTypes.BIGINT,
    REMI17: DataTypes.BIGINT,
    REMI18: DataTypes.BIGINT,
    REMI19: DataTypes.BIGINT,
    REMI20: DataTypes.BIGINT,
    FECVIG: DataTypes.DATE,
    NC: DataTypes.BIGINT,
    RETCREP: DataTypes.BIGINT,
    RETCREV: DataTypes.BIGINT,
    NC_CODIGO: DataTypes.STRING,
    NC_CONCEP: DataTypes.STRING,
    NC_SECCION: DataTypes.STRING,
    NC_DESCRIP: DataTypes.STRING,
    ND_CODIGO: DataTypes.STRING,
    ND_CONCEP: DataTypes.STRING,
    ND_SECCION: DataTypes.STRING,
    ND_DESCRIP: DataTypes.STRING,
    NC_FACT: DataTypes.STRING,
    NC_FACTFEC: DataTypes.STRING,
    ND_FACT: DataTypes.STRING,
    ND_FACTFEC: DataTypes.STRING,
    OC1: DataTypes.STRING,
    OC2: DataTypes.STRING,
    OC3: DataTypes.STRING,
    OC4: DataTypes.STRING,
    OC5: DataTypes.STRING,
    OC6: DataTypes.STRING,
    OC7: DataTypes.STRING,
    OC8: DataTypes.STRING,
    OC9: DataTypes.STRING,
    OC10: DataTypes.STRING,
    PAGO_FEC1: DataTypes.STRING,
    PAGO_FEC2: DataTypes.STRING,
    PAGO_FEC3: DataTypes.STRING,
    PAGO_FEC4: DataTypes.STRING,
    PAGO_VAL1: DataTypes.BIGINT,
    PAGO_VAL2: DataTypes.BIGINT,
    PAGO_VAL3: DataTypes.BIGINT,
    PAGO_VAL4: DataTypes.BIGINT,
    PAGO_SALDO: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'gtFacturas_Invoices',
  });
  return Invoices;
};
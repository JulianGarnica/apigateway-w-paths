//Const of module required
const Sequelize = require('sequelize');
const config = require('../../../config.json')['development'];

let sequelized;

sequelized = new Sequelize(config.database, config.username, config.password, {
  "host": config.host,
  "dialect": "mysql"
});


module.exports = sequelized

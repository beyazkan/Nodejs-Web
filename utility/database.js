const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-app', 'root', '654333', {
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;
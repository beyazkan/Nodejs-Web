// Database
const sequelize = require('../utility/database.js');
const Sequelize = require('sequelize');

const Category = sequelize.define('category', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    price:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Category;
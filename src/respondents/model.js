const Sequelize = require('sequelize');
const db = require ('../db/db.connection')

const Respondent = db.define('respondents', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    gender: {
        type: db.Sequelize.ENUM('male', 'female'),
        allowNull: false
    },
    address: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
}, {
    
    timestamps: true
});

module.exports = Respondent
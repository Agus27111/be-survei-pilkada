const Sequelize = require('sequelize');
const db = require ('../db/db.connection')

const User = db.define('users', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: db.Sequelize.ENUM('admin', 'surveyor'),
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = User
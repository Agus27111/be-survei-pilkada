const Sequelize = require('sequelize');
const db = require ('../db/db.connection')

const Candidate = db.define('candidates', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    party: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    position: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
}, {
    
    timestamps: true
});

module.exports = Candidate
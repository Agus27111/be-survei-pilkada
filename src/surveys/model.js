const Sequelize = require('sequelize');
const db = require('../db/db.connection');

const Survey = db.define('surveys', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    respondent_id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'respondents',
            key: 'id'
        }
    },
    candidate_id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'candidates',
            key: 'id'
        }
    },
    response: {
        type: db.Sequelize.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Survey;

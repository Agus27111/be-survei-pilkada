// associations.js
const Sequelize = require('sequelize');
const db = require('../db/db.connection');

const Survey = require('../surveys/model');
const Candidate = require('../candidates/model');
const Respondent = require('../respondents/model');

// Define associations
Respondent.hasOne(Survey, { foreignKey: 'respondent_id', as: 'survey' });
Survey.belongsTo(Respondent, { foreignKey: 'respondent_id', as: 'respondent' });

Candidate.hasMany(Survey, { foreignKey: 'candidate_id', as: 'surveys' });
Survey.belongsTo(Candidate, { foreignKey: 'candidate_id', as: 'candidate' });

// Log associations to verify
console.log('Survey associations:', Survey.associations);
console.log('Candidate associations:', Candidate.associations);
console.log('Respondent associations:', Respondent.associations);

module.exports = {
    Survey,
    Candidate,
    Respondent
};

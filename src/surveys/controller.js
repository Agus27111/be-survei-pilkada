const Model = require('./model');
const CandidateModel = require('../candidates/model');
const RespondentModel = require('../respondents/model');
const sequelize = require('../db/db.connection');
const { Op } = require('sequelize');
const JoiValidation = require('../utils/validation');

const createResponses = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        if (req.user.role !== 'surveyor') {
            throw new Error('You must be a surveyor to perform this action');
        }

        const { candidate_id, respondent_id, response } = req.body;

        const { error } = JoiValidation.surveysSchema.validate({ candidate_id, respondent_id, response });

        if (error) {
            error.isJoi = true;
            throw error;
        }

        // Check if candidate exists
        const candidate = await CandidateModel.findOne({ where: { id: candidate_id } });
        if (!candidate) {
            throw new Error('Candidate not found');
        }

        // Check if respondent exists
        const respondent = await RespondentModel.findOne({ where: { id: respondent_id } });
        if (!respondent) {
            throw new Error('Respondent not found');
        }

        // Check if respondent already has a survey
        const existingSurvey = await Model.findOne({ where: { respondent_id } });
        if (existingSurvey) {
            throw new Error('Respondent already has a survey');
        }

        // Create the survey
        const survey = await Model.create({ candidate_id, respondent_id, response }, { transaction: t });
        await t.commit();

        return res.status(200).json({ success: true, message: 'Survey created successfully', data: survey });

    } catch (error) {
        await t.rollback();
        next(new Error("controllers/surveysController.js:createResponses - " + error.message));
    }
}

const results = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { candidate_id = '' } = req.params;
        let conditions = {};

        if (candidate_id) {
            conditions = { candidate_id };
        }

        const surveys = await Model.findAll({
            where: conditions,
            attributes: [
                'candidate_id',
                [sequelize.fn('COUNT', sequelize.col('candidate_id')), 'vote_count']
            ],
            include: [
                { model: CandidateModel, as: 'candidate', attributes: ['id', 'name'] }
            ],
            group: ['candidate_id', 'candidate.id']
        });
        console.log("🚀 ~ results ~ surveys:", surveys)

        await t.commit();
   
        return res.status(200).json({ success: true, message: 'Survey results', data: surveys });

    } catch (error) {
        await t.rollback();
        next(new Error("controllers/surveysController.js:results - " + error.message));
    }
}

module.exports = { createResponses, results }

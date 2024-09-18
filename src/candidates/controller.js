const Model = require('./model');
const sequelize = require('../db/db.connection');
const { Op } = require('sequelize');
const JoiValidation = require('../utils/validation');

const createCandidate = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {

        if(!req.user.role === 'admin') {
            const error = new Error('Unauthorized');
            error.statusCode = 401;
            throw error;
        }

        const { name, party, position } = req.body;

        const {error} = JoiValidation.candidateSchema.validate({ name, party, position });

        if(error) {
            error.isJoi = true;
            throw error;
        }

        const isExist = await Model.findOne({ where: { name, party } });

        if(isExist) {
            const error = new Error('Candidate already exist');
            error.statusCode = 400;
            throw error;
        }

        const candidate = await Model.create({ name, party, position }, { transaction: t });

        await t.commit();
        return res.status(201).json({  success: true,  message: 'Candidate created successfully', data: candidate });
        
    } catch (error) {
        t.rollback();
        next(new Error("controllers/candidatesController.js:createCandidate - " + error.message));
        
    }

}

const listCandidate = async (req, res, next) => {
    try {
        //keywords is a party
        const {party = ''} = req.query;

        let conditions = {};

        if(party) {
            conditions = {
                party: {
                    [Op.like]: `%${party}%`
                }
            }
        }

        const candidates = await Model.findAll({ where: conditions });

        return res.status(200).json({  
            success: true,  
            message: 'Candidate list', 
            
            data: candidates 
        });

    } catch (error) {
        next(new Error("controllers/candidatesController.js:list - " + error.message));
    }
}

const updateCandidate = async (req, res, next ) => {

    const t = await sequelize.transaction();

    try {

        if(!req.user.role === 'admin') {
            const error = new Error('Unauthorized');    
            error.statusCode = 401;
            throw error;
        }

        const { name, party, position } = req.body;
        const { id } = req.params;

        const {error} = JoiValidation.candidateSchema.validate({ name, party, position });

        if(error) {
            error.isJoi = true;
            throw error;
        }

        const candidate = await Model.findOne({ where: { id } });

        if(!candidate) {
            const error = new Error('Candidate not found');
            error.statusCode = 404;
            throw error;
        }

        await Model.update({ name, party, position }, { where: { id } }, { transaction: t });
        await t.commit();
        return res.status(200).json({  success: true,  message: 'Candidate updated successfully', data: candidate });
        
    } catch (error) {
        t.rollback();
        next(new Error("controllers/candidatesController.js:updateCandidate - " + error.message));
    }
}

const deleteCandidate = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        if(!req.user.role === 'admin') {
            const error = new Error('Unauthorized');
            error.statusCode = 401;
            throw error;
        }

        const { id } = req.params;

        const candidate = await Model.findOne({ where: { id } });

        if(!candidate) {
            const error = new Error('Candidate not found');
            error.statusCode = 404;
            throw error;
        }

        await Model.destroy({ where: { id } }, { transaction: t });
        await t.commit();
        return res.status(200).json({  success: true,  message: 'Candidate deleted successfully', data: null });
        
    } catch (error) {
        t.rollback();
        next(new Error("controllers/candidatesController.js:deleteCandidate - " + error.message));
    }
}




module.exports = {
    createCandidate,
    listCandidate,
    updateCandidate,
    deleteCandidate
}
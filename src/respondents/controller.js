const Model = require('./model');
const sequelize = require('../db/db.connection');
const { Op } = require('sequelize');
const JoiValidation = require('../utils/validation');


const createRespondents = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { name, age, gender, address } = req.body;

        const {error} = JoiValidation.respondentSchema.validate({  name, age, gender, address });

        if(error) {
            error.isJoi = true;
            throw error;
        }

        const isExist = await Model.findOne({ where: { name, address } });

        if(isExist) {
            const error = new Error('respondent already exist');
            error.statusCode = 400;
            throw error;
        }

        const respondent = await Model.create({  name, age, gender, address }, { transaction: t });

        await t.commit();
        return res.status(201).json({  success: true,  message: 'respondent created successfully', data: respondent });
        
    } catch (error) {
        t.rollback();
        next(new Error("controllers/respondentsController.js:createrespondent - " + error.message));
        
    }

}

const listRespondents = async (req, res, next) => {
    try {
       
        const {keyword = ''} = req.query;

        let conditions = {};

        if(keyword) {
            conditions = {
                name: {
                    [Op.like]: `%${keyword}%`
                }
            }
        }

        const respondents = await Model.findAll({ where: conditions });

        return res.status(200).json({  
            success: true,  
            message: 'Respondent list', 
            
            data: respondents 
        });

    } catch (error) {
        next(new Error("controllers/respondentsController.js:list - " + error.message));
    }
}

const updateRespondents = async (req, res, next ) => {

    const t = await sequelize.transaction();

    try {

        const { name, age, gender, address  } = req.body;
        const { id } = req.params;

        const {error} = JoiValidation.respondentSchema.validate({ name, age, gender, address  });

        if(error) {
            error.isJoi = true;
            throw error;
        }

        const respondent = await Model.findOne({ where: { id } });

        if(!respondent) {
            const error = new Error('respondent not found');
            error.statusCode = 404;
            throw error;
        }

       const newRespondent=  await Model.update({ name, age, gender, address}, { where: { id } }, { transaction: t });
        await t.commit();
        return res.status(200).json({  success: true,  message: 'respondent updated successfully', data: newRespondent });
        
    } catch (error) {
        t.rollback();
        next(new Error("controllers/respondentsController.js:updaterespondent - " + error.message));
    }
}

const deleteRespondents = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {

        const { id } = req.params;

        const respondent = await Model.findOne({ where: { id } });

        if(!respondent) {
            const error = new Error('respondent not found');
            error.statusCode = 404;
            throw error;
        }

        await Model.destroy({ where: { id } }, { transaction: t });
        await t.commit();
        return res.status(200).json({  success: true,  message: 'respondent deleted successfully', data: respondent });
        
    } catch (error) {
        t.rollback();
        next(new Error("controllers/respondentsController.js:deleterespondent - " + error.message));
    }
}




module.exports = {
    createRespondents,
    listRespondents,
    updateRespondents,
    deleteRespondents
}
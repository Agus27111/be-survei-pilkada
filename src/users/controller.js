const sequelize = require('../db/db.connection');
const Model = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JoiValidation = require('../utils/validation');
require('dotenv').config();


const createUser = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { name, email, password, role } = req.body;
        

        const {error} = JoiValidation.signupSchema.validate({ name, email, password, role });

        if(error) {
            error.isJoi = true;
            throw error;
        }

        const isExist = await Model.findOne({ where: { email } });

        if(isExist) {
            const error = new Error('Email already exist');
            error.statusCode = 400;
            throw error;
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const user  = await Model.create({ name, email, password: hashPassword, role }, { transaction: t });

        await t.commit();

        return res.status(201).json({  success: true,  message: 'User created successfully', data: user });

    } catch (error) {
        t.rollback();
        next(new Error("controllers/userController.js:createUser - " + error.message));
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const {error} = JoiValidation.signinSchema.validate({ email, password });
        if(error) {
            error.isJoi = true;
            throw error;
        }

        const user = await Model.findOne({ where: { email } });

        if(!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '5h' });
        
        return res.status(200).json({  success: true, message: 'Login successful', data: { token }, user });

    } catch (error) {
        next(new Error("controllers/userController.js:loginUser - " + error.message));
    }
}

module.exports ={
    createUser,
    loginUser
}
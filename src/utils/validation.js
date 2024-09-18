const Joi = require('joi');

const signupSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name is required',
        'string.base': 'Name must be a string',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
        'string.base': 'Email must be a string',
    }),
    password: Joi.string().required().min(6).messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
        'string.base': 'Password must be a string',
    }),
    role: Joi.string().valid('admin', 'surveyor').required().messages({
        'any.only': 'Role must be either admin or surveyor',
        'any.required': 'Role is required',
    })
});

const signinSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().min(6).messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
        'string.base': 'Password must be a string',
    })
});

const candidateSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name is required',
        'string.base': 'Name must be a string',
    }),
    party: Joi.string().required().messages({
        'any.required': 'Party is required',
        'string.base': 'Party must be a string',
    }),
    position: Joi.string().required().messages({
        'any.required': 'Position is required',
        'string.base': 'Position must be a string',
    })
});

module.exports = {
    signinSchema,
    signupSchema,
    candidateSchema
}

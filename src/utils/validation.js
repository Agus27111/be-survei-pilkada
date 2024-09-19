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

const respondentSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name is required',
        'string.base': 'Name must be a string',
    }),
    age: Joi.number().integer().min(17).required().messages({
        'any.required': 'Age is required',
        'number.base': 'Age must be a number',
        'number.integer': 'Age must be an integer',
        'number.min': 'Age must be at least 17',
    }),
    gender: Joi.string().valid('male', 'female').required().messages({
        'any.only': 'Gender must be either male or female',
        'any.required': 'Gender is required',
    }),
    address: Joi.string().required().messages({
        'any.required': 'Address is required',
        'string.base': 'Address must be a string',
    })

});

const surveysSchema = Joi.object({
    candidate_id: Joi.number().integer().required().messages({
        'any.required': 'Candidate id is required',
        'number.base': 'Candidate id must be a number',
        'number.integer': 'Candidate id must be an integer',
    }),
    respondent_id: Joi.number().integer().required().messages({
        'any.required': 'Respondent id is required',
        'number.base': 'Respondent id must be a number',
        'number.integer': 'Respondent id must be an integer',
    }),
    response: Joi.string().messages({
        'string.base': 'Response must be a string',
        
    })  

});



module.exports = {
    signinSchema,
    signupSchema,
    candidateSchema,
    respondentSchema,
    surveysSchema
}

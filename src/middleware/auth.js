const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    try {
        const istokenTrue = req.headers.authorization;

        if(!istokenTrue) return res.status(401).json({ success: false, message: 'Unauthorized' });

       const token = istokenTrue.split(' ')[1];

       const decoded = jwt.verify(token, process.env.JWT_SECRET);

       req.user = decoded;
       next();
        
    } catch (error) {
        next(error);
    }
}


module.exports = auth
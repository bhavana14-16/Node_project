const CustomErrorHandler = require('../services/CustomErrorHandler');
const JwtService = require('../services/JwtService');

const auth = (req, res, next) => {
    let authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return next(CustomErrorHandler.error(401, 'Token missing.'));
    }

    try {
        const manager = JwtService.verify(authHeader);
        next();
    } catch (error) {
        return next(CustomErrorHandler.error(404, error.message));
    }

    next();
}

module.exports = auth;
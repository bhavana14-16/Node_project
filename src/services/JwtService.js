const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../configg/index');
const CustomErrorHandler = require('./CustomErrorHandler');

class JwtService {

    static sign(payload, expiry = '90d', secretKey = JWT_SECRET) {
        return jwt.sign(payload, secretKey, { expiresIn: expiry });
    }

    static verify(token) {
        return jwt.verify(token, JWT_SECRET);
    }
}

module.exports = JwtService;
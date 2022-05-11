const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    console.log("^^^^^^^^^^^^^^^^^^^");
    let token = req.headers["x_auth_token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    const decoded = await jwt.verify(token, JWT_SECRET);
    if (!decoded) {
        return res.status(410).send({ message: 'Error in Decrypting Token' })
    }
    req.managerId = decoded.user.Id;
    next();
}
const verifyemployeeToken = async (req, res, next) => {
    console.log("^^^^^^^^^^^^^^^^^^^");
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    const decoded = await jwt.verify(token, JWT_SECRET);
    if (!decoded) {
        return res.status(410).send({ message: 'Error in Decrypting Token' })
    }
    req.employeeId = decoded.user.Id;
    next();
}
module.exports = { verifyToken,verifyemployeeToken }
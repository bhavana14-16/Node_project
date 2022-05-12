const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const managerModel = require('../../../database/models/managerModel');
const CustomErrorHandler = require('../../services/CustomErrorHandler');
const { validateManagerByRegister, validateManagerByLogin } = require('../../validation/validateProject')
const authControllers = {

    async login(req, res, next) {
        try {
            const vaidate_manager = validateManagerByLogin(req.body)
            if (vaidate_manager.error) {
                return res.status(402).json({
                    message: 'Validation error',
                    error: vaidate_manager.data
                })
            }
            const { email, password } = req.body;
            const manager = await managerModel.findOne({ email });
            if (!manager) {
                return next(CustomErrorHandler.error(500, 'User not found.'));
            }
            const match = await bcrypt.compare(password, manager.password);
            if (match) {
                const { _id, name, email } = manager;
                const payload = {
                    user: {
                        Id: _id
                    },
                }
                var token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '90d' });
                const role = manager.role;
                console.log(token)
                manager.token = token;
                res.status(200).json({
                    status: "Success",
                    message: 'Manager Login Successfully.',
                    data: { _id, name, email, token, role }
                });
            } else {
                res.status(500).json({
                    status: "Failure",
                    message: 'Invalid credentials please try again.',
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                status: "Failure",
                message: error,
            });
        }
    },


    async register(req, res, next) {
        try {
            const val_manager = validateManagerByRegister(req.body);
            if (val_manager.error) {
                return res.status(402).json({
                    message: 'Validation error',
                    error: val_manager.data
                })
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const { name, email, role, businessUnit } = req.body;
            const manager = await managerModel.findOne({ email }).select('-createdAt -updatedAt -__v');

            if (manager) {
                return next(CustomErrorHandler.error(500, 'email already exist.'));
            }
            const data = new managerModel({ name, email, password: hashedPassword, role, businessUnit });
            const result = await data.save()
            if (result.error) {
                res.status(502).json({
                    status: 200,
                    message: 'Manager Register Successfully.',
                })
            }
            res.status(200).json({
                status: 200,
                message: 'Manager Register Successfully.',
            });
        } catch (error) {
            return res.status(500).json({
                status: "Failure",
                message: error,
            });
        }
    }
}

module.exports = authControllers;
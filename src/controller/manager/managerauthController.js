const Joi = require('joi');
const bcrypt = require('bcryptjs');
const managerModel = require('../../../database/models/managerModel')
const mongoose = require('mongoose');
const CustomErrorHandler = require('../../services/CustomErrorHandler');
const JwtService = require('../../services/JwtService');

const authControllers = {

    async login(req, res, next) {
        const { email, password } = req.body;
        const manager = await managerModel.findOne({ email });
        if (!manager) {
            return next(CustomErrorHandler.error(500, 'User not found.'));
        }
        const match = await bcrypt.compare(password, manager.password);
        if (match) {
            token = await JwtService.sign(manager.toJSON());
            const { _id, name, email } = manager;
            const Id = mongoose.Types.ObjectId(_id);
            req.session.user = {Id,email};
          //  req.session.save();

            res.status(200).json({
                status: "Success",
                message: 'Manager Login Successfully.',
                data: { _id, name, email, token }
            });
        } else {
            res.status(500).json({
                status: "Failure",
                message: 'Invalid credentials please try again.',
            });
        }
    },

    async register(req, res, next) {

        try {
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

            // console.log("gqsjgjx",result);;
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = authControllers;
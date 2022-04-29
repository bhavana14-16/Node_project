const dotenv = require('dotenv');
dotenv.config();

// Object Destructuring
module.exports = {
    APP_PORT,
    JWT_SECRET
} = process.env;
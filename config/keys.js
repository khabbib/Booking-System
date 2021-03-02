const { password } = require("./emailkey");
require('dotenv').config;
// const user = process.env.DATABASE_USER;


dbPassword = process.env.DB;

module.exports = {
    mongoURI: dbPassword
};



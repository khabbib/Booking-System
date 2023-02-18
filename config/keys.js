require('dotenv').config;
dbPassword = process.env.DB;
module.exports = {
    mongoURI: dbPassword
};



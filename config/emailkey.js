const Mail = require("nodemailer/lib/mailer");

const MAIL_KEY = process.env.E_PASS;
const MAIL = process.env.EMAIL;



module.exports ={
    password: MAIL_KEY,
    epost: MAIL

} 
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST || "smtp.gmail.com",
	port: Number(process.env.MAIL_PORT) || 465,
	secure: process.env.MAIL_SECURE !== "false",
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD
	}
})

module.exports = transporter

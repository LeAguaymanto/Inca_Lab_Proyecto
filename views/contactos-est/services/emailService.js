const transporter = require("../config/mail")

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\"/g, "&quot;")
		.replace(/'/g, "&#039;")
}

async function sendContactEmail({ nombre, correo, telefono, servicio, mensaje }) {
	const recipient = process.env.MAIL_TO || process.env.MAIL_USER

	return transporter.sendMail({
		from: `Formulario web <${process.env.MAIL_USER}>`,
		to: recipient,
		replyTo: correo,
		subject: `Nuevo contacto: ${servicio}`,
		text: [
			`Nombre: ${nombre}`,
			`Correo: ${correo}`,
			`Telefono: ${telefono}`,
			`Asunto: ${servicio}`,
			"",
			"Mensaje:",
			mensaje
		].join("\n"),
		html: `
			<h2>Nuevo mensaje desde el formulario de contacto</h2>
			<p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
			<p><strong>Correo:</strong> ${escapeHtml(correo)}</p>
			<p><strong>Telefono:</strong> ${escapeHtml(telefono)}</p>
			<p><strong>Asunto:</strong> ${escapeHtml(servicio)}</p>
			<p><strong>Mensaje:</strong></p>
			<p>${escapeHtml(mensaje).replace(/\n/g, "<br>")}</p>
		`
	})
}

module.exports = { sendContactEmail }

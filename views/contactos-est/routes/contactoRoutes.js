const express = require("express")
const { sendContactEmail } = require("../services/emailService")

const router = express.Router()

router.post("/", async (req, res) => {
	const { nombre, correo, telefono, servicio, mensaje } = req.body
	const telefonoLimpio = String(telefono || "").trim()

	if (!nombre || !correo || !telefonoLimpio || !servicio || !mensaje) {
		return res.status(400).send("Todos los campos son obligatorios.")
	}

	if (!/^\d{9}$/.test(telefonoLimpio)) {
		return res.status(400).send("El teléfono debe tener exactamente 9 números.")
	}

	try {
		await sendContactEmail({ nombre, correo, telefono: telefonoLimpio, servicio, mensaje })
		res.redirect("/contactos?enviado=1")
	} catch (error) {
		console.error("Error al enviar el correo de contacto:", error)
		res.status(500).send("No se pudo enviar el mensaje. Intenta nuevamente.")
	}
})

module.exports = router

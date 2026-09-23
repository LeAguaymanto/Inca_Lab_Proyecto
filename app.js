const express = require("express")
const path = require("path")
require("dotenv").config()

const contactoRoutes = require("./views/contactos-est/routes/contactoRoutes")

const app = express()
const PORT = process.env.PORT || 3006
const imagenesDir = path.join(__dirname, "views", "Imagenes")
const capacitacionesDir = path.join(imagenesDir, "Capacitaciones3")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: false }))
app.use("/imagenes", express.static(imagenesDir))
app.use("/imagenes/capacitaciones3", express.static(capacitacionesDir))
app.use("/imagenes/Capacitaciones3", express.static(capacitacionesDir))
app.use("/contactos", contactoRoutes)

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/inicio", (req, res) => {
    res.render("index")
})

app.get("/Capacitaciones", (req, res) => {
    res.render("capacitaciones")
})

app.get("/contactos", (req, res) => {
    res.render("contactos")
})

if (require.main === module) {
    app.listen(PORT, () => {
        console.log("Esta bien conectado en el puerto", PORT)
    })
}

module.exports = app
const express = require("express")
const path = require("path")
require("dotenv").config()

const contactoRoutes = require("./views/contactos-est/routes/contactoRoutes")

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use("/imagenes", express.static(path.join(__dirname, "views", "Imagenes")))
app.use("/contactos", contactoRoutes)

app.get("/inicio",(req,res)=>{
    res.render("index")
})

app.get("/Capacitaciones",(req,res)=>{
    res.render("capacitaciones")
})

app.get("/contactos",(req,res)=>{
    res.render("contactos")
})


app.listen(3006, (req,res)=>{
    console.log("Esta bien conectado")
})
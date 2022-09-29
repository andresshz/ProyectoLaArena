import express from 'express'
import { Controller, isAuthenticated } from './controllers/controller.user.js';
import { ControllerProductos } from './controllers/controller.productos.js';
import { ControllerCompras } from './controllers/compra.controller.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
dotenv.config()


const __dirname = dirname(fileURLToPath(import.meta.url))
const port = 3000 || process.env.PORTU
const app = express()


mongoose.connect(process.env.MONGODB)

app.set('views', __dirname)
app.use(express.json())
app.use(express.static('src/app'))
app.use(express.static('src/style'))
app.set('url', join(app.get('views'), `${'views'}`))

// * Agregar productos
app.get('/productoAdd', (req,res)=>{
    res.sendFile(`${app.get('url')}/productos.html`)
})

// * Mostrar productos
app.get('/showProduct', ControllerProductos.obtener)
app.post('/price', ControllerProductos.obtenerId)

// * Realizar compra
app.get('/administracion', (req, res) => {
    res.sendFile(`${app.get('url')}/compras.html`)
})


// * Login
app.get('/login', (req, res) => {
    res.sendFile(`${app.get('url')}/login.html`)
})

// * Routes post
app.post('/logeo', Controller.login)
app.post('/add', ControllerProductos.añadir)
app.post('/buyConfirm', ControllerCompras.agregar)

app.listen(port, () => {
    console.log("Arrancando api!!!!")
})
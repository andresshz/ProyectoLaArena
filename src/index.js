import express from 'express'
import { jsPDF } from 'jspdf';
import { Controller, isAuthenticated } from './controllers/controller.user.js';
import { ControllerProductos } from './controllers/controller.productos.js';
import { ControllerCompras } from './controllers/compra.controller.js';
import { Compras } from './controllers/controller.comprasRealizadas.js';
import { Inventario } from './controllers/controller.inventario.js';
import { Pdf } from './controllers/controller.generarpdf.js';
import { PendientesController } from './controllers/pendietes.controller.js';
import { ControllerCuadrar } from './controllers/cuadrar.controller.js';
import { variables } from './controllers/dependencias.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
dotenv.config()


const __dirname = dirname(fileURLToPath(import.meta.url))
const port = process.env.PORT
const app = express()

const mongodb = process.env.MONGODB

mongoose.connect(mongodb)

app.set('views', __dirname)
app.use(express.json())
app.use(express.static('src/app'))
app.use(express.static('src/style'))
app.use(express.static('src/images'))
app.set('url', join(app.get('views'), `${'views'}`))

// * Agregar productos
app.get('/productoAdd', (req, res) => {
    res.sendFile(`${app.get('url')}/productos.html`)
})

// * Mostrar productos
app.get('/showProduct', ControllerProductos.obtener)
app.get('/mostrarPendientes', PendientesController.obtener)
// * Mostrar Compras
app.get('/showCompras', Compras.obtener)
// * Mostrar saldo
app.get('/saldoInventario', Inventario.obtener)
app.post('/price', ControllerProductos.obtenerId)
app.post('/saldoId', Inventario.obtenerbyId)
app.post('/confirmarModificacion', ControllerProductos.modificar)
app.post('/modificarInventario', Inventario.Modificar)
app.post('/eliminarCompra', ControllerCompras.eliminar)



app.post('/pdfCompra', Pdf.generar)

app.post('/agregarCuadrar', ControllerCuadrar.guardar)
app.post('/agregarPendiente', PendientesController.agregar)
app.post('/eliminarPendiente', PendientesController.eliminar)
//Eliminar Producto
app.post('/DeleteProducto', ControllerProductos.eliminar)

// * Realizar compra
app.get('/administracion', (req, res) => {
    res.sendFile(`${app.get('url')}/compras.html`)
})


app.get('/generatePdf', (req, res) => {
    res.sendFile(`${app.get('url')}/generarPdf.html`)
})

// * Compras realizadas
app.get('/comprasRealizadas', (req, res) => {
    res.sendFile(`${app.get('url')}/comprasRealizadas.html`)
})

// * Inventario
app.get('/inventario', (req, res) => {
    res.sendFile(`${app.get('url')}/inventario.html`)
})
// * Productos añadidos
app.get('/produtosAdd', (req, res) => {
    res.sendFile(`${app.get('url')}/productosAñadidos.html`)
})

app.get('/crearPdf', (req, res) => {
    res.sendFile(`${app.get('url')}/crearPdf.html`)
})
// * Mostrar Pendiente
app.get('/pendientes', (req, res) => {
    res.sendFile(`${app.get('url')}/mostrarPendientes.html`)
})
// * Saldo monedas
app.get('/monedas', (req, res) => {
    res.sendFile(`${app.get('url')}/saldoFinal.html`)
})

// * Login
app.get('/login', (req, res) => {
    res.sendFile(`${app.get('url')}/login.html`)
})

// * Routes post
app.post('/logeo', Controller.login)
app.post('/add', ControllerProductos.añadir)
app.post('/buyConfirm', ControllerCompras.agregar)

// app.get('*',(req, res)=>{
//     res.redirect('/login')
// })

app.listen(port, () => {
    console.log("Arrancando api!!!!" + port)
})
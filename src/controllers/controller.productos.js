import { Producto } from "../models/productos.model.js";


const ControllerProductos = {

    añadir: async (req, res, next) => {

        try {

            const { body } = req

            const ProductoByName = await Producto.findOne({ nombre: body.nombre })
            if (ProductoByName) {
                return res.status(500).send("Ya hay un producto con este mismo nombre")
            }

            const createProducto = await Producto.create({ nombre: body.nombre, precio: body.precio, existencia: body.existencia })
            if (createProducto) {
                res.status(201).send("Exito")
                next()
            }
        } catch (e) {
            return res.status(500).send(e.message)
        }

    },

    obtener: async (req, res, next) => {
        try {
            const ObtenerProductos = await Producto.find()
            if (ObtenerProductos) {

                return res.status(200).send(ObtenerProductos);
            }
        } catch (e) {
            return res.status(500).send(e.message)
        }
    },

    obtenerId: async (req, res) => {
        try {
            const { body } = req
            console.log(body)
            const ObtenerProductos = await Producto.findById(body._id)
            if (ObtenerProductos) {
                return res.status(200).send(ObtenerProductos);
            }
        } catch (e) {
            return res.status(500).send(e.message)
        }
    },

    eliminar: async (req, res, next) => {
        const { body } = req
        try {
            const producto = await Producto.findById(body.id)
            if (producto) {
                producto.remove()
                res.status(200).send('exito')
            }
        } catch (e) {
            return res.status(500).send(e.message)
        }
    },

    modificar: async (req, res, next) => {
        const { body } = req
        try {
         const producto = await Producto.findById(body._id)
         if(producto){
            producto.nombre = body.nombre
            producto.precio = body.precio
            producto.existencia = body.existencia
            producto.save()
            console.log(producto)
            res.status(200).send('exito')
         }
        } catch (e) {
            return res.status(500).send(e.message)
        }
    }

}

export { ControllerProductos }
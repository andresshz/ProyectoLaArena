import { Compra } from '../models/compra.model.js'
import { Producto } from '../models/productos.model.js'
import { Saldo } from '../models/saldo.inventario.js';
import dotenv from 'dotenv';
dotenv.config()

const actualizarSaldo = async (total) => {

        const date = new Date()
        const saldoId = await Saldo.findById(process.env.ID)
        if(saldoId){
            const saldoBase = saldoId.saldo 
            const suma = saldoBase + total
            saldoId.saldo = suma
            saldoId.fecha = date.toLocaleDateString()
            saldoId.save()
        }
}

const actualizar = async (nombres, cantidad, names, cantidadUnica) => {

    const nombresLength = nombres.length;
    
    if (nombresLength > 1) {
        for (let i = 0; i < nombresLength.length; i++) {
            const productoActu = await Producto.findOne({ nombre: nombres[i] });
            console.log(productoActu)
            const cantidadBdd = productoActu.existencia;
            console.log(cantidadBdd)
            for (let j = 1; j < nombresLength.length; j++) {
                const resta = cantidadBdd - cantidad[j];
                productoActu.existencia = resta
                productoActu.save()
            }
        }
    } else {
        const productoActu = await Producto.findOne({ nombre: names });
        const cantidadBdd = productoActu.existencia;
        const resta = cantidadBdd - cantidadUnica
        productoActu.existencia = resta
        productoActu.save()
    }

}

const ControllerCompras = {

    agregar: async (req, res, next) => {
        const { body } = req
        const date = new Date()
        //Actualizar existencias...
        const actuExistencia = await actualizar(body.arraysNames, body.array, body.name, body.cantidad)

        //Actualizar saldo...
        const actuSaldo = await actualizarSaldo(body.total)
        //Crear compra
        const create = await Compra.create({ nombreCompra: body.nombreCompra, total: body.total, fecha: date.toLocaleDateString() })
        if (create) {
            res.status(200).send('Exito')
        }
    },

    eliminar: async (req, res, next) => {
        const { body } = req

        const compra = await Compra.findById(body._id)

        if (compra) {
            compra.remove()
            res.status(200).send('exito')
        }
    }

}

export { ControllerCompras }
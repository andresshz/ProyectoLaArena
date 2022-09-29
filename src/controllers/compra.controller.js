import { Compra } from '../models/compra.model.js'

const ControllerCompras = {
    
    agregar: async (req, res, next) => {
        const { body } = req

        const create = await Compra.create({ nombreCompra: body.compra, total: body.total })
        if (create) {
            res.status(200).send('Exito')
            next()
        }
    }
}

export { ControllerCompras }
import { Compra } from '../models/compra.model.js'


const Compras = {

    obtener: async (req, res, next) => {

        try {
            const TotalCompras = await Compra.find()
            if (TotalCompras) {
                return res.status(200).send(TotalCompras)
            }
        } catch (e) {
            return res.status(500).send(e.message)
        }

    },

    eliminar: (req, res, next) => {
        const { body } = req

        try {

        } catch (e) {

        }
    }


}


export { Compras }
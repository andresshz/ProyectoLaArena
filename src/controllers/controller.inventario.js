import { Saldo } from "../models/saldo.inventario.js"

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }


const Inventario = {

    obtener: async (req, res, next) => {
        try {
            const saldoInv = await Saldo.find()

            if (saldoInv) {
                res.status(200).send(saldoInv)
            }
        } catch (e) {
            res.status(500).send('Error')
        }

    },

    obtenerbyId: async (req, res, next) => {

        try {
            const { body } = req
            const inventario = await Saldo.findById(body._id)

            if (inventario) {
                res.status(200).send(inventario)
            }
        } catch (e) {
            res.status(500).send('Error')
        }
    },

    Modificar: async (req, res, next) => {

        try {

            const { body } = req
            const date = new Date()
            const inventario = await Saldo.findById(body._id)
            if (inventario) {
                inventario.saldo = body.saldo
                inventario.fecha = date.toLocaleDateString({ timeZone: "America/El_Salvador" })
                inventario.save()
                res.status(200).send('exito')
            }
        } catch (e) {

        }
    }

}

export { Inventario }
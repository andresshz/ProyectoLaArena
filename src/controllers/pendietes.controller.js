import { Pendientes } from "../models/pendientes.model.js";


const PendientesController = {

    agregar: async (req, res) => {


        try {
            const { body } = req
            const date = new Date()
            const agregarPendiete = await Pendientes.create({ nombre: body.nombre, descripcion: body.descripcion, total: body.precio, fecha: date.toLocaleDateString('es-MX', { timeZone: "America/El_Salvador" }) })
            if (agregarPendiete) {
                res.status(200).send('Exito')
            }
        } catch (e) {
            res.status(500).send(e)
        }

    },

    obtener: async (req, res) => {

        try {
            const pendientes = await Pendientes.find()
            if (pendientes) {
                let templateEmpty = ''
                const arrayPosiciones = []
                pendientes.map((elemento, posicion) => {
                    let template = `
                   <tr>
                   <td>${elemento.nombre}</td>
                   <td>${elemento.descripcion}</td>
                   <td>${elemento.total}</td>
                   <td>${elemento.fecha}</td>
                   <td><button id="btn-delete${posicion}" value="${elemento._id}" class="btn btn-danger"><i class="icon ion-md-trash"></i></button></td>
                   </tr>
                   `
                    templateEmpty += template
                    arrayPosiciones.push(posicion)
                })

                res.status(200).send({ 'template':  templateEmpty, 'posicion': arrayPosiciones})
            }
        } catch (e) {
            res.status(500).send(e)
        }

    },

    eliminar: async (req, res) => {

        try {
         const { body } = req
         const pendientesById = await Pendientes.findById({ _id: body._id})
         if(pendientesById){
            pendientesById.remove()
            res.status(200).send('Exito')
         }
        } catch (e) {
            res.status(500).send(e)
        }

    }

}


export { PendientesController }
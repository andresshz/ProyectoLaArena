import { Cuadrar } from "../models/cuadrarcaja.js";


const ControllerCuadrar = {

    guardar: async (req, res) => {

        try {
            const { body } = req
            console.log(body)
            const date = new Date()
            const create = await Cuadrar({totalDinero: body.totalDinero, fecha:date.toLocaleDateString('es-MX', { timeZone: "America/El_Salvador" }) })
            if(create){
                console.log('create')
                res.status(200).send('Exito')
            }
        } catch (e) {
            res.status(200).send(e)
        }
    }

}


export { ControllerCuadrar }
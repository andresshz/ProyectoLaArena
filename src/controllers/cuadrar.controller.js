import { Cuadrar } from "../models/cuadrarcaja.js";
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const ControllerCuadrar = {
    guardar: async (req, res) => {

        try {
            const { body } = req
            console.log(body)
            const date = new Date()
            const doc = new jsPDF();
            doc.setFontSize(20);
            doc.text(20, 20, 'Registro de Caja' + date.toLocaleDateString('es-MX', { timeZone: "America/El_Salvador" }))
            const columns = ["Total Dinero", "Total Billetes", "Total Monedas", "Fecha"];
            const data = [
                [body.totalDinero, body.totalBilletes, body.totalMonedas, date.toLocaleDateString('es-MX', { timeZone: "America/El_Salvador" })]
            ]

            doc.autoTable(columns, data,
                { margin: { top: 25 } }
            );
            let string = doc.output('datauristring')
            let embed = "<embed width='100%' height='100%' src='" + string + "'/>"

            // doc.save(`${body.nombre}.pdf`)
            const objeto = {
                'respuesta': 'exito',
                'embed': embed
            }

            res.status(200).send(objeto)

        } catch (e) {
            res.status(200).send(e)
        }
    }

}


export { ControllerCuadrar }
import e from 'express'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Compra } from '../models/compra.model.js'


const funcionPdf = (compras = {}) => {

    const array = []
    compras.map(elemento => {
        array.push(elemento.nombreCompra, elemento.total, elemento.fecha)
    })
    return array;

}

const Pdf = {

    generar: async (req, res) => {
        try {

            const { body } = req
            const compras = await Compra.find({ fecha: body.fecha })
            if (compras) {
                const doc = new jsPDF();
                doc.setFontSize(20);
                doc.text(20, 20, 'Registros de compras fecha ' + body.fecha);
                const columns = ["Nombre Compra", "Total", "Fecha"];
                const data = [
                    funcionPdf(compras),
                ];

                doc.autoTable(columns, data,
                    { margin: { top: 25 } }
                );
                let string = doc.output('datauristring')
                let embed = "<embed width='100%' height='100%' src='" + string + "'/>"
               
                // doc.save(`${body.nombre}.pdf`)
                const objeto = {
                    'compras': compras,
                    'respuesta': 'exito',
                    'embed':embed
                }
                res.status(200).send(objeto)
            } else {
                res.status(500).send(e)
            }
        } catch (e) {
            res.status(500).send(e)
        }
    },

    generarPdf: async (req, res) => {

        // const doc = new jsPDF();
        // const { body } = req

        // const margin = 10;
        // const scale =
        //     (doc.internal.pageSize.width - margin * 2) /
        //     body.scroll;

        // doc.html(body.body, {
        //     x: margin,
        //     y: margin,
        //     html2canvas: {
        //         scale: scale,
        //     },
        //     callback: function (doc) {
        //         doc.output("dataurlnewwindow", { filename: "prueba.pdf" });
        //     },
        // });
    }

}

export { Pdf }

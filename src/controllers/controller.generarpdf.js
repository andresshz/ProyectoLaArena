import html_pdf from 'html-pdf'
import { Compra } from '../models/compra.model.js'
import phantomPath from ''


const funcionPdf = (compras = {}) => {


    let liVacio = ' '

    compras.forEach((elemento, posicion) => {

        let template = `
      
        <tbody>
    <tr>
      <th scope="row">${posicion}</th>
      <td>${elemento.nombreCompra}</td>
      <td>$ ${elemento.total}</td>
    </tr>
  </tbody>

        `

        liVacio += template
    })

    return liVacio;


}
const Pdf = {

    generar: async (req, res) => {
        try {

            const nombrePdf = 'hola_mundo'
            const { body } = req
            console.log(body.fecha)
            const compras = await Compra.find({ fecha: body.fecha })
            const arrayTotal = []
            compras.forEach(compra => {
                arrayTotal.push(compra.total)
            })
            const sumaTotal = arrayTotal.reduce((a, b) => a + b)
            const sumaTotalDecimales = sumaTotal.toFixed(2);
            if (compras) {

                const template = `
                  <!doctype html>
    <html>
       <head>
            <meta charset="utf-8">
            <title>PDF Result Template</title>
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500&display=swap');
                *{
                    font-family: 'Nunito', sans-serif;
                    font-size: 20px;
                }
                table{

                    border-collapse: collapse;
                }
                h1 {
                    font-family: 'Nunito', sans-serif;
                    font-size: 25px;

                }
                table th{
                    padding: 12px;
                    border: 1px solid black;
                }
                table td{
                    padding: 12px;
                    border: 1px solid black;
                }
            </style>
        </head>
        <body>
            <h1 style="width:100%; text-align:center; margin-top: 10%;">Reporte de compras de la fecha ${body.fecha}</h1>
            <div style="width:100%; margin-top: 10%;">
            <table style="width:60%; margin:0 auto;">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre compra:</th>
            <th scope="col">Precio compra:</th>
            </tr>
            </thead>
            ${funcionPdf(compras)}
            </table>
           
            <h3 style="text-align:center;">Precio total: $ ${sumaTotalDecimales}</h3>
            </div>
        </body>
    </html>      
                  `
                let OPTIONS = {phantomPath: './node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs'};
                html_pdf.create(template, OPTIONS).toFile(`C:/Users/andre/OneDrive/Escritorio/PDF-pruebas/${body.nombre}.pdf`, function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(res);
                    }
                });

                res.status(200).send('exito')
            }else{
                res.status(500).send('Error')
            }
        } catch (e) {
            res.status(500).send('Error')
        }
    }

}


export { Pdf }
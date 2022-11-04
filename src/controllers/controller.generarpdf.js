import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import puppeteer from 'puppeteer'
import { Compra } from '../models/compra.model.js'


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

            const { body } = req
            const compras = await Compra.find({ fecha: body.fecha })

            if (compras) {

                    const content = fs.readFileSync(`C:\Users\andre\OneDrive\Escritorio\PDF-pruebas\ ${body.nombre}.html`, 'utf-8')
                    const browser = await puppeteer.launch()
                    const page = await browser.newPage()
                    await page.setContent(content)
                    const options = {
                        path: `C:\Users\andre\OneDrive\Escritorio\PDF-pruebas\ ${body.nombre}PDF.pdf`,
                        format: 'A4',
                    };

                    // await page.goto('https://proyectolaarena-production.up.railway.app/productoAdd', {waitUntil: 'domcontentloaded'})

                    const buffer = await page.pdf(options)
                    await browser.close()
                    res.end(buffer)

            
            } else {
                res.status(500).send('Error')
            }
        } catch (e) {
            res.status(500).send('Error')
        }
    },

    crearHtml: async (req, res) => {
        try {
            const { body } = req
            console.log(body.fecha)
            const compras = await Compra.find({ fecha: body.fecha })
            console.log('json compras:')
            console.log(compras)
            const arrayTotal = []
            compras.forEach(compra => {
                arrayTotal.push(compra.total)
            })

            const sumaTotal = arrayTotal.reduce((a, b) => a + b)
            const sumaTotalDecimales = sumaTotal.toFixed(2);
            const fileContent = `
                        <!doctype html>
          <html>
             <head>
                  <meta charset="utf-8">
                  <title>Resultado de compras ${body.fecha}</title>
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
                 <h3 style="text-align:center;">${sumaTotalDecimales}</h3>
                  </div>
              </body>
          </html>      
                        `

            const filepath = `C:\Users\andre\OneDrive\Escritorio\PDF-pruebas\ ${body.nombre}.html`;

            fs.writeFile(filepath, fileContent, (err) => {
                if (err) throw err;
                console.log("El archivo se guardo correctamente!!!");   
            });
            res.status(200).send('exito')
        } catch (e) {
            res.status(500).send(e)
        }

    }

}

export { Pdf }

function formato(texto) {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
}
const capturarFecha = () => {


    const formulario = document.getElementById('form')
    formulario.onsubmit = async (e) => {
        e.preventDefault()
        const nombrePdf = document.getElementById('nombre').value
        const fechaInput = document.getElementById('fecha')
        const fechaValor = fechaInput.value
        const formatoFecha = formato(fechaValor)

        const json = { 'fecha': formatoFecha, nombre: nombrePdf }
        const request = await fetch('/pdfCompra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })

        const responses = await request.text()
        console.log(responses)
        if (responses === 'exito') {
            Swal.fire({
                title: 'PDF generado correctamente!!!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload()
                }
            })
        }
    }
}


const templateMenu = () => {
    const template = `<div class="logo">
    <h4 class="text-light font-weight-bold">La Arena</h4>
  </div>
  <div class="menu">
    <a href="/administracion"><i class="icon ion-md-cart" style="margin-right: 2%;"></i>Realizar compra</a>
    <a href="/comprasRealizadas"><i class="icon ion-md-card" style="margin-right: 2%;"></i>Compras</a>
    <a href=""><i class="icon ion-md-book" style="margin-right: 2%;"></i>Generar PDF</a>
    <a href="/productoAdd"><i class="icon ion-md-checkbox" style="margin-right: 2%;"></i>Añadir producto</a>
    <a href="/produtosAdd"><i class="icon ion-md-clipboard" style="margin-right: 2%;"></i>Administrar productos</a>
    <a href="/inventario"><i class="icon ion-md-cash" style="margin-right: 2%;"></i></i>Administrar Inventario</a>
  </div>`

    const menu = document.getElementById('sidebar-container')
    menu.innerHTML = template

}

const checkLogin = () => localStorage.getItem('tokenSecreto')
window.onload = () => {
    const isLoged = checkLogin()
    if (isLoged) {
        templateMenu()
        capturarFecha()
    } else {
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = 'No puede ver este contenido'
    }
}
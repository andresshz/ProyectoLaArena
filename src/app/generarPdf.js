function formato(texto) {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
}

const validacionEmpty = (cadena) => {

    if (cadena.length === 0) {
        return "false"
    } else {
        return 'ok';
    }
}
const capturarFecha = () => {


    const formulario = document.getElementById('form')
    formulario.onsubmit = async (e) => {
        e.preventDefault()
        const nombrePdf = document.getElementById('nombre').value
        const fechaInput = document.getElementById('fecha')
        const fechaValor = fechaInput.value

        const formatoFecha = formato(fechaValor)

        const emptyFecha = validacionEmpty(fechaValor)
        const emptyNombre = validacionEmpty(nombrePdf)
        if (emptyFecha === 'false') {
            Swal.fire('Porfavor rellene los campos vacios!!!!')
            return;
        }
        if (emptyNombre === 'false') {
            Swal.fire('Porfavor rellene los campos vacios!!!!')
            return;
        }
        const json = { 'fecha': formatoFecha, nombre: nombrePdf }
        //Crear HTML
        const requestHtml = await fetch('/pdfHtml', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        const responsesHtml = await requestHtml.text()
        console.log(responsesHtml)
        if (responsesHtml === 'exito') {
            const request = await fetch('/pdfCompra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            })

            const responses = await request.text()

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
            } else if (responses === 'Error') {
                Swal.fire({
                    title: 'No se encontraron registros en esta fecha!!',
                    icon: 'warning',
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
}


const templateMenu = () => {
    const template = `<div class="logo">
    <h4 class="text-light font-weight-bold">La Arena</h4>
  </div>
  <div class="menu">
  <a href="/administracion"><i class="icon ion-md-cart" style="margin-right: 2%;"></i>Realizar compra</a>
  <a href="/comprasRealizadas"><i class="icon ion-md-card" style="margin-right: 2%;"></i>Compras</a>
  <a href="/pdf"><i class="icon ion-md-book" style="margin-right: 2%;"></i>Generar PDF</a>
  <a href="/productoAdd"><i class="icon ion-md-checkbox" style="margin-right: 2%;"></i>Añadir producto</a>
  <a href="/produtosAdd"><i class="icon ion-md-clipboard" style="margin-right: 2%;"></i>Administrar productos</a>
  <a href="/inventario"><i class="icon ion-md-cash" style="margin-right: 2%;"></i>Administrar Inventario</a>
  <a href="/monedas"><i class="icon ion-md-clipboard" style="margin-right: 2%;"></i>Cuadrar Caja</a>
  <button style="margin-left:3%; width:70%; margin-top:10%;" class="btn btn-primary" id="cerrar"><i class="icon ion-md-contact"></i>Cerrar Sesión</button>
</div>`

    const menu = document.getElementById('sidebar-container')
    menu.innerHTML = template

}


const cerrarSesion = () => {

    const btn = document.getElementById('cerrar')
    btn.onclick = () => {
        window.location.href = "/login"
        localStorage.removeItem('tokenSecreto');
    }

}

const checkLogin = () => localStorage.getItem('tokenSecreto')
window.onload = () => {
    const isLoged = checkLogin()
    if (isLoged) {
        templateMenu()
        capturarFecha()
        cerrarSesion()
    } else {
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = 'No puede ver este contenido'
    }
}
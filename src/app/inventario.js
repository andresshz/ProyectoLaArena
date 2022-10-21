const validacionEmpty = (cadena) => {

    if (cadena.length === 0) {
        return "false"
    } else {
        return 'ok';
    }
}

const confirmarModificacion = () => {
    const btn = document.getElementById('btn-save')
    btn.onclick = async () => {
        const _id = document.getElementById('_id').value
        const saldo = document.getElementById('saldo').value
        const empty = validacionEmpty(saldo)
        if (empty === "false") {
            Swal.fire('Porfavor rellene el campo vacio!!!')
            return;
        }
        const saldoDecimales = Number.parseFloat(saldo).toFixed(2)
        const json = { '_id': _id, 'saldo': saldoDecimales }

        const request = await fetch('/modificarInventario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        const responses = await request.text()
        if (responses === 'exito') {
            Swal.fire({
                title: 'Saldo en inventario Modificado!!!',
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

const Modificar = () => {


    const btn = document.getElementById('btn-mod')

    btn.onclick = async () => {

        const btn_value = btn.value

        const json = { '_id': btn_value }
        const request = await fetch('/saldoId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })

        const responses = await request.json()

        const template = `<form id="formulario">
            <input type="hidden" id="_id" value="${responses._id}" id="_id">
            <label class="form-label" >Cambiar Saldo:</label>
            <input type="number" value="${responses.saldo}" name="saldo" id="saldo" class="form-control" required>
            </form>`
        const mbody = document.getElementById('modal_body')
        mbody.innerHTML = template
    }
}


const MostrarSaldo = async () => {


    const request = await fetch('/saldoInventario', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const responses = await request.json()

    const mapS = responses.map(res => {
        const template = `<tr>
        <td>${res.saldo}</td>
        <td>${res.fecha}</td>
        <td><button id="btn-mod" class="btn btn-primary" value="${res._id}" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i class="icon ion-md-build"></i>
        </button>
        </td>
        </tr>`

        const tbody = document.getElementById('tbody')

        tbody.innerHTML = template

        Modificar()
        confirmarModificacion()
    })


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
        MostrarSaldo()
    } else {
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = 'No puede ver este contenido'
    }
}
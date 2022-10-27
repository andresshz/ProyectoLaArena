const EliminarCompra = (posiciones = []) => {


    for (let i = 0; i < posiciones.length; i++) {
        const btn = document.getElementById('btn-delete' + posiciones[i])
        btn.onclick = async () => {
            Swal.fire({
                title: 'Seguro que desea eliminar?',
                text: "Se eleminara completamente este registro de la base de datos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const _id = btn.value
                    const json = {
                        '_id': _id
                    }
                    const request = await fetch('/eliminarCompra', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(json)
                    })

                    const responses = await request.text()

                    if (responses === "exito") {
                        Swal.fire(
                            'Eliminada',
                            'Compra eliminada!!!',
                            'success'
                        ).then((result) => {
                            if (result.isConfirmed){
                                location.reload()
                            }
                        })

                    }
                }
            })
            return;


        }
    }

}

const MostrarCompras = async () => {

    const request = await fetch('/showCompras', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })


    const compras = await request.json()

    const arrayPosiciones = []
    let tabla = ''
    compras.forEach((elemento, posicion) => {


        let tablaConDatos = `
  <tr>
    <td>${elemento.nombreCompra}</td>
    <td> $ ${elemento.total}</td>
    <td>${elemento.fecha}</td>
    <td><button id="btn-delete${posicion}" value="${elemento._id}" class="btn btn-danger"><i class="icon ion-md-trash"></i></button></td>
  </tr>`
        tabla += tablaConDatos

        arrayPosiciones.push(posicion)
    })

    const contenedor = document.getElementById('tbody')

    contenedor.innerHTML = tabla
    EliminarCompra(arrayPosiciones)

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


const cerrarSesion = () =>{

    const btn = document.getElementById('cerrar')
    btn.onclick = () =>{
        window.location.href = "/login"
        localStorage.removeItem('tokenSecreto');
    }

}

const checkLogin = () => localStorage.getItem('tokenSecreto')
window.onload = () => {
    const isLoged = checkLogin()
    if (isLoged) {
        templateMenu()
        MostrarCompras()
        cerrarSesion()
    } else {
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = 'No puede ver este contenido'
    }
}
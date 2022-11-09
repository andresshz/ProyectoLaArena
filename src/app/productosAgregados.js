const validacionEmpty = (cadena, cadena2, cadena3) => {

    if (cadena.length === 0 && cadena2.length === 0, cadena3.length === 0) {
        return "false"
    } else {
        return 'ok';
    }
}
const numberValidate = (cadena) => {
    if (/^[0-9]+$/.test(Math.floor(cadena))) {
        return "ok";
    } else {
        return "false";
    }
}


const stringValidate = (cadena) => {

    if (/^[A-Z]+$/i.test(cadena)) {
        return "ok";
    } else {
        return "false";
    }

}
const validateEspacios = (cadena) => {
    if (/\s/.test(cadena)) {
        let cadenaSinEspacios = cadena.replace(/\s/g, '')
        const string = stringValidate(cadenaSinEspacios)
        return string;
    } else {
        const string = stringValidate(cadena)
        return string;
    }
}

const confirmarModificacion = () => {
    const btn = document.getElementById('btn-save')
    btn.onclick = async () => {
        const _id = document.getElementById('_id').value
        const nombre = document.getElementById('nombre').value
        const precio = document.getElementById('precio').value
        const existencia = document.getElementById('existencia').value

        const string = validateEspacios(nombre)
        const empty = validacionEmpty(nombre, precio, existencia)
        const numberExistencia = numberValidate(existencia)
        const numberPrecio = numberValidate(precio)

        if (empty === 'false') {
            Swal.fire('Rellene el campo vacio porfavor!!!')
            return;
        }
        if (string === "false") {
            Swal.fire('Ingrese el valor correcto para nombre.')
            return;
        }
        if (numberExistencia === "false") {
            Swal.fire('Ingrese el valor correcto para la existencia')
            return;
        }
        if (numberPrecio === "false") {
            Swal.fire('Ingrese el valor correcto para el precio')
            return;
        }
        const json = { '_id': _id, 'nombre': nombre, 'precio': precio, 'existencia': existencia }

        const request = await fetch('/confirmarModificacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        const responses = await request.text()
        if (responses === 'exito') {
            Swal.fire({
                title: 'Producto Modificado correctamente!!!',
                icon: 'succes',
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

const ModificarProducto = (posiciones = []) => {

    for (let i = 0; i < posiciones.length; i++) {
        const boton = document.getElementById('btn-mod' + posiciones[i])
        boton.onclick = async () => {
            const _id = boton.value
            const json = { '_id': _id }
            const request = await fetch('/price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            })

            const responses = await request.json()
            const template = `<form id="formulario">
            <input type="hidden" id="_id" value="${responses._id}" id="_id">
            <label class="form-label" >Cambiar nombre:</label>
            <input type="text" value="${responses.nombre}" name="nombre" id="nombre" class="form-control" required>
            <label class="form-label" >Cambiar precio:</label>
            <input type="text" value="${responses.precio}" name="precio" step="0.01" id="precio" class="form-control" required>
            <label class="form-label" >Cambiar existencia:</label>
            <input type="text" value="${responses.existencia}" name="existencia" id="existencia" class="form-control" required>
            </form>`
            const mbody = document.getElementById('modal_body')
            mbody.innerHTML = template
        }
    }

}


const EliminarProducto = async (productos = []) => {
    for (let i = 0; i < productos.length; i++) {
        const btn = document.getElementById('btn-delete' + productos[i])
        btn.onclick = async () => {
            Swal.fire({
                title: 'Realmente desea eliminar este producto?',
                text: "El producto se eliminara completamente en la base de datos.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const btnValue = btn.value
                    const bodyjson = {
                        'id': btnValue
                    }
                    const requestDelete = await fetch('/DeleteProducto', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bodyjson)
                    })

                    const respuesta = await requestDelete.text()
                    if (respuesta === 'exito') {
                        Swal.fire(
                            'Eliminado!',
                            'El producto ha sido eliminado correctamente!!!',
                            'success'
                        ).then((result) => {
                            if (result.isConfirmed) {
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
const MostrarProductos = async () => {

    const request = await fetch('/showProduct', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const productos = await request.json()
    let tabla = ''
    const array = []
    const posiciones = []

    productos.forEach((elemento, posicion) => {
        let template = `<tr>
<td>${elemento.nombre}</td>
<td> $ ${elemento.precio}</td>
<td>${elemento.existencia}</td>
<td><button type="button" id="btn-delete${elemento.nombre}" value="${elemento._id}" class="btn btn-danger"><i class="icon ion-md-trash"></i></button><button id="btn-mod${posicion}" class="btn btn-primary" value="${elemento._id}" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
<i class="icon ion-md-build"></i>
</button>
</td>
</tr>`;
        tabla += template
        array.push(elemento.nombre)
        posiciones.push(posicion)

    })

    const tbody = document.getElementById('tbody')
    tbody.innerHTML = tabla

    EliminarProducto(array)
    ModificarProducto(posiciones)
    confirmarModificacion()

}

const templateMenu = () => {
    const template = `<div class="logo">
    <h4 class="text-light font-weight-bold">La Arena</h4>
  </div>
  <div class="menu">
  <a href="/administracion"><i class="icon ion-md-cart" style="margin-right: 2%;"></i>Realizar compra</a>
  <a href="/comprasRealizadas"><i class="icon ion-md-card" style="margin-right: 2%;"></i>Compras</a>
  <a href="/generatePdf"><i class="icon ion-md-book" style="margin-right: 2%;"></i>Generar PDF</a>
  <a href="/productoAdd"><i class="icon ion-md-checkbox" style="margin-right: 2%;"></i>Añadir producto</a>
  <a href="/produtosAdd"><i class="icon ion-md-clipboard" style="margin-right: 2%;"></i>Administrar productos</a>
  <a href="/inventario"><i class="icon ion-md-cash" style="margin-right: 2%;"></i>Administrar Inventario</a>
  <a href="/monedas"><i class="icon ion-md-clipboard" style="margin-right: 2%;"></i>Cuadrar Caja</a>
  <a href="/pendientes"><i class="icon ion-md-calculator" style="margin-right: 2%;"></i>Administración pendientes</a>
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
        MostrarProductos()
        cerrarSesion()
    } else {
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = 'No puede ver este contenido'
    }
}
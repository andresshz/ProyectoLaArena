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
const EliminarPendiente = async (posicion = []) => {
    for (let i = 0; i < posicion.length; i++) {
        const btn = document.getElementById('btn-delete' + posicion[i])
        btn.onclick = async () => {
            Swal.fire({
                title: 'Realmente desea eliminar este pendiente?',
                text: "El pendiente se eliminara completamente en la base de datos.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const btnValue = btn.value
                    const bodyjson = {
                        '_id': btnValue
                    }
                    const requestDelete = await fetch('/eliminarPendiente', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bodyjson)
                    })

                    const respuesta = await requestDelete.text()
                    if (respuesta === 'Exito') {
                        Swal.fire(
                            'Eliminado!',
                            'El pendiente ha sido eliminado correctamente.',
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

const obtener = async () => {

    const request = await fetch('/mostrarPendientes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const responses = await request.json()

    const array = responses.posicion
    const tbody = document.getElementById('tbody')
    tbody.innerHTML = responses.template

    //Delete pendientes

    EliminarPendiente(array)

}

const addForm = () => {

    const btn = document.getElementById('btn-pendientes')
    btn.onclick = async () => {

        const nombre = document.getElementById('nombre').value
        const descripcion = document.getElementById('descripcion').value
        const precio = document.getElementById('precio').value
        const json = { 'nombre': nombre, 'descripcion': descripcion, 'precio': precio }
        const empty = validacionEmpty(nombre, descripcion, precio)
        const string = validateEspacios(nombre)
        const numero = numberValidate(precio)
        console.log(numero)
        //Empty: Todos los campos
        if (empty === 'false') {
            Swal.fire('Rellene el campo vacio porfavor!!!')
            return;
        }
        //String : nombre
        if (string === "false") {
            Swal.fire('Ingrese el campo correcto para el nombre')
            return;
        }
        //Number : precio
        if (numero === "false") {
            Swal.fire('Ingrese el campo correcto para el precio')
            return;
        }

        // const formData = new FormData(form)
        // const dataForm = Object.fromEntries(formData.entries())

        const resquest = await fetch('/agregarPendiente', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const responses = await resquest.text()

        if (responses === 'Exito') {
            Swal.fire({
                title: 'Pendiente agregado correctamente',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    nombre.value = ' '
                    descripcion.value = ' '
                    precio.value = ' '
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
        addForm()
        obtener()
        cerrarSesion()
    } else {
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = 'No puede ver este contenido'
    }
}
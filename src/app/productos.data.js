const validacionEmpty = (cadena, cadena2, cadena3) => {

    if (cadena.length === 0 && cadena2.length === 0, cadena3.length === 0) {
        return "false"
    } else {
        return 'ok';
    }
}
const stringValidate = (cadena) => {

    if (/^[A-Z]+$/i.test(cadena)) {
        return "ok";
    } else {
        return "false";
    }

}

const numberValidate = (cadena) => {
    if (/^[0-9]+$/.test(Math.floor(cadena))) {
        return "ok";
    } else {
        return "false";
    }
}

const validateEspacios = (cadena) => {
    if (/\s/.test(cadena)) {
        
        let cadenaSinEspacios = cadena.replace(/\s/g,'')
        const string = stringValidate(cadenaSinEspacios)
        return string;
    } else {
        const string = stringValidate(cadena)
        return string;
    }
}


const Request = async (body) => {

    const request = await fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const responses = await request.text()
    if (responses === "Exito") {
        Swal.fire('Producto añadido con exito!!!!')
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
    <a href="/inventario"><i class="icon ion-md-cash" style="margin-right: 2%;"></i></i>Administrar Inventario</a>
  </div>`

    const menu = document.getElementById('sidebar-container')
    menu.innerHTML = template

}

const addForm = () => {
    const form = document.getElementById('formulario')
    form.onsubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(form)
        const dataJson = Object.fromEntries(data.entries())
        const campoNombre = document.getElementById('nombre').value
        const campoPrecio = document.getElementById('precio').value
        const campoExistencia = document.getElementById('existencia').value
        const empty = validacionEmpty(campoNombre, campoPrecio, campoExistencia)
        const string = validateEspacios(campoNombre)
        const numberExistencia = numberValidate(campoExistencia)
        const numberPrecio = numberValidate(campoPrecio)

        if (empty === 'false') {
            Swal.fire('Rellene el campo vacio porfavor!!!')
            return;
        }
        if (numberExistencia === 'false' || numberPrecio === 'false') {
            Swal.fire('Ingrese el valor correcto para la existencia y/o el precio.')
            return;
        }
        if (string === "false") {
            Swal.fire('Ingrese el valor correcto para nombre.')
            return;
        }
        Request(dataJson)
        form.reset()
    }
}

const checkLogin = () => localStorage.getItem('tokenSecreto')
window.onload = () => {
    const isLoged = checkLogin()
    if (isLoged) {
        templateMenu()
        addForm()
    } else {
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = 'No puede ver este contenido'
    }
}

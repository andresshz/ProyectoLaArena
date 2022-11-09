//validaciones
const emptyValidate = (cantidad) => {
  if (cantidad.length === 0) {
    return "false"
  } else {
    return 'ok';
  }
}

const numberValidate = (cadena) => {
  if (/^[0-9]+$/.test(cadena)) {
    return "ok";
  } else {
    return "false";
  }
}

const validarMayor0 = (cantidadInput, cantidadBD) => {
  const valor1 = 1;
  const valor2 = 2;
  if (cantidadInput > cantidadBD) {
    return valor1;
  }
  return valor2;

}

const btnLimpiar = () =>{
  const btnClear = document.getElementById('limpiar')
  btnClear.onclick = () =>{
    const formulario = document.getElementById('formulario')
    formulario.onsubmit = (e) =>{
      formulario.reset()
    }
  }
}


//obtener precio por id = Función 1
const obtenerPrecio = async (_id) => {

  const json = {
    '_id': _id
  }
  const requestPrice = await fetch('/price', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  })
  const respuestaPrecio = await requestPrice.json()
  return respuestaPrecio;
}

const validarBoton = (obj) => {
  return Object.keys(obj).length === 0
}

const confirmarCompra = (datos = {}) => {

  const formulario = document.getElementById('formulario')
  formulario.onsubmit = async (e) => {
    e.preventDefault()
    if (validarBoton(datos)) {
      Swal.fire({
        title: 'Debe agregar una compra para confirmar!',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }
      })
    } else {
      const request = await fetch('/buyConfirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      })

      const responses = await request.text()

      if (responses === 'Exito') {
        Swal.fire({
          title: 'Compra realizada correctamente!!!!',
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
}

//Obtener la cantidad productos y precio con el evento onclick. Función 2
const añadir = (respuesta) => {
  const array = [] //Array de total productos
  const arrayPrecio = [] //Array de precio
  const arrayProductos = [] //Array de productos
  const arrayNombres = [] //Nombre de producto


  respuesta.forEach((lista, i) => {

    const nombre = lista.nombre;
    const btn = document.getElementById('add' + nombre)

    btn.onclick = async () => {
      const id = lista._id;//Id
      const cantidad = document.getElementById('cantidad' + nombre).value;
      const empty = emptyValidate(cantidad)
      const numer = numberValidate(cantidad)
      const value0 = validarMayor0(cantidad, lista.existencia)
      if (value0 == 1) {
        Swal.fire('No hay esta cantidad de productos en existencia.')
        return;
      }
      if (numer === 'false' && empty === 'false') {
        Swal.fire('Rellenar el campo, y/o ingresar solo números')
        return;
      }

      array.push(parseInt(cantidad, 10))
      const suma = array.reduce((a, b) => a + b);
      const seleccionados = document.getElementById('seleccionados')
      seleccionados.innerHTML = 'Productos seleccionados:' + suma;
      const precio = await obtenerPrecio(id) //Función 1
      arrayPrecio.push(precio.precio * cantidad)
      const sumaPrecio = arrayPrecio.reduce((a, b) => a + b);
      const total = document.getElementById('total')
      total.innerHTML = '<i class="icon ion-md-cash"></i> Tota a pagar: $' + sumaPrecio;

      const nombreCompra = precio.nombre + ' ' + 'Cantidad: ' + cantidad;
      arrayProductos.push(nombreCompra)
      const sumaTextos = arrayProductos.reduce((a, b) => a + ' -- ' + b);
      arrayNombres.push(precio.nombre)
      const precioTotal = parseFloat(sumaPrecio.toFixed(2))
      const compraJSON = {
        'name': precio.nombre,
        'nombreCompra': sumaTextos,
        'total': precioTotal,
        'nombre': arrayNombres + "",
        'cantidad': cantidad,
        'arraysNames': arrayNombres,
        'array': array
      }
      confirmarCompra(compraJSON)
    }
  })

}

//Obtener todos los productos de la bdd
const obtener = async () => {
  const request = await fetch('/showProduct', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const respuesta = await request.json()

  let listProduct = ' ';
  respuesta.forEach((lista, i) => {

    const card = `
    <h6 style="display: none;" id="titulo">${lista.nombre}</h6>
   <tr>
      <th scope="row">${i}</th>
      <td>${lista.nombre}</td>
      <td>$ ${lista.precio}</td>
      <td>${lista.existencia}</td>
      <td><input type="number" id="cantidad${lista.nombre}" min="0" step="1" class="form-control" /><br /></td>
      <td><button id="add${lista.nombre}" class="btn btn-primary" style="width:210px;" type="button">Agregar</button></td>
    </tr>
   `;
    listProduct += card
  })
  const main = document.getElementById('productos')
  main.innerHTML = listProduct
  añadir(respuesta) //Función 2
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
<a href="/pendientes"><i class="icon ion-md-calculator" style="margin-right: 2%;"></i>Administración pendientes</a>
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
    obtener()
    confirmarCompra()
    btnLimpiar()
    cerrarSesion()
  } else {
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = 'No puede ver este contenido'
  }
}
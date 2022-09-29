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

//Obtener la cantidad productos y precio con el evento onclick. Función 2
const añadir = (respuesta) => {
  const array = []
  const arrayPrecio = []
  const arrayProductos = []
  
  respuesta.forEach((lista, i) => {

    const nombre = lista.nombre;
    const btn = document.getElementById('add' + nombre)

    btn.onclick = async () => {
      const id = lista._id;//Id
      const cantidad = document.getElementById('cantidad' + nombre).value;
      const empty = emptyValidate(cantidad)
      const numer = numberValidate(cantidad)
      if (numer === 'false' && empty === 'false') {
        alert('Rellenar el campo, y/o ingresar solo números')
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
      total.innerHTML = 'Tota a pagar: $' + sumaPrecio;
      
      const nombreCompra = precio.nombre + 'Cantidad: '+ cantidad;
      arrayProductos.push(nombreCompra)
      const compraJSON = {
        'nombreCompra': arrayProductos,
        'total': sumaPrecio
      }
      console.log(compraJSON)

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
    <div class="card" style="width: 16rem; height:16rem; margin-left:10%;">
    <div class="card-body">
      <h6 style="display: none;" id="titulo">${lista.nombre}</h6>
      <h5 class="card-title"><b>Producto:</b> ${lista.nombre}</h5>
      <h6 class="card-subtitle mb-2 text-muted"><b>Precio:</b> $ ${lista.precio}</h6>
      <p class="card-text"><b>Disponibles:</b> ${lista.existencia}</p>
      <label class="card-text">Cantidad:</label>
      <input type="number" id="cantidad${lista.nombre}" min="0" step="1" class="form-control" /><br />
      <button id="add${lista.nombre}" class="btn btn-primary" style="width:210px;" type="button">Agregar</button>
    </div>
   </div>
   `;

    listProduct += card
  })
  const main = document.getElementById('productos')
  main.innerHTML = listProduct
  añadir(respuesta) //Función 2
}

const checkLogin = () => localStorage.getItem('tokenSecreto')
window.onload = () => {
  const isLoged = checkLogin()
  if (isLoged) {
    obtener()
  } else {
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = 'No puede ver este contenido'
  }
}
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

const addForm = () =>{


    const form = document.getElementById('formulario')

    form.onsubmit = (e) =>{
        e.preventDefault()
        
        const nombre = document.getElementById('nombre').value
        const descripcion = document.getElementById('descripcion').value
        const precio = document.getElementById('precio').value
        
        const empty = validacionEmpty(nombre, descripcion , precio)
        const string = validateEspacios(nombre)
        const numero = numberValidate(precio)
        //Empty: Todos los campos
        if (empty === 'false') {
            Swal.fire('Rellene el campo vacio porfavor!!!')
            return;
        }
        //String : nombre
        if(string === "false"){
            Swal.fire('Ingrese el campo correcto para el nombre')
            return;
        }
        //Number : precio
        if(numero === "false"){
            Swal.fire('Ingrese el campo correcto para el precio')
            return;
        }

        const formData = new FormData(form)
        const dataForm = Object.fromEntries(formData.entries())
        console.log(dataForm)

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
      cerrarSesion()
      addForm()
    } else {
      const body = document.getElementsByTagName('body')[0]
      body.innerHTML = 'No puede ver este contenido'
    }
  }
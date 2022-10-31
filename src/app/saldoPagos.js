const validacionEmpty = (cadena) => {

    if (cadena.length === 0) {
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
const cuadrar = (preciosArray = []) => {

    const saldosFinales = []
    preciosArray.map((elemento) => {
        const arrayTotal = []
        
        const suma = []
        const boton = document.getElementById('btn' + elemento)
        boton.onclick = () => {

            let input = document.getElementById(elemento).value
            const empty = validacionEmpty(input)
            const numero = numberValidate(input)
            if (empty === 'false' || numero === 'false') {
                Swal.fire('Rellenar el campo y/o ingrese solo números!!!')
                return;
            }
            const value = boton.value
            if (elemento === '0.25' || elemento === '0.10' || elemento === '0.25' || elemento === '0.05' || elemento === '0.01') {
                const valorFloat = Number.parseFloat(value)
                const inputEntero = Number.parseInt(input, 10)
                arrayTotal.push(inputEntero)
                suma.push(valorFloat * inputEntero)

                const sumaCantidad = arrayTotal.reduce((a, b) => a + b)
                const cantidad = document.getElementById(elemento + '-total')
                cantidad.innerHTML = `<h5>#${sumaCantidad}</h5>`
                const suma_total = suma.reduce((a, b) => a + b);
                const suma_decimales = suma_total.toFixed(2)
                const div = document.getElementById('total-' + value)
                div.innerHTML = `<h5>$ ${suma_decimales}</h5>`

                saldosFinales.push(suma_decimales)
                const saldoTotal = saldosFinales.reduce((a, b) => a + b);
                const saldoFinal = document.getElementById('SaldoFinal')
                saldoFinal.innerHTML = `<h4 style="width:100%; text-align:center;">Total efectivo: $ ${saldoTotal} </h4>`
            } else {

                const valorEntero = Number.parseInt(value, 10)
                const inputEntero = Number.parseInt(input, 10)
                arrayTotal.push(inputEntero)
                suma.push(valorEntero * inputEntero)
                const sumaCantidad = arrayTotal.reduce((a, b) => a + b)
                const cantidad = document.getElementById(elemento + '-total')
                cantidad.innerHTML = `<h5>#${sumaCantidad}</h5>`
                const suma_total = suma.reduce((a, b) => a + b);

                const div = document.getElementById('total-' + value)
                div.innerHTML = `<h5>$ ${suma_total}</h5>`

                saldosFinales.push(suma_total)
                const saldoTotal = saldosFinales.reduce((a, b) => a + b);
                const saldoFinal = document.getElementById('SaldoFinal')

                saldoFinal.innerHTML = ` <h4 style="width:100%; text-align:center;">Total efectivo: $ ${saldoTotal} </h4>`

            }

        }
    })
}
const calcularPagos = () => {

    const preciosArray = ['20', '10', '5', '1', '0.25', '0.10', '0.05', '0.01']
    cuadrar(preciosArray)

}

const btnLimpiar = () => {
    const preciosArray = ['20', '10', '5', '1', '0.25', '0.10', '0.05', '0.01']
    const btn = document.getElementById('btn-limpiar')
    btn.onclick = () => {
        preciosArray.map((elemento) => {
            const input = document.getElementById(elemento)
            input.value = ''
        })
        window.location.reload()
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
        calcularPagos()
        btnLimpiar()
        cerrarSesion()
    } else {
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = 'No puede ver este contenido'
    }
}
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

const calcularPagos = () => {

    const preciosArray = ['20', '10', '5', '1', '0.25', '0.10', '0.05', '0.01']

    const arrayPrecio = []

    preciosArray.map((elemento) => {
        const arrayTotal = []
        const suma = []
        const boton = document.getElementById('btn' + elemento)
        boton.onclick = () => {
            const value = boton.value
            if (elemento === '0.25' || elemento === '0.10' || elemento === '0.25' || elemento === '0.05' || elemento === '0.01') {
                const valorFloat = Number.parseFloat(value)
                const input = document.getElementById(elemento).value
                const numero = numberValidate(input)
                const empty = validacionEmpty(input)
                if (numero === 'false' && empty === 'false') {
                    Swal.fire('Rellenar el campo, y/o ingresar solo números')
                    return;
                }
                const inputEntero = Number.parseInt(input, 10)
                arrayTotal.push(inputEntero)
                suma.push(valorFloat * inputEntero)

                const sumaCantidad = arrayTotal.reduce((a, b) => a + b)
                const cantidad = document.getElementById(elemento + '-total')
                cantidad.innerHTML = `<h5>#${sumaCantidad}</h5>`
                const suma_total = suma.reduce((a, b) => a + b);
                const div = document.getElementById('total-' + value)
                div.innerHTML = `<h5>$ ${suma_total}</h5>`

                arrayPrecio.push(suma_total)
                const totalPrecio = arrayPrecio.reduce((a, b) => a + b);
                const finalPrecio = totalPrecio.toFixed(2)
                const saldoFinal = document.getElementById('SaldoFinal')
                saldoFinal.innerHTML = `<h4 style="width:100%; text-align:center;">Total efectivo: $ ${finalPrecio} </h4>`
            } else {

                const valorEntero = Number.parseInt(value, 10)
                const input = document.getElementById(elemento).value
                const inputEntero = Number.parseInt(input, 10)
                arrayTotal.push(inputEntero)
                suma.push(valorEntero * inputEntero)
                const sumaCantidad = arrayTotal.reduce((a, b) => a + b)
                const cantidad = document.getElementById(elemento + '-total')
                cantidad.innerHTML = `<h5>#${sumaCantidad}</h5>`
                const suma_total = suma.reduce((a, b) => a + b);

                const div = document.getElementById('total-' + value)
                div.innerHTML = `<h5>$ ${suma_total}</h5>`

                arrayPrecio.push(suma_total)
                const totalPrecio = arrayPrecio.reduce((a, b) => a + b);
                const saldoFinal = document.getElementById('SaldoFinal')
                saldoFinal.innerHTML = ` <h4 style="width:100%; text-align:center;">Total efectivo: $ ${totalPrecio} </h4>`

            }

        }
    })

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
        calcularPagos()
        btnLimpiar()
    } else {
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = 'No puede ver este contenido'
    }
}
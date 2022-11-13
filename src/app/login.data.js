const initTemplate = () => {

    const template = `
<div style="width:100%; margin-top:10%">

 <form id="formulario" style="width:400px; margin:0 auto; background-color:white; padding:30px; border-radius:3px;">

 <h3 style="text-align:center;">Login</h3>
 <img style="margin-left:40%; margin-top:1%; margin-bottom:2%;" src="user.png">
  <div class="mb-3">
    <label for="username" class="form-label">Ingrese username:</label>
    <input type="text" class="form-control" id="username" name="username">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Ingrese su contraseña:</label>
    <input type="password" class="form-control" id="password" name="password">
  </div>
  <button style="width:100%;" type="submit" class="btn btn-success">Iniciar Sesion</button>
 </form>
</div>
`;
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template
}

const validacionEmpty = (cadena) => {

    if (cadena.length === 0) {
        return "false"
    } else {
        return 'ok';
    }
}

const logeo = () => {

    const form = document.getElementById('formulario')
    form.onsubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(form)
        const dataObject = Object.fromEntries(data.entries())
        const Username = document.getElementById('username').value
        const password = document.getElementById('password').value

        const emptyUsername = validacionEmpty(Username)
        const emptyPassword = validacionEmpty(password)
        
        if (emptyUsername === 'false') {
            Swal.fire('Rellene el campo vacio porfavor!!!')
            return;
        } 
        
        if (emptyPassword === 'false') {
            Swal.fire('Rellene el campo vacio porfavor!!!')
            return;
        }

        const request = await fetch('/logeo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObject)
        })

        const token = await request.text();
        if(token === "Error"){
            Swal.fire('Usuario y/o contraseñas incorrectass')
            return;
        }else{
            localStorage.setItem('tokenSecreto', token)
            Swal.fire('Logeado correctamente.')
            form.reset();
            setTimeout( function() { window.location.href = "/administracion"; }, 3000 );
            
        }
        
    }
}

window.onload = () => {
    initTemplate()
    logeo()
}
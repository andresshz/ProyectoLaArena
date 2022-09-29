const initTemplate = () => {

    const template = `
<div style="width:100%; margin-top:10%">
 <form id="formulario" style="width:400px; margin:0 auto; background-color:white; padding:30px; border-radius:3px;">
  <div class="mb-3">
    <label for="username" class="form-label">Username:</label>
    <input type="text" class="form-control" id="username" name="username" required>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name="password">
  </div>
  <button style="width:auto;" type="submit" class="btn btn-success">Iniciar Sesion</button>
 </form>
</div>
`;
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template
}


const logeo = () => {

    const form = document.getElementById('formulario')
    form.onsubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(form)
        const dataObject = Object.fromEntries(data.entries())
        console.log(dataObject)
        const request = await fetch('/logeo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObject)
        })

        const token = await request.text();

        localStorage.setItem('tokenSecreto', token)
        form.reset();
    }
}

window.onload = () => {
    initTemplate()
    logeo()
}
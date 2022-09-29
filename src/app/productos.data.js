const Request = async (body) => {

    const request = await fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    console.log(body)
}

const addForm = () => {
    const form = document.getElementById('formulario')
    form.onsubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(form)
        const dataJson = Object.fromEntries(data.entries())
        Request(dataJson)
        form.reset()
    }
}

window.onload = () => {

    addForm()

}

const cargarElementos = () => {
  const compras = localStorage.getItem('tbody')
  const tbody = document.getElementById('tbody')
  tbody.innerHTML = compras
}
const crearPdf = () => {
  const btn = document.getElementById("btnPdf");
  btn.onclick = async () => {
    const doc = new jsPDF();
    let img = ''
    html2canvas(document.querySelector("#body")).then(canvas => {
      img = canvas.toDataURL('image/png');
      doc.addImage(img, 'JPEG', 20, 20);
      doc.output("dataurlnewwindow", { filename: "prueba.pdf" });
    });

  };
};

const checkLogin = () => localStorage.getItem('tokenSecreto')
window.onload = () => {
  const isLoged = checkLogin()
  if (isLoged) {
    cargarElementos()
    crearPdf()
  } else {
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = 'No puede ver este contenido'
  }
}
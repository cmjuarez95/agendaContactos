//elementos del DOM

const btnAgregarContacto = document.getElementById("btnAgregarContacto");
const modalFormularioContacto = new bootstrap.Modal(document.getElementById("contactoModal"))






//manejadores de eventos
btnAgregarContacto.addEventListener("click", ()=>{
    modalFormularioContacto.show();

})
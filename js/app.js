import Contacto from "./contacto.js";
//elementos del DOM

const btnAgregarContacto = document.getElementById("btnAgregarContacto");
const modalFormularioContacto = new bootstrap.Modal(document.getElementById("contactoModal"))
const formularioContacto = document.getElementById("formContacto")
const inputNombre = document.getElementById("nombre")
const inputApellido = document.getElementById("apellido")
const inputTelefono = document.getElementById("telefono")
const inputEmail = document.getElementById("email")
const inputDireccion = document.getElementById("direccion")
const inputNotas = document.getElementById("notas")
const inputImagen = document.getElementById("imagen")
const inputEmpresa = document.getElementById("empresa")
const inputPuestoTrabajo = document.getElementById("puestoTrabajo")
const agenda = [];



//funciones
const guardarLocalstorage = () => {    //guardar en memoria del navegador
    localStorage.setItem("agendaKey", JSON.stringify(agenda))

}

const crearContacto = () =>{
    console.log("aqui tengo q creear contacto")
    //todo agreagar validaciones
    //buscar los datos del formulario
    const contactoNuevo = new Contacto(inputNombre.value,inputApellido.value,inputTelefono.value,inputEmail.value,inputImagen.value,inputEmpresa.value,inputPuestoTrabajo.value,inputDireccion.value,inputNotas.value)
    agenda.push(contactoNuevo)
    console.log(contactoNuevo)
    //guardar la agenda en el localstorage
    guardarLocalstorage();

}






//manejadores de eventos
btnAgregarContacto.addEventListener("click", ()=>{
    modalFormularioContacto.show();

})

formularioContacto.addEventListener("submit", (e)=>{
    e.preventDefault()
    //aqui tengo que crear/editar contacto
    crearContacto()
})
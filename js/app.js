import Contacto from "./contacto.js";
import { validarCantidadCaracteres, validarEmail } from "./validaciones.js";
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
const tituloModal = document.getElementById("contactoModalLabel")
const tbody = document.getElementById("tablaContactosBody")
const mensaje = document.getElementById("mensajeSinContactos");

const tabla = document.querySelector(".table-responsive");
const sectionDetalles = document.getElementById("seccionDetalleContacto");
const seccionTablaContactos = document.getElementById("seccionTablaContactos");
// Elementos para el detalle del contacto
const detalleFoto = document.getElementById('detalleFoto');
const detalleNombreApellido = document.getElementById('detalleNombreApellido');
const detalleEmail = document.getElementById('detalleEmail');
const detalleEmailInfo = document.getElementById('detalleEmailInfo');
const detalleTelefono = document.getElementById('detalleTelefono');
const detalleCompany = document.getElementById('detalleCompany');
const detalleJobTitle = document.getElementById('detalleJobTitle');
const detalleLocation = document.getElementById('detalleLocation');
const detalleNotes = document.getElementById('detalleNotes');

const breadCrumbContactName = document.getElementById('breadCrumbContactName');
const breadCrumbContacts = document.getElementById('breadCrumbContacts');
const btnVolverTabla = document.getElementById('btnVolverTabla');

let estoyCreando = true;
let idContacto = null;
//Verificar si el localstorage tiene contactos

const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];  // aqui se leen los datos salvo que sea null



//funciones
const guardarLocalstorage = () => {    //guardar en memoria del navegador
    localStorage.setItem("agendaKey", JSON.stringify(agenda)) 

}

const crearContacto = () =>{
    console.log("aqui tengo q creear contacto")
    //todo agreagar validaciones
    if(validacion()){
          let imagenURL = inputImagen.value;

          // Verificar si el campo está vacío
          if (imagenURL.trim() === "") {
            imagenURL = "https://static.vecteezy.com/system/resources/previews/047/305/447/non_2x/default-avatar-profile-icon-with-long-shadow-simple-user-sign-symbol-vector.jpg"; // o tu ruta local
          }
        //buscar los datos del formulario
        const contactoNuevo = new Contacto(inputNombre.value,inputApellido.value,inputTelefono.value,inputEmail.value,imagenURL,inputEmpresa.value,inputPuestoTrabajo.value,inputDireccion.value,inputNotas.value)
        agenda.push(contactoNuevo)
        console.log(contactoNuevo)
        //guardar la agenda en el localstorage
        guardarLocalstorage();
        Swal.fire({
            title: 'Contacto Creado con Éxito',
            text: `El contacto ${inputNombre.value} fue creado correctamente`,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        
    limpiarFormulario();

    dibujarFila(contactoNuevo, agenda.length)
    }else{
      console.log("hay errores en la validacion")
    }


     


    //verificar si tengo contactos para cargar
    if(agenda.length !== 0){

        mensaje.textContent = ""; // limpiar mensaje si hay contactos

    }else{
        //to do:dibujar un parrafo que diga si no tenemops contactos

        mensaje.textContent = "No hay contactos cargados.";
    }

}

function limpiarFormulario() {
    formularioContacto.reset()
}


const cargarContactos = ()=>{



    tbody.innerHTML = "";
    //verificar si tengo contactos para cargar
    if(agenda.length !== 0){

        mensaje.textContent = ""; // limpiar mensaje si hay contactos
        agenda.map((itemContacto, indice)=>dibujarFila(itemContacto, indice+1))

    }else{
        //to do:dibujar un parrafo que diga si no tenemops contactos

        mensaje.textContent = "No hay contactos cargados.";
    }
}


const dibujarFila = (itemContacto, fila)=>{
    tbody.innerHTML +=` 
    <tr>
                <th scope="row">${fila}</th>
              
                  <td>${itemContacto.nombre}</td>
                <td>${itemContacto.apellido}</td>
                <td>${itemContacto.telefono}</td>
                <td>
                  <img
                    src="${itemContacto.imagen}"
                    alt="${itemContacto.nombre}"
                    class="img-thumbnail img-table"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-info btn-sm me-2 btn-ver-detalle"
                    onclick="verDetalleContacto('${itemContacto.id}')"
                  >
                    <i class="bi bi-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning btn-sm me-2 btn-editar"
                    onclick = "prepararContacto('${itemContacto.id}')" 
                    data-bs-target="#contactoModal"
                    data-bs-toggle="modal"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button type="button" class="btn btn-danger btn-sm btn-borrar" onclick = "borrarContacto('${itemContacto.id}')">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
    `
}

//manejadores de eventos
btnAgregarContacto.addEventListener("click", ()=>{
  limpiarFormulario();
  estoyCreando=true;
  tituloModal.textContent= "Agregar contacto";
  modalFormularioContacto.show();
})

formularioContacto.addEventListener("submit", (e)=>{
    e.preventDefault()
    //aqui tengo que crear/editar contacto
    if (estoyCreando) {
      crearContacto();
    }else{
      editarContacto();
    }

    
});

window.borrarContacto = (id) =>{      //Debo usar window para crear la funcion si no no puedo acceder al app desde el html usando innerHTML en dibujarFila
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Borrar",
  cancelButtonText:"Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        //Aqui agrego la logica para borrar
        const indiceContacto = agenda.findIndex((contacto)=> contacto.id===id)
        //con splice borramos el elemento de determinada posicion del array

        agenda.splice(indiceContacto, 1)

        //Actualizar el localStorage
        guardarLocalstorage()

        if(agenda.length !== 0){

        mensaje.textContent = ""; // limpiar mensaje si hay contactos

       }else{
        //to do:dibujar un parrafo que diga si no tenemops contactos

        mensaje.textContent = "No hay contactos cargados.";
       }
        //Actualizar Tabla
       // tbody.children[indiceContacto].remove()
       cargarContactos();
        //actualizar el numero de filas del array
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  //console.log("desde borarContacto", id)
  
  
}

window.prepararContacto= (id) =>{
  //Conseguir datos del contacto
  const contactoBuscado = agenda.find((contacto)=> contacto.id ===id)

  //mostrar los datos del contacto en el form
  inputNombre.value = contactoBuscado.nombre;
  inputApellido.value = contactoBuscado.apellido;
  inputEmail.value = contactoBuscado.email;
  inputDireccion.value = contactoBuscado.direccion;
  inputEmpresa.value = contactoBuscado.empresa;
  inputTelefono.value = contactoBuscado.telefono;
  inputNotas.value = contactoBuscado.notas;
  inputPuestoTrabajo.value = contactoBuscado.puestoTrabajo;
  idContacto=id;
  //cambio la variable que controla crear/editar
  estoyCreando=false;

  tituloModal.textContent="Editar contacto";
  //Abrir modal
  modalFormularioContacto.show()


}

window.verDetalleContacto = (id) => {
  const contactoBuscado = agenda.find((contacto) => contacto.id === id);
  seccionTablaContactos.classList.add("d-none");
  sectionDetalles.classList.remove("d-none");
}

const editarContacto = () =>{
  console.log("desde editar contacto")
  //buscar en que posicion del array está el contacto
  const indiceContacto= agenda.findIndex((contacto)=>contacto.id===idContacto)
  //modificar el contacto
  agenda[indiceContacto].nombre=inputNombre.value;
  agenda[indiceContacto].apellido=inputApellido.value;
  agenda[indiceContacto].telefono=inputTelefono.value;
  agenda[indiceContacto].email=inputEmail.value;
  agenda[indiceContacto].direccion=inputDireccion.value;
  agenda[indiceContacto].puestoTrabajo=inputPuestoTrabajo.value;
  agenda[indiceContacto].empresa=inputEmpresa.value;
  agenda[indiceContacto].notas=inputNotas.value;

  //reviso si hay imagen, si no pongo una por defecto
  let imagenURL = inputImagen.value;
  if (imagenURL.trim() === "") {
    imagenURL = "https://static.vecteezy.com/system/resources/previews/047/305/447/non_2x/default-avatar-profile-icon-with-long-shadow-simple-user-sign-symbol-vector.jpg";
  }

  agenda[indiceContacto].imagen = imagenURL;
  //Actualizar el localStorage
  guardarLocalstorage()
  cargarContactos()
  //to do: Actualizar fila de la tabla
  //dibujarFila(agenda[indiceContacto],indiceContacto+1)
  //Cerrar Venatana modal
  modalFormularioContacto.hide();

  Swal.fire({
  position: "center",
  icon: "success",
  title: "El contacto fue editado con éxito",
  showConfirmButton: false,
  timer: 1500
  });

  //to do: mostrar una ventana de sweet alert para indicar que el contacto fue creado
}

const validacion = () => {
  let datosvalidos = true
  if (!validarCantidadCaracteres(inputNombre,2,50)){
    datosvalidos=false
  }
  if (!validarCantidadCaracteres(inputApellido,2,50)){
    datosvalidos=false
  }
  if (!validarEmail(inputEmail)) {
    datosvalidos=false;
  }

  return datosvalidos
}

const mostrarTablaContactos = () => {
    seccionTablaContactos.classList.remove('d-none');
    sectionDetalles.classList.add('d-none');
};

btnVolverTabla.addEventListener('click', mostrarTablaContactos);
breadCrumbContacts.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarTablaContactos();
});

cargarContactos();
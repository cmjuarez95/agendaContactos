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

const tbody = document.getElementById("tablaContactosBody")

let estoyCreando = true;
//Verificar si el localstorage tiene contactos

const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];  // aqui se leen los datos salvo que sea null



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
    Swal.fire({
        title: 'Contacto Creado con Éxito',
        text: `El contacto ${inputNombre.value} fue creado correctamente`,
        icon: 'success',
        confirmButtonText: 'Ok'
    })


    limpiarFormulario();

    dibujarFila(contactoNuevo, agenda.length)

}

function limpiarFormulario() {
    formularioContacto.reset()
}


const cargarContactos = ()=>{
    //verificar sin tengo contactos para cargar
    if(agenda.length !== 0){
       
        agenda.map((itemContacto, indice)=>dibujarFila(itemContacto, indice+1))

    }else{
        //to do:dibujar un parrafo que diga si no tenemops contactos
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


        //Actualizar Tabla
        tbody.children[indiceContacto].remove()
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

  //cambio la variable que controla crear/editar
  estoyCreando=false;


  //Abrir modal
  modalFormularioContacto.show()


}

const editarContacto = () =>{
  console.log("desde editar contacto")
}

cargarContactos();
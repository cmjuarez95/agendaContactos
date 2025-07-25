export default class Contacto {   //el export es para poder usarla en app.js
   #id;
   #nombre;
   #apellido;
   #telefono;
   #email;
   #imagen;
   #empresa;
   #puestoTrabajo;
   #direccion;
   #notas; 
   constructor(nombre, apellido, telefono, email, imagen, empresa, puestoTrabajo, direccion, notas) {
    this.#id = crypto.randomUUID();  //genera identificador unico
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#telefono = telefono;
    this.#email = email;
    this.#imagen = imagen;
    this.#empresa = empresa;
    this.#puestoTrabajo = puestoTrabajo;
    this.#direccion = direccion;
    this.#notas = notas;
   }

   // Getters
   get id() {
      return this.#id;
   }

   get nombre() {
      return this.#nombre;
   }

   get apellido() {
      return this.#apellido;
   }

   get telefono() {
      return this.#telefono;
   }

   get email() {
      return this.#email;
   }

   get imagen() {
      return this.#imagen;
   }

   get empresa() {
      return this.#empresa;
   }

   get puestoTrabajo() {
      return this.#puestoTrabajo;
   }

   get direccion() {
      return this.#direccion;
   }

   get notas() {
      return this.#notas;
   }

   // Setters
   set id(nuevoId) {
      this.#id = nuevoId;
   }

   set nombre(nuevoNombre) {
      this.#nombre = nuevoNombre;
   }

   set apellido(nuevoApellido) {
      this.#apellido = nuevoApellido;
   }

   set telefono(nuevoTelefono) {
      this.#telefono = nuevoTelefono;
   }

   set email(nuevoEmail) {
      this.#email = nuevoEmail;
   }

   set imagen(nuevaImagen) {
      this.#imagen = nuevaImagen;
   }

   set empresa(nuevaEmpresa) {
      this.#empresa = nuevaEmpresa;
   }

   set puestoTrabajo(nuevoPuestoTrabajo) {
      this.#puestoTrabajo = nuevoPuestoTrabajo;
   }

   set direccion(nuevaDireccion) {
      this.#direccion = nuevaDireccion;
   }

   set notas(nuevasNotas) {
      this.#notas = nuevasNotas;
   }

   //metodo para almacenar el objeto en el localstorage/sessionstorage si no mre crea un objeto vacio
    toJSON(){
    return{
        id: this.id,
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        email: this.email,
        imagen: this.imagen,
        empresa: this.empresa,
        direccion: this.direccion,
        puestoTrabajo: this.puestoTrabajo,
        notas: this.notas,

    }
    }
}
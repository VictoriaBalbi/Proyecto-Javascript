// VARIABLES
// Creo usuarios ya registrados → ARRAY DE OBJETOS
const usuarios = [
    {nombre: "Vicki", contraseña: "1234"},
    {nombre: "Pepe", contraseña: "5678"},
    {nombre: "Coder", contraseña: "91011"}
]


// si el local storage es nulo es porque es la primera vez que el usuario entra a la pag → debo cargar mis usuarios predeterminados 
if(localStorage.getItem("usuarios")==null) localStorage.setItem("usuarios",JSON.stringify (usuarios))

// capturo el formulario, el usuario 
const formulario = document.querySelector(".form_ingreso");
const usuario = document.querySelector(".usuario");
const contraseña = document.querySelector(".contraseña");
// evento submit  → The submit event fires when the user clicks a submit button
if(formulario){
    formulario.addEventListener("submit", validarUsuario);
}



function validarUsuario(e) {
  e.preventDefault();
  // me bajo el array de usuarios del local storage
  const usuarios =JSON.parse( localStorage.getItem("usuarios"))
  // si ingreso algo chequeo que este registrado
  

  console.log(usuarios)
  if (usuario.value!== "" && contraseña.value!==""){
    console.log(usuario.value);
    usuarios.forEach((user) => {
        if (user.nombre == usuario.value && user.contraseña == contraseña.value) 
         {             
            // si esta registrado ingresa al sistema
           location='../search.html';
         }
    });
    
  }
    // si llego aca es porque no ingreso nada o porque no esta registrado
    Toastify({

      text: "No ingresó un usuario/contraseña valido",
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      style: {
        background: 'linear-gradient(to right, #880808, #FF0000)'
      }

      
    }).showToast();
    
    // paro el cursor en el input
    usuario.value="";
    contraseña.value="";
    document.querySelector(".usuario").focus();
  
  
}


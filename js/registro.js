
const formulario_registro= document.querySelector(".form_registro");
const usuario_nuevo = document.querySelector(".usuario_nuevo");
const contraseña_nueva = document.querySelector(".contraseña_nueva");
const contraseña2_nueva = document.querySelector(".contraseña_nueva2");

if(formulario_registro){
    formulario_registro.addEventListener("submit", registrarse);
}

// registro de usuario nuevo
function registrarse (e){
    
    // me bajo el array de usuarios del local storage
    const usuarios =JSON.parse( localStorage.getItem("usuarios"))
    
    let usuario_existente=false;

    

    if (usuario_nuevo.value!=""){
        usuarios.forEach((user) => {
            if (user.nombre == usuario_nuevo.value) 
             { alert("Ya existe ese usuario")
                usuario_nuevo.value="";
                contraseña_nueva.value="";
                contraseña2_nueva.value="";
                document.querySelector(".usuario_nuevo").focus();

                // si ya existe el usuario → pongo usuario_existente en true
                usuario_existente=true;
                return // salgo del foreach
             }
        });
        if (usuario_existente==true){
            //si el usuario ya existe salgo de la funcion
            return
        }
        //si sale del for es porque el usuario es valido
        if (contraseña_nueva.value==contraseña2_nueva.value)
        {   console.log(usuario_nuevo.value)
            alert("Registrado")
            usuarios.push( {nombre: usuario_nuevo.value,contraseña: contraseña_nueva.value} );
            //lo paso a JSON
            const usuariosJSON = JSON.stringify(usuarios);
            //lo subo al local storage
            localStorage.setItem("usuarios",usuariosJSON);
            // vuelvo a la pagina inicial para ingresar
            e.preventDefault(); //para evitar que se refresque la pagina y perder los datos pusheados
            location = 'index.html'
        }
    }   
  

}
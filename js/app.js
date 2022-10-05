// creo el objeto 
class Cancion {
    constructor (titulo,artista, genero)
    {
        this.titulo = titulo;
        this.artista =artista;
        this.genero = genero;
    }

    // para mostrar la info de la cancion en los menues
    mostrarInfoCancion(){
        return `${this.titulo} - ${this.artista}`;
    }
}

// creo cada cancion
const cancionPop1 = new Cancion("As it was", "Harry Styles", "Pop");
const cancionPop2 = new Cancion("Bam Bam", "Camila Cabello", "Pop");
const cancionPop3 = new Cancion("Angels like you", "Miley Cyrus", "Pop");

const cancionRock1 = new Cancion("Tan solo", "Los Piojos", "Rock");
const cancionRock2 = new Cancion("El favor", "Las Pastillas del Abuelo", "Rock");
const cancionRock3 = new Cancion("Tu encanto", "Conociendo Rusia", "Rock");

// meto los objetos creados en 1 array
const canciones = [cancionPop1, cancionPop2, cancionPop3, cancionRock1, cancionRock2, cancionRock3]; 
let cancionesrock = canciones.filter((cancion)=>cancion.genero=="Rock");
let cancionespop= canciones.filter((cancion)=>cancion.genero=="Pop");
console.log(cancionespop)
console.log(cancionesrock)
document.getElementById('cancion-rock1').innerHTML = `${cancionesrock[0].mostrarInfoCancion()}`  ;
document.getElementById('cancion-rock2').innerHTML = `${cancionesrock[1].mostrarInfoCancion()}`  ;
document.getElementById('cancion-rock3').innerHTML = `${cancionesrock[2].mostrarInfoCancion()}`  ;

//NO ESTOY PUDIENDO HACER QUE FUNCIONEN EN SIMULTANEO LOS INNERHTML 

//document.getElementById('cancion-pop1').innerHTML = `${cancionespop[0].mostrarInfoCancion()}`  ;
//document.getElementById('cancion-pop2').innerHTML = `${cancionespop[1].mostrarInfoCancion()}`  ;
//document.getElementById('cancion-pop3').innerHTML = `${cancionespop[2].mostrarInfoCancion()}`  ;
//----------------------------------------------------------------

//const form_canciones_rock= document.querySelector(".canciones-rock");
//const form_canciones_pop= document.querySelector(".canciones-pop");
//form_canciones_rock.addEventListener("submit", xGenero);
//form_canciones_pop.addEventListener("submit", xGenero);

// devuelve un array de botones con ese nombre
const botones_escuchar =document.querySelectorAll(".boton_escuchar");
// le asigno la misma funcion a cada boton del array
for (let boton of botones_escuchar){
    boton.addEventListener("click",escuchar)
}
function escuchar (e) {
    e.preventDefault();
  /*  if(form_canciones_pop!==null){
        valorActivo = document.querySelector('input[name=listGroupRadioPOP]:checked').value
        alert(`Reproduciendo: ${cancionespop[valorActivo].mostrarInfoCancion()}`)
    }
*/
    // if (form_canciones_rock!==null){
    valorActivo = document.querySelector('input[name=listGroupRadioROCK]:checked').value
    alert(`Reproduciendo: ${cancionesrock[valorActivo].mostrarInfoCancion()}`)
    // }
}

// SUMAR UNA CANCION A LA PLAYLIST
//creo el array vacio
const playlist = [];

// devuelve un array de botones con ese nombre
const botones_playlist =document.querySelectorAll(".boton_playlist");
// le asigno la misma funcion a cada boton del array
for (let boton of botones_playlist){
    boton.addEventListener("click",sumarPlaylist)
}

// TO DO: DIFERENCIAR LOS BOTONES PARA QUE NO HAGAN NADA SI EL CHECK ESTA EN OTRO INPUT

function sumarPlaylist(e) {
    e.preventDefault();
    valorActivo = document.querySelector('input[name=listGroupRadioROCK]:checked').value
    

    let repetida = false;
    
    playlist.forEach((cancion) => {
        if (cancion.titulo == cancionesrock[valorActivo].titulo) 
         {  repetida=true;
            return // salgo del foreach
         }
    });

    
    if (repetida == false){
        playlist.push(cancionesrock[valorActivo]);
       
        Swal.fire({
            title: 'La cancion se agrego a la playlist',
            text: 'Continuar?',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
    }
    else {
        Swal.fire({
            title: 'La cancion ya se encuentra en la playlist',
            text: 'Continuar?',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
    
   
    console.log(playlist)
    
}



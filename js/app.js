//creo el array vacio para la playlist
const playlist = [];
const contenedor_cancionesRock = document.querySelector(".list-group-rock");
const contenedor_cancionesPop = document.querySelector(".list-group-pop");
const contenedor_cancionesIndie = document.querySelector(".list-group-indie");
const audio = document.querySelector("#audio");
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
const boton_escuchar = document.querySelector("#play");
const boton_anterior= document.querySelector("#prev");
const boton_sig = document.querySelector("#next");



const cargarDatosRock = async () =>{
    canciones = await fetchCanciones();
    canciones = canciones.filter((cancion)=> cancion.genero== "Rock")

    mostrarCancionesDom(canciones,contenedor_cancionesRock);
    agregarEventos();
}
const cargarDatosPop = async () =>{
    canciones = await fetchCanciones();
    canciones = canciones.filter((cancion)=> cancion.genero== "Pop")
    mostrarCancionesDom(canciones,contenedor_cancionesPop);
    agregarEventos();
}
const cargarDatosIndie = async () =>{
    canciones = await fetchCanciones();
    canciones = canciones.filter((cancion)=> cancion.genero== "Indie")
    mostrarCancionesDom(canciones,contenedor_cancionesIndie);
    agregarEventos();
}

const fetchCanciones = async() => {
    const res = await fetch("../data.json")
    let data = await res.json()
    return data;
}

function mostrarCancionesDom(canciones, contenedor_canciones){
    canciones.forEach((cancion,indice)=>{

        const li = document.createElement("li");
        li.innerHTML = `
       
            <div class="canciones">
                <div class="item">
                    <input class="form-check-input me-1 seleccionado" type="radio" name="listGroupRadio" value=${indice} id="input ${indice}">
                    <label id="cancion-rock1" class="form-check-label" for="firstRadio">${cancion.titulo}, ${cancion.artista}</label>
                </div>
                
            </div> 
         
        `
        contenedor_canciones.append(li)

      
    })
}

function agregarEventos(){
    
   
    // escuchar clicks
    
    boton_escuchar.addEventListener("click", () => {
        if (audio.paused) {
            escuchar()   
        } else {
            pausar()
        }
    }, false)

    
    boton_anterior.addEventListener("click",cancionAnterior)

    
    boton_sig.addEventListener("click",cancionSig)

    
    const boton_playlist= document.querySelector(".boton_playlist");
    
    boton_playlist.addEventListener("click",sumarPlaylist,false)
    

   
}

function escuchar () {
    
    let valorActivo = document.querySelector('input[name=listGroupRadio]:checked').value
    audio.src = `./musica/` + canciones[valorActivo].ruta;
    audio.play();
    playApausa()
    
    
    
}

function pausar () {
   
    audio.pause();
    playApausa()
    
}

function cancionSig(){
    valorActivo = document.querySelector('input[name=listGroupRadio]:checked').value
    proxCancion = ++valorActivo;
    const n = canciones.length ; 
    if (valorActivo != n)
    {  
        audio.src = `./musica/` + canciones[proxCancion].ruta;
        audio.play();
        // al pasar de cancion quiero destildar la actual y tildar la siguiente
        document.querySelector('input[name=listGroupRadio]:checked').checked=false;
        document.getElementById('input '+ proxCancion).checked=true;
       
    }
    // si esta en la ultima cancion → que reproduzca la primera
    if (valorActivo==n)
    {
        audio.src = `./musica/` + canciones[0].ruta;
        audio.play();

        // al pasar de cancion quiero destildar la actual y tildar la siguiente
        document.querySelector('input[name=listGroupRadio]:checked').checked=false;
        document.getElementById('input '+ 0).checked=true;
    }
}

function cancionAnterior(){
    valorActivo = document.querySelector('input[name=listGroupRadio]:checked').value
    console.log(valorActivo)
    cancionPrevia = --valorActivo;
    const n = canciones.length;
    console.log(n)
    if (valorActivo >= 0)
    {
        audio.src = `./musica/` + canciones[cancionPrevia].ruta;
        audio.play();
        // al pasar de cancion quiero destildar la actual y tildar la anterior
        document.querySelector('input[name=listGroupRadio]:checked').checked=false;
        document.getElementById('input '+ cancionPrevia).checked=true;
    }
    // si esta en la primer cancion → que reproduzca la ultima
    else  {
        audio.src = `./musica/` + canciones[n-1].ruta;
        audio.play();
        // al pasar de cancion quiero destildar la actual y tildar la anterior
        document.querySelector('input[name=listGroupRadio]:checked').checked=false;
        document.getElementById('input '+ (n-1)).checked=true;
        
    }
}



// Cambiar de play a paused
function playApausa() {
    if (audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }
}



// TO DO: DIFERENCIAR LOS BOTONES PARA QUE NO HAGAN NADA SI EL CHECK ESTA EN OTRO INPUT

function sumarPlaylist(e) {
    e.preventDefault();
    let valorActivo = document.querySelector('input[name=listGroupRadio]:checked').value
    

    let repetida = false;
    
    playlist.forEach((cancion) => {
        if (cancion.titulo == canciones[valorActivo].titulo) 
        {  repetida=true;
            return // salgo del foreach
        }
    });

    
    if (repetida == false){
        playlist.push(canciones[valorActivo]);
    
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

// le agrego el evento  TIMEUPDATE al audio para mostrar el avance de la cancion
audio.addEventListener("timeupdate",actualizarBarraProgreso)
// mostrar avance de la cancion 
function actualizarBarraProgreso(evento){ 
    // dentro del evento de timeupdate me van a interesar dos atributos que estan dentro del srcElement→ current time y duration
   const duracion= evento.srcElement.duration;
   const tiempoActual= evento.srcElement.currentTime;
   
   // calculo el porcentaje de cancion que va
   const porcentaje = tiempoActual*100/duracion;
   
   // reflejo el porcentaje en el css
   progress.style.width= porcentaje + "%";
}

// quiero que si le doy click en la barra me actualice la cancion
progressContainer.addEventListener("click", clickBarra)

function clickBarra(event) {
    // this → refiere a la barra
    // saco el offsetWidth de la barra → ancho total
    const anchoTotal = this.offsetWidth
    // saco en que parte del ancho de la barra hago click → offsetX
    const clickAvance = event.offsetX
    // saco el valor en tiempo de la posicion de la barra en la cual clickee 
    const actual = (clickAvance / anchoTotal) * audio.duration
    // reproduzco la cancion en ese porcentaje que clickee
    audio.currentTime = actual
}

// si termina la cancion quiero que reproduzca la siguiente 
// existe un evento de audio que indica cuando termina  → ended
audio.addEventListener("ended", cancionSig)

// mostrar secciones al clickear en el anchor
document.querySelector("#boton_a_rock").addEventListener("click", function () {
    document.querySelector(".contenido").style.display = "none";
    document.querySelector("#rock").style.display = "flex";
    document.querySelector(".cancionesXgenero").style.display = "block";
    document.querySelector(".controles").style.display = "flex";
    document.querySelector("#progress-container").style.display = "flex";
    cargarDatosRock()

  }); 

document.querySelector("#boton_a_pop").addEventListener("click", function () {
    document.querySelector(".contenido").style.display = "none";
    document.querySelector(".cancionesXgenero").style.display = "block";
    document.querySelector("#pop").style.display = "flex";
    document.querySelector(".controles").style.display = "flex";
    document.querySelector("#progress-container").style.display = "flex";
    cargarDatosPop()
}); 
document.querySelector("#boton_a_indie").addEventListener("click", function () {
    document.querySelector(".contenido").style.display = "none";
    document.querySelector(".cancionesXgenero").style.display = "block";
    document.querySelector("#indie").style.display = "flex";
    document.querySelector(".controles").style.display = "flex";
    document.querySelector("#progress-container").style.display = "flex";
    cargarDatosIndie()
}); 


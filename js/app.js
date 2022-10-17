//creo el array vacio para la playlist
const playlist = [];
const contenedor_canciones = document.querySelector(".list-group");
const audio = document.querySelector("#audio");

const cargarDatos = async () =>{
    canciones = await fetchCanciones();
    mostrarCancionesDom(canciones);
    agregarEventos();
}

const fetchCanciones = async() => {
    const res = await fetch("../data.json")
    let data = await res.json()
    data = data.filter((cancion)=> cancion.genero== "Pop")
    return data;
}

function mostrarCancionesDom(canciones){
    canciones.forEach((cancion,indice)=>{
        const li = document.createElement("li");
        li.innerHTML = `
       
                     
            <div class="item">
                <input class="form-check-input me-1" type="radio" name="listGroupRadio" value=${indice} id="thirdRadio">
                <label id="cancion-rock1" class="form-check-label" for="firstRadio">${cancion.titulo}, ${cancion.artista}</label>
            </div>
            <div class="botones-canciones">
                <button type="submit" class="btn btn-primary boton_escuchar" >Escuchar</button>
                <button type="submit" class="btn btn-primary boton_playlist">+</button>
            </div>
         
         
        `
        contenedor_canciones.append(li)

      
    })
}

function agregarEventos(){
    // escuchar clicks
    const botones_escuchar = document.querySelectorAll(".boton_escuchar");
     
    for (let boton of botones_escuchar){
        boton.addEventListener("click",escuchar,false)
    }

    const botones_playlist= document.querySelectorAll(".boton_playlist");
      
    for (let boton of botones_playlist){
        boton.addEventListener("click",sumarPlaylist,false)
    }

   
}

function escuchar (e) {
    e.preventDefault();
     // if (form_canciones_rock!==null){
    valorActivo = document.querySelector('input[name=listGroupRadio]:checked').value
    console.log(valorActivo)
    audio.src = `./musica/pop/` +canciones[valorActivo].ruta;
    audio.play();
    //alert(`Reproduciendo: ${canciones[valorActivo].titulo}, ${canciones[valorActivo].artista}`)
    // }
}

// TO DO: DIFERENCIAR LOS BOTONES PARA QUE NO HAGAN NADA SI EL CHECK ESTA EN OTRO INPUT

function sumarPlaylist(e) {
    e.preventDefault();
    valorActivo = document.querySelector('input[name=listGroupRadio]:checked').value
    

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


cargarDatos()
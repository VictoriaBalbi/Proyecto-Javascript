//creo el array vacio para la playlist
const playlist = [];

const contenedor_canciones = document.querySelector(".list-group");
const infoCanciones = async() => {
    const res = await fetch("../data.json")
    let data = await res.json()
    data = data.filter((cancion)=> cancion.genero== "Rock")

    data.forEach((cancion,indice)=>{
        const li = document.createElement("li");
        li.innerHTML = `
       
                     
            <div class="item">
                <input class="form-check-input me-1" type="radio" name="listGroupRadioROCK" value=${indice} id="thirdRadio">
                <label id="cancion-rock1" class="form-check-label" for="firstRadio">${cancion.titulo}, ${cancion.artista}</label>
            </div>
            <div class="botones-canciones">
                <button type="submit" class="btn btn-primary boton_escuchar" >Escuchar</button>
                <button type="submit" class="btn btn-primary boton_playlist">+</button>
            </div>
         
         
        `
        contenedor_canciones.append(li)
    })

    // devuelve un array de botones con ese nombre
    const botones_escuchar =document.querySelectorAll(".boton_escuchar");
    // le asigno la misma funcion a cada boton del array
    for (let boton of botones_escuchar){
        boton.addEventListener("click",escuchar)
    }
    function escuchar (e) {
        e.preventDefault();
         // if (form_canciones_rock!==null){
        valorActivo = document.querySelector('input[name=listGroupRadioROCK]:checked').value
        console.log(valorActivo)
        alert(`Reproduciendo: ${data[valorActivo].titulo}, ${data[valorActivo].artista}`)
        // }
    }

    // SUMAR UNA CANCION A LA PLAYLIST


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
            if (cancion.titulo == data[valorActivo].titulo) 
            {  repetida=true;
                return // salgo del foreach
            }
        });

        
        if (repetida == false){
            playlist.push(data[valorActivo]);
        
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
}

infoCanciones()


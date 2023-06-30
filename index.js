
//Se capturan los elementos de html para trabajar en js
const cards = document.getElementById("cards")
const divPuntaje = document.getElementById("puntuacion")

//funcion para guardar en el LocalStorage
function lockStorage (clave, valor){
    localStorage.setItem(clave, valor)
}


const pelicula1 = new Peliculas(1, "Boogeyman", "Rob Savage", "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/WMG2F7CNTVAKXGKHRVTSRKUT7M.jpg");
const pelicula2 = new Peliculas(2, "La Sirenita", "Rob Marshall", "https://es.web.img3.acsta.net/pictures/23/03/14/15/12/2449709.jpg");
const pelicula3 = new Peliculas(3, "Elementos", "Peter Sohn", "https://i.blogs.es/44baa6/elemental_poster/450_1000.jpeg");
const pelicula4 = new Peliculas(4, "Flash", "Andy Muschietti", "https://pics.filmaffinity.com/Flash-205686824-large.jpg");
const pelicula5 = new Peliculas(5, "Spiderman a traves del Spiderverso", "Joaquim Dos Santos", "https://m.media-amazon.com/images/M/MV5BNzQ1ODUzYjktMzRiMS00ODNiLWI4NzQtOTRiN2VlNTNmODFjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg");

//Se almacenan las peliculas en un array
const PELICULA = [pelicula1, pelicula2, pelicula3, pelicula4, pelicula5]

//Utilizo la llamada fetch para trabajar con los datos del archivo json
fetch('./peliculas.json')
.then((res)=> res.json())
.then((data) => {
    pelicula1.trama = data[0].trama
    pelicula1.reparto = data[0].reparto
    pelicula2.trama = data[1].trama
    pelicula2.reparto = data[1].reparto
    pelicula3.trama = data[2].trama
    pelicula3.reparto = data[2].reparto
    pelicula4.trama = data[3].trama
    pelicula4.reparto = data[3].reparto
    pelicula5.trama = data[4].trama
    pelicula5.reparto = data[4].reparto

})


//funcion para crear cards a partir del array 
function renderizarPeliculas(estrenos){
   estrenos.forEach((pelicula => {
    let divCard = document.createElement("div")
    divCard.id = pelicula.id
    divCard.innerHTML= `
    <div class="card" style="width: 18rem; ">
      <img src="${pelicula.img}" class="card-img-top" alt="poster de la pelicula ${pelicula.titulo}">
      <div class="card-body">
        <h5 class="card-title">${pelicula.titulo}</h5>
        <p class="card-text">Dirigida por ${pelicula.director}</p>
        <input type="button" class="btn btn-secondary" value= "calificar" onclick="calificar('${pelicula.id}')">
        <button class="btn btn-secondary" onclick="verInformacion(${pelicula.id})"> Ver información </button>
      </div>
   </div>
    `
    
    cards.append(divCard)
})) 
}

//funcion que califica las peliculas
function calificar(idPelicula){
    let calificarPelicula = peliculasLS.find(e => e.id == idPelicula)
    if (calificarPelicula.puntajeFinal > 0){
      Swal.fire({
        icon: "question",
        text: "Parece que ya calificaste esta pelicula",
        showConfirmButton: true,
        timer: 2500
      });
      return;
    }
    cards.style.display="none";
    divPuntaje.innerHTML = `
       <div class="cardPuntaje">
        <div class="card" style="width: 18rem; ">
      <img src="${calificarPelicula.img}" class="card-img-top" alt="poster de la pelicula ${calificarPelicula.titulo}">
      <div class="card-body">
        <h5 class="card-title">${calificarPelicula.titulo}</h5>
        <p class="card-text">Dirigida por ${calificarPelicula.director}</p>
        <input type="button" class="btn btn-secondary" value= "calificar" onclick="calificar('${calificarPelicula.id}')">
        <button class="btn btn-secondary" onclick="verInformacion(${calificarPelicula.id})"> Ver información </button>
      </div>
   </div>
        <form id="puntajeUser"> 
            <h6> Califica los distintos aspectos de la pelicula del 1 al 10 </h6>
            <p> Guion </p>
            <input type="number" id="puntaje">
            <p> Actuacion </p>
            <input type="number" id="puntaje2">
            <p> Fotografia </p>
            <input type="number" id="puntaje3">
            <input type="submit" value="enviar">
            <button class="btn btn-secondary" id="fichabtn" onclick="volverEstrenos()"> Ver Estrenos </button>
        </form>
       </div>
    `


    document.getElementById("puntajeUser").addEventListener("submit", (e)=>{
        e.preventDefault()
        let infoEvent = e.target
        let puntuacion = infoEvent.querySelector('#puntaje')
        let puntuacion2 = infoEvent.querySelector('#puntaje2')
        let puntuacion3 = infoEvent.querySelector('#puntaje3')
        puntuacion= puntuacion.value
        puntuacion2 = puntuacion2.value
        puntuacion3= puntuacion3.value
        if (puntuacion > 10 || puntuacion2 > 10 || puntuacion3 > 10) {
          Swal.fire({
          icon: "error",
          title: "Error",
          text: "La puntuación debe ser del 1 al 10",
          showConfirmButton: true,
          timer: 2500
      })
      return;
    }else if (!puntuacion || !puntuacion2 || !puntuacion3) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes ingresar una puntuación para cada aspecto",
        showConfirmButton: true,
        timer: 2500
      });
      return;
    }

        calificarPelicula.puntaje.push(parseInt(puntuacion),parseInt(puntuacion2), parseInt (puntuacion3))
        puntajeFinal (calificarPelicula, divPuntaje)
        lockStorage ("peliculas", JSON.stringify(peliculasLS))
    })

    function puntajeFinal(peliculas, div){
        let sumaCalificacion = peliculas.puntaje.reduce((acum, e) => acum + e, 0)
        let promedioPuntaje = Math.round(sumaCalificacion / 3)
        peliculas.puntajeFinal=(parseInt(promedioPuntaje))
        div.innerHTML = `
        <div class="cardResena">
           <div class="card" style="width: 18rem; ">
           <img src="${peliculas.img}" class="card-img-top" alt="poster de la pelicula ${peliculas.titulo}">
           <div class="card-body">
           <h5 class="card-title">${peliculas.titulo}</h5>
           <p class="card-text">Dirigida por ${peliculas.director}</p>
           <input type="button" class="btn btn-secondary" value= "calificar" onclick="calificar('${peliculas.id}')">
           <button class="btn btn-secondary" onclick="verInformacion(${peliculas.id})"> Ver información </button>
           </div>
           </div>
        <div class="formResena">
           <h6 class="texto"> La pelicula ${peliculas.titulo} recibe una calificacion de ${promedioPuntaje} </h6>
           <p class="texto"> Puedes dejar una breve reseña de la pelicula </p>
           <form id="review">
           <textarea class="form-control" aria-label="With textarea" id="recomendacion"></textarea>
           <h6 class="texto"> Por ultimo, recomienda una pelicula similar a ${peliculas.titulo} a otros cinefilos </h6>
           <input type="text" placeholder="Pelicula" id="anotherFilm">
           <input type="submit" value="enviar reseña">
           </form>
        </div>
        </div>
           `
           lockStorage ("puntaje", JSON.stringify(peliculas.puntajeFinal))
           document.getElementById("review").addEventListener("submit", (e)=>{
               e.preventDefault()
               let infoEvent = e.target
               let resena = infoEvent.querySelector('#recomendacion')
               let recomendacion = infoEvent.querySelector('#anotherFilm')
               resena = resena.value
               recomendacion = recomendacion.value
               peliculas.resena.push(resena)
               peliculas.recomendacion.push(recomendacion)
               div.innerHTML= `
               <h5 class="texto"> ¡Muchas gracias por tu aporte! </h5>
               <button class="btn btn-secondary" id="fichabtn" onclick="volverEstrenos()"> Ver Estrenos </button>
               `
               lockStorage ("resena", JSON.stringify(resena))
               lockStorage ("recomendacion", JSON.stringify(recomendacion))
               Swal.fire({
               icon: "success",
               text: "¡Calificacion Enviada!",
               showConfirmButton: true,
               timer: 2500
               })
               
           })  
   }

}
//Funcion para ver la ficha tencica de las peliculas
function verInformacion (idPelicula){
    let pelicula = peliculasLS.find((p) => p.id === idPelicula);
        cards.style="display: none"
        const divReview = document.getElementById("puntuacion")
        if (pelicula.puntajeFinal === "" || pelicula.resena === "" || pelicula.recomendacion === "" ){
        divReview.innerHTML = `
        <div class="ficha">
           <div class="cardFicha">
            <div class="card" style="width: 18rem; ">
            <img src="${pelicula.img}" class="card-img-top" alt="poster de la pelicula ${pelicula.titulo}">
            <div class="card-body">
            <h5 class="card-title">${pelicula.titulo}</h5>
            <p class="card-text">Dirigida por ${pelicula.director}</p>
            <input type="button" class="btn btn-secondary" value= "calificar" onclick="calificar('${pelicula.id}')">
            <button class="btn btn-secondary" onclick="verInformacion(${pelicula.id})"> Ver información </button>
          </div>
         </div>
         </div>
         <div class="review">
           <h6 class="item"> Trama: ${pelicula.trama} </h6>
           <h6 class="item"> Reparto: ${pelicula.reparto} </h6>
         </div>
        </div>
        <button class="btn btn-secondary" id="fichabtn" onclick="volverEstrenos()"> Ver Estrenos </button>
        `}else {divReview.innerHTML = `
        <div class="ficha">
           <div class="cardFicha">
            <div class="card" style="width: 18rem; ">
            <img src="${pelicula.img}" class="card-img-top" alt="poster de la pelicula ${pelicula.titulo}">
            <div class="card-body">
            <h5 class="card-title">${pelicula.titulo}</h5>
            <p class="card-text">Dirigida por ${pelicula.director}</p>
            <input type="button" class="btn btn-secondary" value= "calificar" onclick="calificar('${pelicula.id}')">
            <button class="btn btn-secondary" onclick="verInformacion(${pelicula.id})"> Ver información </button>
          </div>
         </div>
         </div>
         <div class="review">
           <h6 class="item"> Trama: ${pelicula.trama} </h6>
           <h6 class="item"> Reparto: ${pelicula.reparto} </h6>
           <h6 class="item"> Calificacion: ${pelicula.puntajeFinal} </h6>
           <h6 class="item"> Reseña: ${pelicula.resena} </h6>
           <h6 class="item"> Otros usuarios recomiendan: ${pelicula.recomendacion} </h6>

         </div>
        </div>
        <button class="btn btn-secondary" id="fichabtn" onclick="volverEstrenos()"> Ver Estrenos </button>
        `
        }
    }

function volverEstrenos(){
    const divReview = document.getElementById("puntuacion")
    divReview.innerHTML= ""; 
    cards.style.display= "flex";
}

let peliculasLS = JSON.parse(localStorage.getItem("peliculas"))
if (!peliculasLS){
    peliculasLS = PELICULA
}

//Cuando se cargue el DOM se inicia la funcion renderizarPeliculas
document.addEventListener("DOMContentLoaded", () =>{
    renderizarPeliculas(peliculasLS)

})

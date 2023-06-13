/*abstracion
-generar cards con las peliculas en cartelera
-el usuario elige una pelicula
-se individualiza la pelicula
-se calificican los distintos parametros
-reduce para llegar a un promedio 
-reseña y recomendacion */

//se crea un class constructor para establecer objetos y pasarlos a arryas
class Peliculas {
    constructor (id, titulo, director, img){
        this.id = id,
        this.titulo = titulo,
        this.director = director,
        this.img = img,
        this.puntaje = []
    }
}


const pelicula1 = new Peliculas(1, "Boogeyman", "Rob Savage", "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/WMG2F7CNTVAKXGKHRVTSRKUT7M.jpg");
const pelicula2 = new Peliculas(2, "La Sirenita", "Rob Marshall", "https://es.web.img3.acsta.net/pictures/23/03/14/15/12/2449709.jpg");
const pelicula3 = new Peliculas(3, "Elementos", "Peter Sohn", "https://i.blogs.es/44baa6/elemental_poster/450_1000.jpeg");
const pelicula4 = new Peliculas(4, "Flash", "Andy Muschietti", "https://pics.filmaffinity.com/Flash-205686824-large.jpg");
const pelicula5 = new Peliculas(5, "Spiderman a traves del Spiderverso", "Joaquim Dos Santos", "https://m.media-amazon.com/images/M/MV5BNzQ1ODUzYjktMzRiMS00ODNiLWI4NzQtOTRiN2VlNTNmODFjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg");

const PELICULA = [pelicula1, pelicula2, pelicula3, pelicula4, pelicula5]

const CALIFICACION = []

function lockStorage (clave, valor){
    localStorage.setItem(clave, valor)
}

//funcion para crear cards a partir del array 
function renderizarPeliculas(estrenos){
   const cards = document.getElementById("cards")
   estrenos.forEach((pelicula => {
    let divCard = document.createElement("div")
    divCard.id = pelicula.id
    divCard.innerHTML= `
    <div class="card" style="width: 18rem; ">
      <img src="${pelicula.img}" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">${pelicula.titulo}</h5>
        <p class="card-text">Dirigida por ${pelicula.director}</p>
        <input type="button" class="btn btn-secondary" value= "calificar" onclick="calificar('${pelicula.id}')">
      </div>
   </div>
    `
    
    cards.append(divCard)
})) 
}

//funcion que califica las peliculas
function calificar(idPelicula){
    let calificarPelicula = peliculasLS.find(e => e.id == idPelicula)
    if (calificarPelicula.puntaje.length == 3){return puntajeFinal(calificarPelicula, divPuntaje)}

    const divPuntaje = document.getElementById("puntuacion")
    divPuntaje.innerHTML = `
        <form id="puntajeUser"> 
            <h6> Califica los distintos aspectos de la pelicula del 1 al 10 </h6>
            <p> Guion </p>
            <input type="number" id="puntaje">
            <p> Actuacion </p>
            <input type="number" id="puntaje2">
            <p> Fotografia </p>
            <input type="number" id="puntaje3">
            <input type="submit" value="enviar">
        </form>
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
        calificarPelicula.puntaje.push(parseInt(puntuacion),parseInt(puntuacion2), parseInt (puntuacion3))
        puntajeFinal (calificarPelicula, divPuntaje)
        lockStorage ("peliculas", JSON.stringify(peliculasLS))
    })
}

//a partir de un reduce y una funcion math.round obtenemos el promedio 
function puntajeFinal(peliculas, div){
     let sumaCalificacion = peliculas.puntaje.reduce((acum, e) => acum + e, 0)
     let promedioPuntaje = Math.round(sumaCalificacion / 3)
     div.innerHTML = `
        <h6 class="texto"> La pelicula ${peliculas.titulo} recibe una calificacion de ${promedioPuntaje} </h6>
        <p class="texto"> Puedes dejar una breve reseña de la pelicula </p>
        <form id="review">
        <textarea class="form-control" aria-label="With textarea" id="recomendacion"></textarea>
        <h6 class="texto"> Por ultimo, recomienda una pelicula similar a ${peliculas.titulo} a otros cinefilos </h6>
        <input type="text" placeholder="Pelicula" id="anotherFilm">
        <input type="submit" value="enviar reseña">
        </form>
        `
        document.getElementById("review").addEventListener("submit", (e)=>{
            e.preventDefault()
            let infoEvent = e.target
            let recomendacion = infoEvent.querySelector('#recomendacion')
            let otro = infoEvent.querySelector('#anotherFilm')
            recomendacion = recomendacion.value
            otro = otro.value

            div.innerHTML= `
            <h6 class="texto"> ¡Muchas gracias por tu aporte! </h6>
            `
            lockStorage ("reseña", JSON.stringify(recomendacion))
            lockStorage ("recomendacion", JSON.stringify(otro))
        })
        
        

        
        
}

let peliculasLS = JSON.parse(localStorage.getItem("peliculas"))
if (!peliculasLS){
    peliculasLS = PELICULA
}
renderizarPeliculas(peliculasLS)


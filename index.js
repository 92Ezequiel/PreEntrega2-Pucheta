/*abstracion
-generar cards con las peliculas en cartelera
-el usuario elige una pelicula
-se individualiza la pelicula
-se calificican los distintos parametros
-reduce para llegar a un promedio []
-reseña y recomendacion */

class Peliculas {
    constructor (id, titulo, director){
        this.id = id,
        this.titulo = titulo,
        this.director = director
        this.puntaje = []
    }
}


const pelicula1 = new Peliculas(1, "Boogeyman", "Rob Savage");
const pelicula2 = new Peliculas(2, "La Sirenita", "Rob Marshall");
const pelicula3 = new Peliculas(3, "Elementos", "Peter Sohn");
const pelicula4 = new Peliculas(4, "Flash", "Andy Muschietti");
const pelicula5 = new Peliculas(5, "Spiderman a traves del Spiderverso", "Joaquim Dos Santos");

const PELICULA = [pelicula1, pelicula2, pelicula3, pelicula4, pelicula5]

const CALIFICACION = []

function lockStorage (clave, valor){
    localStorage.setItem(clave, valor)
}


function renderizarPeliculas(estrenos){
   const cards = document.getElementById("cards")
   estrenos.forEach((pelicula => {
    let divCard = document.createElement("div")
    divCard.id = pelicula.id
    divCard.innerHTML= `
    <div class="card" style="width: 18rem;">
      <img src="https://www.vhv.rs/file/max/17/176106_rollo-de-pelicula-png.png" class="card-img-top" alt="">
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





/*const cards = document.getElementById("cards");
const PELICULAS = [
    {nombre: "Boogeyman", director: "Rob Savage", url: "https://static.cinemarkhoyts.com.ar/Images/Posters/5a77b7bc5f310e0113ec6bd906579001.jpg?v=00002131"},
    {nombre: "Elementos", director:"Peter Sohn", url: "https://static.cinemarkhoyts.com.ar/Images/Posters/6aa4601e49a56d928205c271b55fd463.jpg?v=00002131"},
    {nombre: 'Flash', director: 'Andy Muschietti', url: "https://static.cinemarkhoyts.com.ar/Images/Posters/227b519e83a8b99329302ad2d37d0bbb.jpg?v=00002131"},
    {nombre: 'Spiderman across the Spiderverse', director: 'Joaquim Dos Santos', url: "https://static.cinemarkhoyts.com.ar/Images/Posters/483c1800ed15083a602307931c1d86b7.jpg?v=00002131"},
    {nombre: 'La Sirenita', director: 'Rob Marshall', url: "https://static.cinemarkhoyts.com.ar/Images/Posters/fcb985a11f362bc8c05a89788fb5ac5c.jpg?v=00002131"}
]
const createCards = (pelicula) => {
    const container = document.createElement("div")
    container.classList.add("card")

    const imagen = document.createElement("img")
    imagen.src = PELICULAS.url

    const nombre = document.createElement("h2")
    nombre.innerText = PELICULAS.nombre

    const direccion = document.createElement("p")
    direccion.innerText = PELICULAS.director

    container.appendChild(imagen)
    container.appendChild(nombre)
    container.appendChild(direccion)

    return container
}

const cardFilm = (film) =>{
    const card = film.map ((pelicula) => {return createCards(pelicula)})
    console.log(card)
    cards.append(...card)
}

cardFilm (PELICULAS)*/
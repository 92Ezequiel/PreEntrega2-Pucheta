//se le pide al usuario un nombre y clave para generar una interaccion mas personalizada 
let nombreUser = prompt ("Ingrese su nombre")
let clave = parseInt(prompt("ingrese una clave numerica de 4 digitos, la misma sera guardada"))

if (isNaN (clave)){
    alert("la clave debe contener solo numeros")
    clave = parseInt(prompt("Ingrese una clave numerica de 4 digitos, la misma sera guardada"))
}
//objetos peliculas
class peliculas {
    constructor (id, titulo, director){
        this.id = id,
        this.titulo = titulo,
        this.director = director
    }
}

const pelicula1 = new peliculas(1, "Guardianes de la Galaxia Vol. 3", "James Gunn")
const pelicula2 = new peliculas(2, "La Sirenita", "Rob Marshall")
const pelicula3 = new peliculas(3, "Misantropo", "Damian Szifron")
const pelicula4 = new peliculas(4, "Rapido y Furiosos 10", "Louis Leterrier")
const pelicula5 = new peliculas(5, "Spiderman a traves del Universo", "Joaquim Dos Santos")
const pelicula6 = new peliculas(6, "Supermario Bros", "Aaron Horvath")
const pelicula7 = new peliculas(7, "Transformers El despertar de las bestias", "Steven Caple Jr.")

const PELICULA = [pelicula1, pelicula2, pelicula3, pelicula4, pelicula5, pelicula6, pelicula7]
//Se presentan las peliculas que estan en cartelera y se le pide al usuario que elija un id 
alert("recuerden que las peliculas estaran disponibles para calificar hasta que sean retiradas de la cartelera")

let mensaje = "Estas son las peliculas en cartelera, ingrese el numero que quiere calificar"

PELICULA.forEach (e => {
    mensaje += `\n ${e.id} - ${e.titulo} dirigida por ${e.director} \n`
})

let eleccionCinefilo = parseInt(prompt(mensaje))
//Se individualiza la pelicula
const peliculaACalificar = PELICULA.find (e => e.id == eleccionCinefilo)
//funcion para validar calificacion 
function calificar (numero, limite, alerta, devuelve){
    while (numero > limite){
        alert (alerta)
        numero = parseInt(prompt(devuelve))
    }
    return numero;
}

eleccionCinefilo = calificar (eleccionCinefilo, 7, "no se encuentra la pelicula a calificar", mensaje)

function puntaje (){
    let reseña = parseInt(prompt("deja una breve reseña para una mejor valoracion"))
    let recomendar = parseInt(prompt("recomienda una pelicula similar para ayudar a otros cinefilos"))
}
//Se crean aspectos a valorar
let guion = parseInt(prompt(`calificar guion del 1 al 5`))
guion = calificar (guion, 5, "calificacion no valida", "calificar guion del 1 al 5")
let actuacion = parseInt(prompt(`calificar actuacion del 1 al 5`))
actuacion = calificar (actuacion, 5, "calificacion no valida", "calificar actuacion del 1 al 5")
let fotografia = parseInt(prompt(`calificar fotografia del 1 al 5`))
fotografia = calificar (fotografia, 5, "calificacion no valida", "calificar fotografia del 1 al 5")

const valoracion = [guion, actuacion, fotografia]
const sumaValoracion = valoracion.reduce ((acum, e) => acum + e, 0)

//Reduce para llegar al promedio del puntaje y obtener un puntaje final 
alert (`la pelicula ${peliculaACalificar.titulo} recibe una calificacion de ${ Math.round(sumaValoracion / valoracion.length)}`)

let valorar = puntaje ()


alert(`Muchas gracias ${nombreUser} por tu valoracion`)



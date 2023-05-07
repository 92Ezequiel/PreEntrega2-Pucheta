const general = 640
const encargado = 690
const administracion = 680
let nombre = prompt ("indique su nombre");


let semanasTrabajadas = parseInt(prompt("¿Cuantas semanas trabajaste este mes?"))
let cantidadHorasExtras = 0

for (let i = 0; i < semanasTrabajadas; i++){
        let horasExtras = parseInt (prompt(`¿Cuantas horas extras hiciste en la semana ${i+1}?`))
        cantidadHorasExtras += horasExtras
    }
    
function evaluarHoras (horas, sueldo){
        let horasTotal = horas * sueldo
        let corresponde = horasTotal * 1.5 
        alert(`${nombre}, trabajaste ${cantidadHorasExtras} horas extras este mes`)
        alert(`te corresponden ${corresponde} pesos por tus horas extras`)
    }

let claveGeneral = 2049
let claveEncargado = 1917
let claveAdministracion = 1138
let inserteClave = parseInt(prompt(`indique su clave`))

if (inserteClave == claveGeneral){
    evaluarHoras (cantidadHorasExtras, general)
}else if (inserteClave == claveEncargado){
    evaluarHoras (cantidadHorasExtras, encargado)
}else if (inserteClave == claveAdministracion){
    evaluarHoras (cantidadHorasExtras, administracion)
}else{
    alert ("Usted no pertenece a ninguna area o su clave es incorrecta, verifique o intente de nuevo por favor")
}


import {obtenerNuevoId} from '../src/ids.js'

const turnos = [ ]

function copiarTurno(){
    return ({dia: e.dia ,
        mes : e.mes,
        hora : e.hora,
        nombre : e.nombre,
        numeroDeTelefono : e.numeroDeTelefono,
        tipoDeServicio : e.tipoDeServicio,
        id : e.id})
}

function copiarTurnos(){
    return turnos.map(copiarTurno)
}
export function obtenerTurnos(){
    return turnos.map(e => ({ 
    })
)}   

function crearTurno(datos) {
    

    if (!datos.nombre) {
        throw new Error('el campo nombre es obligatorio')
    }

    if (!datos.tipoDeServicio) {
        throw new Error('el campo tipo es obligatorio')
    }

    const turno = {
    nombre : datos.nombre,
    dia : datos.dia,
    mes : datos.mes,
    hora : datos.hora,
    numeroDeTelefono : datos.numeroDeTelefono,
    tipoDeServicio : datos.tipoDeServicio,
    id : obtenerNuevoId(),
    }
    return turno
}

export function agregarTurno(datosTurno) {
    const turno = crearTurno(datosTurno)
    turnos.push(turno)
    return turno
}

export function borrarTurnos() {
    while (turnos.length > 0) {
        turnos.pop()
    }
}

export function obtenerTurnosSegunTipo(tipo){
    const buscados = turnos.filter(t => t.tipoDeServicio.includes(tipo))
    return copiarTurnos(buscados)
}

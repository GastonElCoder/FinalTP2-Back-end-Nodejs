import { crearTurno } from "./Turno.js"

const turnos = [ ]

function copiarTurno(turno){
    return ({dia: turno.dia ,
        mes : turno.mes,
        hora : turno.hora,
        nombre : turno.nombre,
        numeroDeTelefono : turno.numeroDeTelefono,
        tipoDeServicio : turno.tipoDeServicio,
        id : turno.id})
}

function copiarTurnos(turnos){
    return turnos.map(copiarTurno)
}

export function obtenerTurnos(){
    return copiarTurnos(turnos)
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
    const buscados = turnos.filter(t => turno.tipoDeServicio.includes(tipo))
    return copiarTurnos(buscados)
}

export function obtenerTurnoSegunId(id) {
    const buscada = turnos.find(t => t.id === id)
    if (buscada) {
        return copiarTurno(buscada)
    } else {
        throw new Error('turno no encontrada')
    }
}

export function borrarTurnoSegunId(id) {
    const indiceBuscado = turnos.findIndex(c => c.id === id)
    if (indiceBuscado === -1) {
        throw new Error('turno no encontrada')
    } else {
        turnos.splice(indiceBuscado, 1)
    }
}

export function reemplazarTurno(id, datosTurno) {
    const indiceBuscado = turnos.findIndex(c => c.id === id)
    if (indiceBuscado === -1) {
        throw new Error('turno no encontrada')
    } else {
        const turno = crearTurno(datosTurno)
        turno.id = id
        turnos[indiceBuscado] = turno
    }
}
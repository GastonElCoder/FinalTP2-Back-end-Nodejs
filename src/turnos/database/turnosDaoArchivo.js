import { crearErrorRecursoNoEncontrado } from '../../shared/errors/models/ErrorRecursoNoEncontrado.js'

const turnos = [ ]

export function guardarTurno(turno) {
    const indiceBuscado = turnos.findIndex(t => t.id === turno.id)
    if (indiceBuscado === -1) {
        turnos.push(turno)
    } else {
        turnos[indiceBuscado] = turno
    }
}

export function recuperarTurno(id) {
    const buscada = turnos.find(t => t.id === id)
    if (buscada){
        return copiarTurno(buscada) 
        }else {
            throw crearErrorRecursoNoEncontrado('turno')
        }
}

export function recuperarTurnos(){
    return copiarTurnos(turnos)
}

export function recuperarTurnosSegunTipo(tipo){
    return copiarTurnos(turnos.filter(t => t.tipoDeServicio.includes(tipo)))
}

export function eliminarTurno(id) {
    const indiceBuscado = turnos.findIndex(c => c.id === id)
    if (indiceBuscado === -1) {
        throw crearErrorRecursoNoEncontrado('turno')
    } else {
        turnos.splice(indiceBuscado, 1)
    }
}

export function eliminarTurnos(){
    while(turnos.length > 0){
        turnos.pop()
    }
}

export function nombreEstaDisponible(nombre){
    return turnos.every(t => t.nombre !== nombre)
}

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

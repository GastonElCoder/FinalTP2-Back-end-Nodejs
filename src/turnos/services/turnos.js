import { crearTurno } from "../models/Turno.js"
import dao from '../database/turnosDao.js';
import { crearErrorNombreUnico } from '../../shared/errors/models/ErrorNombreUnico.js'


function validarNombreUnico(nombre) {
    if (!dao.nombreEstaDisponible(nombre)) throw crearErrorNombreUnico()
}

export function obtenerTurnos(){
    return dao.recuperarTurnos()
} 

export function agregarTurno(datosTurno) {
    validarNombreUnico(datosTurno.nombre)
    const turno = crearTurno(datosTurno)
    dao.guardarTurno(turno)
    return turno
}

export function borrarTurnos() {
    return dao.eliminarTurnos()
}

export function obtenerTurnosSegunTipo(tipo){
    return dao.recuperarTurnosSegunTipo(tipo) 
}

export function obtenerTurnoSegunId(id) {
    return dao.recuperarTurno(id)
}

export function borrarTurnoSegunId(id) {
    return dao.eliminarTurnos(id)
}

export function reemplazarTurno(id, datosTurno) {
    const turno = crearTurno(datosTurno)
    turno.id = id
    dao.guardarTurno(turno)
}
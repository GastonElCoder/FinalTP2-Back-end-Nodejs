import { obtenerNuevoId } from "../shared/ids.js"; 


export function crearTurno(datos) {
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
    id : obtenerNuevoId('turno'),
    }
    return turno
}
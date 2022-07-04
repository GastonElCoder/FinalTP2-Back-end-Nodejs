import {Router} from 'express'
import {agregarTurno, obtenerTurnos,
    obtenerTurnosSegunTipo, obtenerTurnoSegunId,
   borrarTurnoSegunId, reemplazarTurno } from "./turnos.js";

const routerTurnos = new Router()

routerTurnos.get('/', (req, res) => {
    const turnos = obtenerTurnos()
    res.json(turnos)
})

routerTurnos.get('/', (req, res) => {
    let turnos
    if (req.query.tipoDeServicio) {
        turnos = obtenerTurnosSegunTipo(req.query.tipoDeServicio)
    } else {
        turnos = obtenerTurnos()
    }
    res.json(turnos)
})

routerTurnos.get('/:id', (req, res) => {
    try {
        const turno = obtenerTurnoSegunId(req.params.id)
        res.json(turno)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})


routerTurnos.post('/', (req, res) => {
    try {
        const turno = req.body
        const turnoAgregado = agregarTurno(turno)
        res.status(201).json(turnoAgregado)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

routerTurnos.delete('/:id', (req, res) => {
    try {
        borrarTurnoSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerTurnos.put('/:id', (req, res) => {
    try {
        const datosActualizados = req.body
        const turnoActualizado = reemplazarTurno(req.params.id, datosActualizados)
        res.json(turnoActualizado)
    } catch (error) {
        if (error.tipo == 'not found') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
})

export {routerTurnos}


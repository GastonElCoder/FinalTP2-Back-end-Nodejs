import {Router} from 'express'
import * as api from '../services/turnos.js'
import {prepararRespuestaConError } from '../../shared/errors/mappings/mappings.js'

const routerTurnos = new Router()

routerTurnos.get('/', (req, res) => {
    let turnos
    try {
    if (req.query.tipoDeServicio) {
        turnos = api.obtenerTurnosSegunTipo(req.query.tipoDeServicio)
    } else {
        turnos = api.obtenerTurnos()
    }
    res.json(turnos)
    } catch (error) {
        const { mensaje, codigo } = prepararRespuestaConError(error)
        res.status(codigo).json({ mensaje })
    }
})

routerTurnos.get('/:id', (req, res) => {
    try {
        const turno = api.obtenerTurnoSegunId(req.params.id)
        res.json(turno)
    } catch (error) {
        const { mensaje, codigo } = prepararRespuestaConError(error)
        res.status(codigo).json({ mensaje})
    }
})


routerTurnos.post('/', (req, res) => {
    try {
        const turno = req.body
        const turnoAgregado = api.agregarTurno(turno)
        res.status(201).json(turnoAgregado)
    } catch (error) {
        if (error.tipo === 'NOMBRE_UNICO') {
            res.status(409).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
})

routerTurnos.delete('/:id', (req, res) => {
    try {
        api.borrarTurnoSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerTurnos.put('/:id', (req, res) => {
    try {
        const datosActualizados = req.body
        const turnoActualizado = api.reemplazarTurno(req.params.id, datosActualizados)
        res.json(turnoActualizado)
    } catch (error) {
        if (error.tipo == 'NO_ENCONTRADO') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
})

export {routerTurnos}


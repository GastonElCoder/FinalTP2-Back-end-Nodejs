import  express  from "express";
import {agregarTurno, obtenerTurnos,
     obtenerTurnosSegunTipo, obtenerTurnoSegunId,
    borrarTurnoSegunId, reemplazarTurno } from "./turnos.js";

const app = express();

app.use(express.json());

app.get('/turnos', (req, res) => {
    const turnos = obtenerTurnos()
    res.json(turnos)
})

app.get('/turnos', (req, res) => {
    let turnos
    if (req.query.tipoDeServicio) {
        turnos = obtenerTurnosSegunTipo(req.query.tipoDeServicio)
    } else {
        turnos = obtenerTurnos()
    }
    res.json(turnos)
})

app.get('/turnos/:id', (req, res) => {
    try {
        const turno = obtenerTurnoSegunId(req.params.id)
        res.json(turno)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})


app.post('/turnos', (req, res) => {
    try {
        const turno = req.body
        const turnoAgregado = agregarTurno(turno)
        res.status(201).json(turnoAgregado)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.delete('/turnos/:id', (req, res) => {
    try {
        borrarTurnoSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

app.put('/turnos/:id', (req, res) => {
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


let server

export function conectar(port) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve(server.address().port)
        })
        server.on('error', error => {
            reject(error)
        })
    })
}

export function desconectar() {
    return new Promise((resolve, reject) => {
        server.close(error => {
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        })
    })
}

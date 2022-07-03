import  express  from "express";
import {agregarTurno, obtenerTurnos, obtenerTurnosSegunTipo } from "./turnos.js";

const app = express();

app.use(express.json());

app.get('/turnos', (req, res) => {
    const turnos = obtenerTurnos()
    res.json(turnos)
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

app.get('/turnos', (req, res) => {
    let turnos
    if (req.query.tema) {
        turnos = obtenerTurnosSegunTipo(req.query.tema)
    } else {
        turnos = obtenerTurnos()
    }
    res.json(turnos)
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

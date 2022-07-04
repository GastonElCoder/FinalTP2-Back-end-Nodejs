import  express  from "express";
import  { routerTurnos } from "../turnos/routerTurnos.js"
const app = express();

app.use(express.json());

app.use('/api/turnos' , routerTurnos)

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

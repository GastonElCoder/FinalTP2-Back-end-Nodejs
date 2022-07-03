import axios from "axios";
import assert from "assert";
import {conectar, desconectar} from "../src/servidor.js";
import {obtenerTurnos, borrarTurnos, agregarTurno} from '../src/turnos.js'; 



const turnoDePrueba1 = {
    dia: 10,
    mes : 2,
    hora : 10,
    nombre : "pedro",
    numeroDeTelefono : "123155131",
    tipoDeServicio : "programado",
    id : 1
}

const turnoDePrueba2 = {
    dia: 8,
    mes : 8,
    hora : 10,
    nombre : "juan",
    numeroDeTelefono : "223235131",
    tipoDeServicio : "cotizacion",
    id : 2
}

describe('servidor de pruebas', () => {
    
    let serverUrl

    before(async() => {
        const port = await conectar()
        serverUrl = `http://localhost:${PORT}/turnos`
    })

    after(async() => {
        await desconectar()
    })

    beforeEach(() => {
        borrarTurnos()
    })
    afterEach(() => {
        borrarTurnos()
    })

        describe('el servidor esta escuchando', () => {
        describe('al pedirle los turnos', () => {
            it('devuelve un array con turnos', async () => {
                const { data: turnosObtenidos, status }  = await axios.get(serverUrl)
                assert.strictEqual(status, 200) 
                const turnosReales = obtenerTurnos()
                assert.deepStrictEqual(turnosObtenidos, turnosReales)
            })
        })
        
        describe('al pedirle los turnos relacionadas con cierto tipo de servicio', () => {
            it('devuelve un array con turnos relacionadas al tipo de servicio', async () => {

                await agregarTurno(turnoDePrueba1)
                await agregarTurno(turnoDePrueba2)

                let turnosObtenidos
                const { data, status } = await axios.get(serverUrl, { params: { tipoDeServicio: 'programado' } })
                assert.strictEqual(status, 200)
                turnosObtenidos = data

                const todos = obtenerTurnos()
                const turnosEsperados = todos.filter(t => t.tipoDeServicio.includes('programado'))
                assert.deepStrictEqual(turnosObtenidos, turnosEsperados)
            })
        })

        describe('al pedirle que agregue un turno', () => {
            it('lo agrega a los demas existentes', async () => {
                
                const turnosAntes = obtenerTurnos();
                const turno = {
                    dia: 18,
                    mes : 8,
                    hora : 15,
                    nombre : "olaf",
                    numeroDeTelefono : "823155131",
                    tipoDeServicio : "programado"
                }
                const {data: turnoAgregado, status} = await axios.post(serverUrl, turno)
                assert.strictEqual(status, 201)

                const turnosDespues = obtenerTurnos()
                assert.strictEqual(turnosDespues.length, turnosAntes.length +1)
              
                const turnoAgregadoEsperado = {...turno, id : turnoAgregado.id}
                assert.deepStrictEqual(turnosDespues, turnosAntes.concat(turnoAgregadoEsperado))
            })
        })
       
        describe('al mandarle un turno mal formateado', () => {
            it('no agrega nada y devuelve un error', async () => {
                const turnosAntes = obtenerTurnos()
                const turno = {
                    dia: 18,
                    mes : 8,
                    hora : 15,
                    titulo : "olaf",
                    numeroDeTelefono : "823155131",
                    tipoDeServicio : "programado"
                }

                await assert.rejects(
                    axios.post(serverUrl, turno),
                    error => {
                        assert.strictEqual(error.response.status, 400)
                        return true
                    }
                )

                const turnosDespues = obtenerTurnos()
                assert.deepStrictEqual(turnosDespues, turnosAntes)
            })
        })
        
    })
}) 

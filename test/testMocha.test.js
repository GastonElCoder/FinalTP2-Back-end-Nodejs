import axios from "axios";
import assert from "assert";
import {conectar, desconectar} from "../src/servidor.js";
import {obtenerTurnos, borrarTurnos, agregarTurno, obtenerTurnoSegunId} from '../src/turnos.js'; 



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
        serverUrl = `http://localhost:${port}/turnos`
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

        describe('al pedirle un turno especifico, segun su identificador', () => {
            it('devuelve esa turno', async () => {

                const turnoAgregado1 = await agregarTurno(turnoDePrueba1)

                let turnoObtenido
                const { data, status } = await axios.get(serverUrl + '/' + turnoAgregado1.id)
                assert.strictEqual(status, 200)
                turnoObtenido = data

                assert.deepStrictEqual(turnoObtenido, turnoAgregado1)
            })
        })

        describe('al pedirle un turno que no existe', () => {
            it('lanza un error 404', async () => {
                await assert.rejects(
                    axios.get(serverUrl + '/unIdQueNoExiste'),
                    error => {
                        assert.strictEqual(error.response.status, 404)
                        return true
                    }
                )
            })
        })

        describe('al mandarle datos válidos de un turno', () => {
            it('crea y agrega ese turno a los demas existentes', async () => {
                const turnosAntes = obtenerTurnos()
                const turno = {
                     dia: 16,
                     mes : 8,
                     hora : 8,
                     nombre : "cristian",
                     numeroDeTelefono : "323235131",
                     tipoDeServicio : "programado",
                }
                const { data: turnoAgregado, status } = await axios.post(serverUrl, turno)
                assert.strictEqual(status, 201)

                const turnosDespues = obtenerTurnos()
                assert.strictEqual(turnosDespues.length, turnosAntes.length + 1)

                const turnoAgregadoEsperado = { ...turno, id: turnoAgregado.id }
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

        describe('al pedirle que borre una turno especifica, segun su identificador', () => {
            it('borra esa turno y no devuelve nada', async () => {

                const turnoAgregado1 = await agregarTurno(turnoDePrueba1)

                const { status } = await axios.delete(serverUrl + '/' + turnoAgregado1.id)
                assert.strictEqual(status, 204)

                const turnosDespues = obtenerTurnos()
                assert.ok(turnosDespues.every(c => c.id !== turnoAgregado1.id))
            })
        })

        describe('al pedirle un turno que no existe', () => {
            it('lanza un error 404', async () => {
                await assert.rejects(
                    axios.delete(serverUrl + '/unIdQueNoExiste'),
                    error => {
                        assert.strictEqual(error.response.status, 404)
                        return true
                    }
                )
            })
        })

        describe('al mandarle un turno valida y un identificador de turno', () => {
            it('reemplaza el preexistente por el nuevo', async () => {
                const turnoAgregado1 = await agregarTurno(turnoDePrueba1)

                const nuevoNombre = 'sergio'
                const datosActualizados = { ...turnoAgregado1, nombre: nuevoNombre }

                const { status } = await axios.put(serverUrl + '/' + turnoAgregado1.id, datosActualizados)
                assert.strictEqual(status, 200)

                const turnoBuscado = obtenerTurnoSegunId(turnoAgregado1.id)
                assert.deepStrictEqual(turnoBuscado, datosActualizados)
            })
        })
        
    })
}) 

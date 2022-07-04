import { MODO_PERSISTENCIA } from '../../config/config.js'
import * as daoArchivos from './turnosDaoArchivo.js'
import * as daoMemoria from './turnosDaoMemoria.js'

let dao

switch (MODO_PERSISTENCIA) {
    case 'ARCHIVO':
        dao = daoArchivos
        break
    default:
        dao = daoMemoria
}

export default dao

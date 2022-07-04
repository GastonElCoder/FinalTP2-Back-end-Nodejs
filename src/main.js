import { conectar } from "./server/servidor.js";


const PORT = 8080
const port = await conectar(PORT)

console.log(`server listening on port ${port}`)

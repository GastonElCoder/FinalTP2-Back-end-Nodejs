import { conectar } from "./server/servidor.js";

const port = await conectar()
console.log(`server listening on port ${port}`)

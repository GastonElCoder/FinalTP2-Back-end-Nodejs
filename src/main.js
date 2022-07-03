import { conectar } from "./servidor.js";

const port = await conectar()
console.log(`server listening on port ${port}`)

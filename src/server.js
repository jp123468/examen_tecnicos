import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerUsuarios from './routers/usuraios_routes.js'
//import routerPacientes from './routers/paciente_routes.js'
import SwaggerV1 from "./swagger.js";

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())


// Variables globales


// Rutas 
app.get('/',(req,res)=>{
    res.send("server turned on for use")
})
app.use('/api',routerUsuarios)
SwaggerV1(app);
// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))



export default  app 
import express from "express";
import enrutadorUsuarios from "./rutas/rutaUsuario.js";
 

/* const express = require("express") --- forma antigua */

const servidor = express();
 
servidor.use("/",enrutadorUsuarios); 

servidor.get("/", (solicitud,respuesta)=>{
    respuesta.json({
         Mensaje: "Trabajando"
    })
});

export default servidor;
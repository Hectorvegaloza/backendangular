import express from "express";
import enrutadorUsuarios from "./rutas/rutaUsuario.js";
import morgan from "morgan";
import enrutadorInicioSesion from "./rutas/rutaInicioSesion.js";

/* const express = require("express") --- forma antigua */

const servidor = express();
 
servidor.use(express.json()); // para recibir json de los servidorres
servidor.use(morgan("dev"));
servidor.use("/usuarios",enrutadorUsuarios);  // raiz del programa
servidor.use("/inicio-sesion",enrutadorInicioSesion);  // raiz del programa



servidor.get("/", (solicitud,respuesta)=>{
    respuesta.json({
         Mensaje: "Trabajando"
    })
});

export default servidor;
import path from "path";
import express from "express";
import cors from "cors";
import enrutadorUsuarios from "./rutas/rutaUsuario.js";
import morgan from "morgan";
import enrutadorInicioSesion from "./rutas/rutaInicioSesion.js";
import enrutadorContactenos from "./rutas/rutaContactenos.js";
import booksroute from "./rutas/booksroute.js";
import creatingRoutes from "./rutas/creating_routes.js";
/* const express = require("express") --- forma antigua */

const servidor = express();

servidor.use(cors());
servidor.use(express.json()); // para recibir json de los servidorres
servidor.use(morgan("dev"));
servidor.use("/usuarios",enrutadorUsuarios);  // raiz del programa
servidor.use("/inicio-sesion",enrutadorInicioSesion);  // raiz del programa
servidor.use("/contactenos",enrutadorContactenos);  // raiz del programa
servidor.use("/books", booksroute);
servidor.use("/payments", creatingRoutes );
servidor.use("/pictures", express.static(path.resolve('pictures')));

servidor.get("/", (solicitud,respuesta)=>{
    respuesta.json({
         Mensaje: "Trabajando"
    })
});

export default servidor;
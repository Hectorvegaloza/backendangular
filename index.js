'use strict';
const express = require("express")

const servidor = express();

servidor.get("/", (solicitud,respuesta)=>{
    respuesta.json({
        saludo: "Hola chamos"
    })
});

 servidor.get("/xxx", (solicitud, respuesta)=>{
    respuesta.redirect(301, "https://www.ucundinamarca.edu.co/index.php/servicios/plataforma-institucional");
})
 

servidor.listen(3000);
console.log("servidor comando");
'use strict';

import "dotenv/config";
import "./conexionBD.js";
import servidor from "./servidor.js";
 

/*  servidor.get("/xxx", (solicitud, respuesta)=>{
    respuesta.redirect(301, "https://www.ucundinamarca.edu.co/index.php/servicios/plataforma-institucional");
})
  */

servidor.listen(3000, ()=>{
    console.log("servidor corriendo en el puerto 3000");
});

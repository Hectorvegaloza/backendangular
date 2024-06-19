import { Router } from "express";
import ControladorContactenos from "../controladores/controladorContactenos.js";


const enrutadorContactenos = Router();

enrutadorContactenos.post('/', ControladorContactenos.crearContactenos);
/* enrutadorUsuarios.post('/', ControladorUsuarios.crearContactenos);
enrutadorUsuarios.post('/', ControladorUsuarios.crearUsuario); */

/* 
servidor.get('/', (solicitud, respuesta) => {
  respuesta.status(404).send("No encontrado");
}) */

  export default enrutadorContactenos;
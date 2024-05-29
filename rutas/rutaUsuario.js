import { Router } from "express";
import ControladorUsuarios from "../controladores/controladorUsuarios.js";


const enrutadorUsuarios = Router();

enrutadorUsuarios.post('/:id', ControladorUsuarios.crearUsuario);
enrutadorUsuarios.get('/:id', ControladorUsuarios.leerUsuario);
enrutadorUsuarios.get('/', ControladorUsuarios.leerUsuarios);
enrutadorUsuarios.put('/:id', ControladorUsuarios.actualizarUsuario);
enrutadorUsuarios.delete('/:id', ControladorUsuarios.eliminarUsuario);
/* 
servidor.get('/', (solicitud, respuesta) => {
  respuesta.status(404).send("No encontrado");
}) */

  export default enrutadorUsuarios;
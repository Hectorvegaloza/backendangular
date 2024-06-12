import { Router } from "express";
import ControladorInicioSesion from "../controladores/controladorInicioSesion.js";

const enrutadorInicioSesion = Router(); /* ASI SE CREA UN ENRUTADOR */



enrutadorInicioSesion.post('/', ControladorInicioSesion.inciarSesion);
enrutadorInicioSesion.get('/:token', ControladorInicioSesion.validarToken);

 
export default enrutadorInicioSesion;
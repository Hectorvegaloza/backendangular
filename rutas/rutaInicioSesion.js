import { Router } from "express";
import ControladorInicioSesion from "../controladores/controladorInicioSesion.js";

const enrutadorInicioSesion = Router(); /* ASI SE CREA UN ENRUTADOR */



enrutadorInicioSesion.post('/', ControladorInicioSesion.inciarSesion);

 
export default enrutadorInicioSesion;
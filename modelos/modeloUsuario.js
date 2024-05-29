import { Schema } from "mongoose"; // es lo que permite decirme cual es la estructura del documento
import { model } from "mongoose";

// vamos a crear un esquema

const esquemaUsuario = new Schema( // estoy creando un esquema estrcuctura de como ingresan los datos
    {
        nombre: {type: String, require: true},
        apellido:{type: String, require: true},
        correo: {type: String, require: true},
        contrasenia: {type: String, require: true},
        contraseniaconfirm: {type: String, require: true},
        apodo: {type: String, require: true},
        telefono:  {type: Number},
        foto: {type: String, require: true},
        codigopostal: {type: String, require: true}
});


export default model("Usuario", esquemaUsuario); // Lo exporto este es el modelo 

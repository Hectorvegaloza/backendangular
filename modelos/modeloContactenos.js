import { Schema } from "mongoose"; // es lo que permite decirme cual es la estructura del documento
import { model } from "mongoose";

// vamos a crear un esquema

const esquemaContactenos = new Schema( // estoy creando un esquema estrcuctura de como ingresan los datos
    {
        nombre: {type: String, require: true},
        correo: {type: String, require: true},
        mensaje: {type: String, require: true},
});


export default model("contactenos", esquemaContactenos); // Lo exporto este es el modelo 
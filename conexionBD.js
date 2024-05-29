import mongoose, { Mongoose } from "mongoose";

mongoose.connect(process.env.MONGODB_ATLAS_URI).then((dato) => {
    
    console.log("bien, conectado a la base de datos");

}).catch((error) => {
    console.log("Ocurrio un error y no se conecto a la base de datos");
}); //recibe mi conexion donde esta la base de datos nos va retornar una promesa


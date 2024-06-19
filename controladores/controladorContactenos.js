import bcrypt from "bcryptjs";
import modeloContactenos from "../modelos/modeloContactenos.js";

const ControladorContactenos = {
  
    crearContactenos: async (solicitud, respuesta) => {
      try{
        const {nombre, correo, mensaje} = solicitud.body; ///estoy sacando esto destructu
          const nuevoMensaje = new modeloContactenos({        ///se va realizar un objeto donde se mande, SI DESEAMOS QUE SE MANDEN MAS DATOS SE DEBEN AGREGAR AQUI
          nombre: nombre,
          correo: correo,
          mensaje: mensaje,
        });  
        
        const mensajeCreado = await nuevoMensaje.save();
        
        console.log(mensajeCreado);
        
        if (mensajeCreado._id){
          respuesta.json({
            resultado: "Bien!",
            mensaje: "mensjae Creado!",
            id: mensajeCreado._id
          });
        } 
        
      }catch(error){
        console.log("error",error);
        respuesta.json({error: true, mensaje: "ocurrió un error crear mensaje"});
      }
      },

    
}


export default ControladorContactenos;
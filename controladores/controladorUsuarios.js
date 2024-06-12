import bcrypt from "bcryptjs";
import ModeloUsuario from "../modelos/modeloUsuario.js";

const ControladorUsuarios = {
  
    crearUsuario: async (solicitud, respuesta) => {
      try{
       
        const {nombre, correo, contrasenia} = solicitud.body; ///estoy sacando esto destructurin
        const contraseniaProtegida = await bcrypt.hash(contrasenia, 10);
          const nuevoUsuario = new ModeloUsuario({        ///se va realizar un objeto donde se mande, SI DESEAMOS QUE SE MANDEN MAS DATOS SE DEBEN AGREGAR AQUI
          nombre: nombre,
          correo: correo,
          contrasenia: contraseniaProtegida,
        });  

        const usuarioCreado = await nuevoUsuario.save();
      

        if (usuarioCreado._id){
          respuesta.json({
            resultado: "Bien!",
            mensaje: "Usuario Creado!",
            id: usuarioCreado._id
          });
        } 
        
      }catch(error){
        console.log("error",error);
        respuesta.json({error: true, mensaje: "ocurrió un error al enviar mensaje"});
      }
      },

      leerUsuario: async (solicitud, respuesta) => {
        try{

          const usuarioEncontrado = await ModeloUsuario.findById(solicitud.params.id);//para leer un usuario
          /* console.log(usuarioEncontrado); */
          const nuevoUsuario = new ModeloUsuario(solicitud.body);
          /* console.log("solicitud:", solicitud.body);  */
          const usuarioCreado = await nuevoUsuario.save();
          console.log(usuarioCreado);

         if (usuarioCreado._id){
           respuesta.json({
             resultado: "Bien!",
             mensaje: "Usuario Creado!",
             id: usuarioCreado._id,
             datos: usuarioEncontrado 
           });
         }

        }catch(error){
          console.log("error",error);
          respuesta.json({error: true, mensaje: "ocurrió un error al leer usuario"});
        }

      },
      
      leerUsuarios: async (solicitud, respuesta) => {
        try{
          const TodosLosUsuarios = await ModeloUsuario.find();
          console.log(TodosLosUsuarios);
          respuesta.json({
            resultado: "bien!!",
            mensaje: "Usuarios leidos",
            datos:TodosLosUsuarios
          })

        
        }catch(error){
          console.log("error",error);
          respuesta.json({error: true, mensaje: "ocurrió un error al leer los usuarios"});
        }

      },


      actualizarUsuario: async (solicitud, respuesta) => {
        try{

          console.log(solicitud.params.id);
          console.log("solicitud:", solicitud.body); 
          
          const usuarioactualizado = await ModeloUsuario.findByIdAndUpdate(solicitud.params.id,solicitud.body);

          if(usuarioactualizado._id){
            respuesta.json({
              resultado: "bien!!",
              mensaje: "Usuarios modificados",
              datos:usuarioactualizado
            })
          }
      



        }catch(error){
          console.log("error",error);
          respuesta.json({error: true, mensaje: "ocurrió un error actualizar usuario"});
        }
      },

      eliminarUsuario: async(solicitud, respuesta) => {
        try{

          const usuarioEliminado = await ModeloUsuario.findByIdAndDelete(solicitud.params.id);//para leer un usuario
  

         if (usuarioEliminado._id){
           respuesta.json({
             resultado: "Bien!",
             mensaje: "Usuario eliminado!",
             datos: usuarioEliminado
           });
         }

        }catch(error){
          console.log("error",error);
          respuesta.json({error: true, mensaje: "ocurrió un error al eliminar usuario"});
        }

      }
}



export default ControladorUsuarios;
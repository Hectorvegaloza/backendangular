import bcrypt from "bcryptjs";
import modeloUsuario from "../modelos/modeloUsuario.js";

    const ControladorUsuarios = {
        crearUsuario: async (solicitud, respuesta) => {
          try {
            const { nombre, correo, contrasenia, } = solicitud.body;
            console.log("fields: ", solicitud.body);
    
            if (nombre.length < 4) {
              return respuesta.json({
                resultado: "mal",
                mensaje: "El nombre debe tener al menos 4 caracteres",
              });
            }
      
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])([^\s]|\s){5,}$/;
            if (!passwordRegex.test(contrasenia)) {
              return respuesta.json({
                resultado: "mal",
                mensaje: "La contraseña debe tener al menos 5 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial",
              });
            }
      
            const passwordProtected = await bcrypt.hash(contrasenia, 10);
            const nuevoUsuario = new modeloUsuario({
              nombre,
              correo,
              contrasenia: passwordProtected,
            });
            const usuarioCreado = await nuevoUsuario.save();
      
            if (usuarioCreado._id) {
              respuesta.json({
                resultado: "bien",
                mensaje: "usuario creado",
                datos: usuarioCreado._id,
              });
            }
          } catch (error) {
            respuesta.json({
              resultado: "mal",
              mensaje: "ocurrió un error al crear usuario",
              datos: error,
            });
            console.log("error:", error);
          }
        },
      
    leerUsuario: async (solicitud, respuesta) => {
        try {
            const usuarioEncontrado = await modeloUsuario.findById(solicitud.params.id) 
            if (usuarioEncontrado.id) {
                respuesta.json({
                    resultado: "bien",
                    mensaje: "usuario leído",
                    datos: usuarioEncontrado
                });
            }
        } catch (error) {
            respuesta.json({
                resultado: "mal",
                mensaje: "ocurrió un error al leer usuario",
                datos: error,
            });
    }
},  
    leerUsuarios: async (solicitud, respuesta) => {
        try {
        const todosLosUsuarios = await modeloUsuario.find();
        respuesta.json({
            resultado: "bien",
            mensaje: "usuarios leídos",
            datos: todosLosUsuarios
        });
        } catch (error) {
        respuesta.json({
            resultado: "mal",
            mensaje: "ocurrió un error al leer todos los usuarios",
            datos: error
        });
        }
    },
    actualizarUsuario: async (solicitud, respuesta) => {
        try {
            const usuarioActualizado = await modeloUsuario.findByIdAndUpdate(
                solicitud.params.id,
                solicitud.body
            );
            if(usuarioActualizado._id) {
                respuesta.json({
                    resultado: 'bien',
                    mensaje: 'usuario actualizado',
                    datos: usuarioActualizado._id,
                });
            }
        }catch (error) {
            respuesta.json({
                resultado: "mal",
                mensaje: 'ocurrió un error al actualizar usuario',
                datos: error,
            });
        }
    },
    eliminarUsuario: async (solicitud, respuesta) => {
        try {
        const usuarioEliminado = await modeloUsuario.findByIdAndDelete(solicitud.params.id)
        if (usuarioEliminado._id) {
            respuesta.json({
            resultado: "bien",
            mensaje: "usuario eliminado",
            datos: null
            });
        }          
        } catch (error) {
        respuesta.json({
        resultado: "mal",
        mensaje: "ocurrió un error al eliminar usuario",
        datos: error
        });
        }
    }
    }


export default ControladorUsuarios;
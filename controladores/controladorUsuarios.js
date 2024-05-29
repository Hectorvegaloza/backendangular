import ModeloUsuario from "../modelos/modeloUsuario.js";

const ControladorUsuarios = {
  
    crearUsuario: async (solicitud, respuesta) => {
      try{

        const nuevoUsuario = new ModeloUsuario(solicitud.body);

         console.log("solicitud:", solicitud.body); 
         const usuarioCreado = await nuevoUsuario.save();
         console.log(usuarioCreado);

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
          respuesta.json({mensaje: "PUT actualizar works!"});

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


// esto va ser para los ejemplos
/* {
  "nombre": "pepita",
  "apellido": "perez",
  "correo": "pepita@gmail.com",
  "contrasenia": "arrozconhuevo",
  "contraseniaconfirm": "arrozconhuevo",
  "apodo": "vega",
  "telefono": "3173375329",
  "foto": "ff.jpg",
  "codigopostal": "100023"
}*/
/* if (usuarioCreado.nombre === "") throw Error ("Falta el nombre"); */
/*if (solicitud.body.apellido === "") throw Error ("Falta el apellido");
if (solicitud.body.correo === "") throw Error ("Falta el correo");
if (solicitud.body.contrasenia === "") throw Error ("Falta la contraseña");
if (solicitud.body.contraseniaconfirm === "") throw Error ("Falta la confirmacion de la contraseña");
if (solicitud.body.apodo === "") throw Error ("Falta el apodo");
if (solicitud.body.telefono === "") throw Error ("Falta telefono");
if (solicitud.body.foto === "") throw Error ("Falta la foto");
if (solicitud.body.codigopostal === "") throw Error ("Falta el codigo postal"); */
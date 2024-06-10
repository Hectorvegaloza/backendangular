
const ControladorInicioSesion = {
    inciarSesion: async (solicitud, respuesta) => {
        try{
            const { username, password} = solicitud.body; /* recibe los datos y envia la confirmacion de que el postman lo envio */
/*           const nuevoUsuario = new ModeloUsuario(solicitud.body);
  
           console.log("solicitud:", solicitud.body); 
           const usuarioCreado = await nuevoUsuario.save();
           console.log(usuarioCreado);
  */
          
   /*          respuesta.json({
              resultado: "Bien!",
              mensaje: "sesion iniciada",
              id: null,
            });
            */
          
        }catch(error){
          console.log("error",error);
          respuesta.json({error: true, mensaje: "ocurrió un error al iniciar sesion"});
        }
        }
}

export default ControladorInicioSesion;

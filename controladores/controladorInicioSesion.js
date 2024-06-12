import bcryptjs from "bcryptjs";
import {verificarToken, generarToken} from "../ayudas/funciones.js"
import modeloUsuario from "../modelos/modeloUsuario.js";



const ControladorInicioSesion = {
    inciarSesion: async (solicitud, respuesta) => {
        try{
            const { username, password} = solicitud.body; /* recibe los datos y envia la confirmacion de que el postman lo envio */
            const usuarioEncontrado = await modeloUsuario.findOne({ /// aqui voy a buscar en la base de datos para encontrar solo uno, pasar buscar y validar el valor
            correo: username})  //este va ser el valor que se va guardar en USERNAME
            
            const contraseniaValidada = await bcryptjs.compare(
              password,
              usuarioEncontrado.contrasenia,
            );
            if (contraseniaValidada) {
              const token = await generarToken({
                id: usuarioEncontrado._id,
                name: usuarioEncontrado.nombre,
              });
              respuesta.json({
                resultado: 'bien',
                mensaje: 'acceso permitido',
                datos: token,
              });
            }else {
            respuesta.json({
              resultado: 'mal',
              mensaje: 'acceso denegado',
              datos: null,
           })}
              
            /*   ,
 */

           /*  console.log(usuarioEncontrado); */  //// se puede observar los datos que encontró con ese nombre
        }catch(error){
          console.log("error",error);
          respuesta.json({error: true, mensaje: "ocurrió un error al iniciar sesion"});
        }
        
},

validarToken: async (solicitud, respuesta) => { /// para validar token del postman
  try{
      const token = solicitud.params.token; /* recibe los datos y envia la confirmacion de que el postman lo envio */

      const decodificado = await verificarToken(token);/* obtengo de los params */
    
      if (decodificado.id) {
          respuesta.json({
          resultado: 'bien',
          mensaje: 'token valido',
          datos: decodificado,
        });
      }else {
      respuesta.json({
        resultado: 'mal',
        mensaje: 'token no valido',
        datos: null,
     })}
  }catch(error){
    console.log("error",error);
    respuesta.json({error: true, mensaje: "ocurrió un error al verificar el TOKEN"});
  }
  
}
}

export default ControladorInicioSesion;

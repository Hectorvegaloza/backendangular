import { Router } from "express";

const enrutadorUsuarios = Router();

enrutadorUsuarios.post('/', (solicitud, respuesta)=>{
    respuesta.json({
     mensaje: "POST usuario works"   
    })
})

enrutadorUsuarios.get('/:id', (solicitud, respuesta)=>{
    respuesta.json({
     mensaje: "GET usuario works"   
    })
})
enrutadorUsuarios.get('/', (solicitud, respuesta)=>{
    respuesta.json({ /* controladores son los encargados de la logica */
     mensaje: "Get varios usuarios WORKS"   
    })
})
enrutadorUsuarios.put('/:id', (solicitud, respuesta)=>{
    respuesta.json({
     mensaje: "PUT usuario works"   
    })
})
enrutadorUsuarios.delete('/:id', (solicitud, respuesta)=>{
    respuesta.json({
     mensaje: "Delete usuario works"   
    })
})

export default enrutadorUsuarios;
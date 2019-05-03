const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const {verificarAutenticacion} = require('./middlewares')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID ='261033829274-ian1d7p7sckvkt2cpas78pj23qoatfub.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

router.post("/registro", (req, res) => {
  var user = req.body; //{name:valor,contrasena:valor,correo:valor}
  console.log(user);

  Usuario.findOne({ correo: user.correo }, (error, UsuarioDB) => {
    if (error) {
      return res.send({
        status: 500,
        error
      });
    }
    if (UsuarioDB) {
      return res.send({
        status: 404
      });
    } else {
      var usuario = new Usuario({
        nombre: user.nombre,
        correo: user.correo,
        contrasena: bcryptjs.hashSync(user.contrasena, 10)
      });
      usuario.save((err, usuarioGuardar) => {
        if (err) {
          console.log(err);

          return res.send({
            status: 500,
            err
          });
        }
        console.log(usuarioGuardar);
        return res.send({
          usuario: usuarioGuardar,
          status: 200
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  var body = req.body;
  Usuario.findOne({ correo: body.correo }, (err, usuarioDB) => {
    if (err) {
      return res.send({
        err
      });
    }

    if (!usuarioDB) {
      return res.send({
        status:404,
        mensaje: "(Usuario) o contraseña incorrectos"
      });
    }

    if (!bcryptjs.compareSync(body.contrasena, usuarioDB.contrasena)) {
      return res.send({
        status:404,
        mensaje: "Usuario o (contraseña) incorrectos"
      });
    }

    req.session._id = usuarioDB._id;
    req.session.nombre = usuarioDB.nombre;
    console.log(req.session._id);
     return res.send({
         status:200,
     })
  });
});
//configuraciones de google

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return  {
    nombre:payload.name,
    correo:payload.email,
    google:true
  }
}

router.post("/google",async(req,res)=>{
  let token = req.body.id_token
  let usuarioGoogle = await verify(token).catch(error=>{
    return res.send({
      status:403,
      error
    })
  })
  try {
    let usuarioDB = await Usuario.findOne({correo:usuarioGoogle.correo})
    if(usuarioDB){
      if(usuarioDB.google===false){
        return res.send({
          status:400,
          mensaje:"Debe autenticarse de la forma normal"
        })
      }else{
        req.session._id= usuarioDB._id;
        req.session.nombre= usuarioDB.nombre;
        return res.send({
          status:200,
          usuario:usuarioDB
        })
      }
    }else{
      let usuario = new Usuario({
        nombre: usuarioGoogle.nombre,
        correo: usuarioGoogle.correo,
        contrasena: bcryptjs.hashSync(":)", 10),
        google:true
      });
      let usuarioGuardado = await usuario.save()
      req.session._id= usuarioGuardado._id;
      req.session._nombre= usuarioGuardado.nombre;
      return res.send({
        status:201,
        usuario:usuarioGuardado
      })
    }
  } catch (error) {
    return res.send({
      status:500,
      error,
      mensaje:"Error Base de datos"
    })
  }
})

router.get("/usuarios",async(req,res)=>{
  let idUsuario= req.session._id;
  let usuarios = await Usuario.find({_id:{$ne:idUsuario}},{_id:1,nombre:1})
  return res.send({
    status:200,
    usuarios
  })
})

router.get("/usuario",verificarAutenticacion,async(req,res)=>{
  let id = req.session._id;
  console.log(id)
  let usuario =await Usuario.findById(id,{nombre:1,correo:1});
  return res.send({
    status:200,
    usuario
  })
})

router.put("/actualizar",verificarAutenticacion,async(req,res)=>{
  let id = req.session._id
  console.log(req.body);
  let nombre = req.body.nombre
  let correo  = req.body.correo
  let contrasena= req.body.contrasena
  let contrasenaActual = req.body.contrasenaActual
  let usuario = await Usuario.findOne({_id:id},{contrasena:1})

  if(!bcryptjs.compareSync(contrasenaActual, usuario.contrasena)){
    return res.send({
      status:400,
      mensaje:"Contrasena Incorrecta"
    })
  }
  let user = {nombre:nombre,contrasena: bcryptjs.hashSync(contrasena, 10),correo:correo}
  if(contrasena){
    let usuarioActualizado = await Usuario.findByIdAndUpdate(id,user,{new:true})
    if(usuarioActualizado){
      req.session.nombre = usuarioActualizado.nombre;
      //console.log(usuarioActualizado)
      return res.send({
        status:200,
        usuario:usuarioActualizado
      })
    }
  }
  //return res.send({usuario})
})

const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];

router.post('/api', async (req, res)=> {
  console.log(req.body)
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes);


  res.json({
    ok: true,
    mensaje
  });
});

module.exports = router;

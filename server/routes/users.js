const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const {verificarAutenticacion} = require('./middlewares')

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

module.exports = router;

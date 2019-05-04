const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
//ruta del modelo
const Archivo = require("../models/archivo");
const Carpeta = require("../models/carpeta");
const Usuario = require("../models/usuario");
const { verificarAutenticacion,VerificarPlan } = require("./middlewares");


router.post("/nueva-carpeta",[verificarAutenticacion,VerificarPlan], async (req, res) => {
  var id = req.session._id;
  var nombre = req.body.nombre;
  var proyectoPadre = req.body.proyectoPadre;
  let archivohtml = new Archivo({contenido: `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
  </head>
  <body>
      
  </body>
  </html>`, propietario: id});
let archivocss = new Archivo({contenido: "body{background:green;}", propietario: id});
let archivojs = new Archivo({contenido: "console.log(' HELLO WORLD')", propietario: id});
let htmlArchivo = await archivohtml.save();
let cssArchivo = await archivocss.save();
let jsArchivo = await archivojs.save();

  if (proyectoPadre != undefined) {
    let carpeta = new Carpeta({
      nombre: nombre,
      propietario: id,
      html: htmlArchivo._id,
      css: cssArchivo._id,
      js: jsArchivo._id,
      proyectoPadre
    });

    let carpetaCreada = await carpeta.save();
    return res.send({carpeta: carpetaCreada, mensaje: "La carpeta se guardo Exitosamente"});
  } else {
    let carpeta = new Carpeta({
      nombre: nombre,
      propietario: id,
      html: htmlArchivo._id,
      css: cssArchivo._id,
      js: jsArchivo._id
    });
    let carpetaCreada = await carpeta.save();
    return res.send({status: 200, carpeta: carpetaCreada, mensaje: "La carpeta se guardo Exitosamente"});
  }
});

// company:{$exists:true}
//del padre
router.get(
  "/obtener-carpetas/:id",
  verificarAutenticacion,
  async (req, res) => {
    var id = req.session._id;
    var idCarpeta = req.params.id;
    var carpetas = await Carpeta.find({
      $and: [{ propietario: id }, { estado: true }, { carpetaPadre: idCarpeta }]
    });

    //para hacer multiples condiciones debe usarse el operador '$and + [condiciones]'

    if (carpetas.length === 0) {
      return res.send({ mesaje: "No se han encontrado capetas", status: 404 });
    }
    return res.send({
      mensaje: "Carpetas ok",
      carpetas: carpetas,
      status: 200
    });
  }
);

//de la raiz
router.get("/obtener-carpetas", verificarAutenticacion, async (req, res) => {
  var id = req.session._id;
  console.log(id);

  var carpetas = await Carpeta.find({
    $and: [
      { propietario: id },
      { estado: true },
      { carpetaPadre: { $exists: false } }
    ]
  });

  //para hacer multiples condiciones debe usarse el operador '$and + [condiciones]'

  if (carpetas.length === 0) {
    return res.send({
      mensaje: "No se han encontrado capetas",
      status: 404,
      carpetas
    });
  }
  return res.send({ mensaje: "Carpetas ok", carpetas: carpetas, status: 200 });
});

//devolver archivos que estan dentro de carpetas
router.get("/carpeta/:id", verificarAutenticacion, async (req, res) => {
  var id = req.session._id;
  var idCarpeta = req.params.id;
  // var archivosCarpeta = await Archivo.find({
  //   $and: [{ propietario: id }, { estado: true }, { carpeta: idCarpeta }]
  // });

  // if (archivosCarpeta.length === 0) {
  //   return res.send({ mesaje: "No se han encontrado archivos", status: 404 });
  // }
  // return res.send({
  //   mensaje: "Archivos ok",
  //   archivos: archivosCarpeta,
  //   status: 200
  // });
  let carpeta = await Carpeta.findOne(
    { $and: [{ _id: idCarpeta }] },
    { _id: 1, html: 1, css: 1, js: 1 }
  )
    .populate({ path: "html", select: "contenido direccionArchivo" })
    .populate({ path: "css", select: "contenido direccionArchivo" })
    .populate({ path: "js", select: "contenido direccionArchivo" });

  return res.send({
    status: 200,
    carpeta
  });
});

router.post("/compartir", verificarAutenticacion, async (req, res) => {
  let idUsuarioCompartido = req.body.idUsuarioCompartido;
  let usuario = req.session._id;
  let idCarpeta = req.body.idCarpeta;
  let user = await Usuario.findByIdAndUpdate(
    idUsuarioCompartido,
    { $push: { carpetasCompartidasConmigo: idCarpeta } },
    { new: true }
  );

  return res.send({ usuaario: user, status: 200 });
});
router.get("/compartidosConmigo", verificarAutenticacion, async (req, res) => {
  let id = req.session._id;
  let compartidas = await Usuario.findById(id, {
    carpetasCompartidasConmigo: 1
  }).populate({
    path: "carpetasCompartidasConmigo",
    select: "nombre descripcion _id"
  });

  let carpetas = compartidas.carpetasCompartidasConmigo;
  return res.send({
    status: 200,
    carpetas
  });
});
router.post("/abrirCarpeta", verificarAutenticacion, async (req, res) => {
  let id = req.body.idCarpeta;
  let idUsuario = req.session._id;
  let carpeta = await Carpeta.findOne(
    { $and: [{ _id: id }] },
    { _id: 1, html: 1, css: 1, js: 1 }
  )
    .populate({ path: "html", select: "contenido direccionArchivo" })
    .populate({ path: "css", select: "contenido direccionArchivo" })
    .populate({ path: "js", select: "contenido direccionArchivo" });
  // req.session.html=carpeta.html.direccionArchivo
  // req.session.css=carpeta.css.direccionArchivo
  // req.session.js=carpeta.js.direccionArchivo

  console.log(carpeta._id);
  req.session.idCarpeta = carpeta._id;
  return res.send({
    status: 200
  });
  // res.send(carpeta)
});

module.exports = router;

// 5cc15e8711fa623c71b74c0e

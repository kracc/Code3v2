const express = require("express");
const router = express.Router();
const Proyecto = require("../models/proyecto");
const Usuario = require("../models/usuario")
const {verificarAutenticacion} = require("./middlewares")
//Obtener proyectos (carpetas) en la raiz
router.get("/proyectos",verificarAutenticacion, async (req, res) => {
  let id = req.session_id;

  let proyectos = await Proyecto.find({
    $and: [
      { propietario: id },
      { estado: true },
      { proyectoPadre: { $exists: false } }
    ]
  });
  if (proyectos.length === 0) {
    return res.send({
      mensaje: "No se han encontrado capetas",
      status: 404,
      proyectos
    });
  }
  return res.send({
    mensaje: "No se han encontrado capetas",
    status: 200,
    proyectos
  });
});

//Crear variable de session de idProyectos
router.post("/abrirProyecto",verificarAutenticacion, async (req, res) => {
  let idProyecto = req.body.idProyecto;
  let idUsuario = req.session._id;
  // let proyecto = await Proyecto.findOne({ $and: [{ _id: idProyecto },{propietario:idUsuario}] })
  // .populate({path:"archivos",select:"nombre _id"})
  // .populate({path:"carpetas",select:"nombre _id"})
  // .populate({path:"proyectos",select:"nombre _id"})

  req.session.idProyecto = idProyecto;
  return res.send({
    status: 200
  });
});

//obtener contenido de carpetas hijas
router.get("/proyecto",verificarAutenticacion, async (req, res) => {
  let idUsuario = req.session._id;
  let idProyecto = req.session.idProyecto;
  let proyecto = await Proyecto.findOne({
    $and: [{ _id: idProyecto },{estado:true}]
  })
    .populate({ path: "archivos", select: "nombre _id" })
    .populate({ path: "carpetas", select: "nombre _id" })
    .populate({ path: "proyectos", select: "nombre _id" });

  if (proyecto) {
    return res.send({
      status: 404,
      mensaje: "No se encontro proyectos con dicho id "
    });
  }
  return res.send({
    status: 200,
    archivos: proyecto.archivos,
    carpetas: proyecto.carpetas,
    proyectos: proyecto.proyectos
  });
});

//crear proyecto (carpetas)
router.post("/proyecto",verificarAutenticacion, async (req, res) => {
  let nombre = req.body.nombre;
  let propietario = req.session._id;
  let idProyectoPadre = req.body.idProyectoPadre;
  if (idProyectoPadre != undefined) {
    let nuevoProyecto = new Proyecto({
      nombre,
      propietario
    });

    let proyecto = await nuevoProyecto.save();

    return res.send({
      status: 200,
      proyecto
    });
  } else {
    let nuevoProyecto = new Proyecto({
      nombre,
      propietario,
      proyectoPadre: idProyectoPadre
    });

    let proyecto = await nuevoProyecto.save();
    return res.send({
      status: 200,
      proyecto
    });
  }
});

router.post("/compartirProyectos",verificarAutenticacion,async(req,res)=>{
    let idUsuario = req.body.idUsuario
    let idProyecto = req.body.idProyecto;
    let usuario = await Usuario.findByIdAndUpdate(idUsuario,{$push:{proyectosCompartidos:idProyecto}},{new:true})
    if(usuario){
        return res.send({
            status:200,
        })
    }else{
        return res.send({
            status:404,
        })
    }
})

router.get("/proyectosCompartidos",verificarAutenticacion,async(req,res)=>{
    let id = req.body._id;
    let usuario = await Usuario.findById(id,{proyectosCompartidos:1}).populate({
        path: "proyectosCompartidos",
        select: "nombre _id"
      });
    let proyectos = usuario.proyectosCompartidos;
    return res.send({
        status:200,
        proyectos
    })
})

module.exports = router;

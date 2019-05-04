const Carpeta = require("../models/carpeta");
const Usuario = require("../models/usuario");
var verificarAutenticacion = (req,res,next) => {
    if(req.session._id) {
        return next();
    } else {
        return res.redirect('/');
    }
}

const VerificarPlan = async (req,res,next)=>{
    var id = req.session._id;
    let usuario = await Usuario.findById(id, { cuenta: 1 });
    let carpetasUsuario = await Carpeta.countDocuments({ propietario: id });
    if(usuario.cuenta.tipoCuenta == 1){
        return next()
    }else{
        if (carpetasUsuario < 3){
            return next()
        }else{
            return res.send({
                status:403,
                mensaje:"No tiene carpetas disponibles para crear"
              })
        }
    }
}

module.exports = {
    verificarAutenticacion,
    VerificarPlan
}

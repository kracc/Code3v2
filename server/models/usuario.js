var mongoose = require("mongoose");

require('./archivo');
var usuarioSchema = new mongoose.Schema(
    {
        nombre:{
            type:String,
            required:[true,'El nombre es obligatorio'],
        },
        correo:{
            type:String,
            lowercase:true,
            required:true
        },
        contrasena:{
            type:String,
            required:[true,"La contrasena es obligatoria"]
        },
        archivosPropios:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Archivo' }],
        archivosCompartidos:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Archivo' }],
        carpetasPropias:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Carpeta' }],
        carpetasCompartidas:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Carpeta' }],
        cuenta:{
            type:Boolean,
            default:false
        },

        
    }
);
//Para no devolver contraseñas 
 usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.contrasena;

    return userObject;
}


module.exports = mongoose.model('Usuario',usuarioSchema);
var verificarAutenticacion = (req,res,next) => {
    if(req.session._id) {
        return next();
    } else {
        return res.redirect('/');
    }
}

module.exports = {
    verificarAutenticacion
}

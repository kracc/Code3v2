const express = require('express');
const app = express();
const {verificarAutenticacion} = require('./middlewares')

app.get("/login",(req,res)=>{
    res.render('login');
});

app.get("/dashboard",verificarAutenticacion,(req,res)=>{
    res.render("Ini",{
        nombre:req.session.nombre,
        idProyecto:req.session.idProyecto
    });
});

app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register");
});

app.get('/logout',verificarAutenticacion,(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});
// app.get('/editor',verificarAutenticacion,(req,res)=>{
//     res.render("editor");
// });

app.get("/editor", verificarAutenticacion, (req, res) => {
    console.log(req.session.carpeta)
    res.render("editor",{idCarpeta:req.session.idCarpeta});
});

module.exports = app;
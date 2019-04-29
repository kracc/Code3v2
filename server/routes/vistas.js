const express = require('express');
const app = express();
const {verificarAutenticacion} = require('./middlewares')

app.get("/login",(req,res)=>{
    res.render('login');
});

app.get("/dashboard",verificarAutenticacion,(req,res)=>{
    res.render("Ini",{
        nombre:req.session.nombre
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



module.exports = app;
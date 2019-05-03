$(function() {
$('#formulario-registro').submit(function(e){
        e.preventDefault();
        //valores
        var nombre = $('#nombre').val();
        var correo = $('#correo').val();
        var contrasena = $('#contrasena').val();
        var contrasenarep = $('#contrasenarep').val();
        var datos = {
        //   clave:valor
            nombre:nombre,
            correo:correo,
            contrasena:contrasena
        }
        $.ajax({
            url:"/registro",
            data: datos,
            dataType: "json",
            method: "POST",
            success: function(respuesta ){
                console.log(respuesta);
                if(respuesta.status===200){
                    $('#alerta').hide();
                    location.href="/login"
                }
                if(respuesta.status===404){
                    $('#alerta-verde').hide();
                    $('#alerta').show();
                }
            }
        })
    })
})
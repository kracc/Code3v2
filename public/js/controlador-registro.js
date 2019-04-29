//codigo que se carga cuando se entra a la pagina
$(function() {
    $('#alerta').hide();
    $('#alerta-verde').hide();
})
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
                    $('#alerta-verde').show();
                }
                if(respuesta.status===404){
                    $('#alerta-verde').hide();
                    $('#alerta').show();
                }
            }
        })
    })

    $("#formulario-login").submit(function(e){
        e.preventDefault();
        var correo = $('#correo').val();
        var contrasena = $('#contrasena').val();
        var datos = {
            correo,
            contrasena
        }

        $.ajax({
            url:"/login",
            data: datos,
            dataType: "json",
            method: "POST",
            success: function(respuesta ){
                console.log(respuesta);
                if(respuesta.status===404){
                    console.log(respuesta.mensaje);
                    $('#alerta-verde').hide();
                    $('#alerta').show();
                }
                if(respuesta.status===200){
                    location.href="/dashboard";
                }
        }

    })

    })

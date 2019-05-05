//codigo que se carga cuando se entra a la pagina
$(function() {
  $("#alerta").hide();
  $("#alerta-verde").hide();
});
$("#formulario-registro").submit(function(e) {
  e.preventDefault();
  //valores
  var nombre = $("#nombre").val();
  var correo = $("#correo").val();
  var contrasena = $("#contrasena").val();
  var contrasenarep = $("#contrasenarep").val();
  var datos = {
    //   clave:valor
    nombre: nombre,
    correo: correo,
    contrasena: contrasena
  };
  $.ajax({
    url: "/registro",
    data: datos,
    dataType: "json",
    method: "POST",
    success: function(respuesta) {
      console.log(respuesta);
      if (respuesta.status === 200) {
        $("#alerta").hide();
        location.href = "/login";
      }
      if (respuesta.status === 404) {
        $("#alerta-verde").hide();
        $("#alerta").show();
      }
    }
  });
});

$("#formulario-login").submit(function(e) {
  e.preventDefault();
  var correo = $("#correo").val();
  var contrasena = $("#contrasena").val();
  var datos = {
    correo,
    contrasena
  };

  $.ajax({
    url: "/login",
    data: datos,
    dataType: "json",
    method: "POST",
    success: function(respuesta) {
      console.log(respuesta);
      if (respuesta.status === 404) {
        console.log(respuesta.mensaje);
        $("#alerta-verde").hide();
        $("#alerta").show();
      }
      if (respuesta.status === 200) {
        location.href = "/dashboard";
      }
    }
  });
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  //console.log(id_token);

//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", "https://yourbackend.example.com/tokensignin");
//   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//   xhr.onload = function() {
//     console.log("Signed in as: " + xhr.responseText);
//   };
//   xhr.send("idtoken=" + id_token);
 var datos={
     id_token
 }
$.ajax({
    url:"/google",
    method:"POST",
    data:datos,
    dataType:"json",
    success:function(respuesta){
        //console.log(respuesta)
        if (respuesta.status === 200) {
            location.href = "/dashboard";
          }
          if (respuesta.status === 400) {
            location.href = "/login";
          }
          if (respuesta.status === 201) {
            location.href = "/dashboard";
          }
          if (respuesta.status === 500) {
            location.href = "/";
          }
    }
})
}

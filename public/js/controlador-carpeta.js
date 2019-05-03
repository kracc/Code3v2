$(function() {
  //cargarCarpetas();
});

$("#creare").submit(function(e) {
  e.preventDefault();
  var nombre = $(".nombre").val();
  var descripcion = $(".descripcion").val();
  var datos = {
    //   clave:valor
    nombre: nombre,
    descripcion: descripcion
  };
  $.ajax({
    url: "/nueva-carpeta",
    data: datos,
    dataType: "json",
    method: "POST",
    success: function(respuesta) {
      console.log(respuesta);
      if (respuesta.status === 200) {
        console.log(respuesta);
        $("#creare").reset();
        $("#exampleModal").modal("hide");
      }
      if (respuesta.status === 404) {
        console.log("mal -_-");
      }
    }
  });
  console.log(descripcion);
});

function cargarCarpetas() {
  $.ajax({
    url: "/obtener-carpetas",
    method: "GET",
    dataType: "json",
    success: function(respuesta) {
      console.log(respuesta);
      $("#proyectos").html("");
      for (var i = 0; i < respuesta.carpetas.length; i++) {
        //idCarpeta=${respuesta.carpetas[i]._id}
        console.log(respuesta.carpetas[i]);
        $("#proyectos").append(/*html*/ `
        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-10 col-12">
          <div class="card tarjetas" style="width: 15rem; height: 15rem;">
            <a><img idCarpeta="${respuesta.carpetas[i]._id}" class="imagen card-img-top archivo" src="img/f2.png" alt="..."/></a>
          <div class="card-body scroll"
    style="overflow-y: hidden; padding-top: 0; overflow-y: auto;">
    <h4>${respuesta.carpetas[i].nombre}</h4>
  </div>
</div>      
</div>`);
      }
    }
  });
}

$("#enlace-p").click(function() {
  $("#proyectos").show();
  $("#bienvenida").hide();
  $.ajax({
    url: "/compartidosConmigo",
    method: "GET",
    dataType: "json",
    success: function(respuesta) {
      console.log(respuesta);
      $("#proyectos").html("");
      for (var i = 0; i < respuesta.carpetas.length; i++) {
        console.log(respuesta.carpetas[i]);
        $("#proyectos")
          .append(/*html*/ `
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-10 col-12">
            <div class="card tarjetas" style="width: 15rem; height: 15rem;">
              <a><img idCarpeta="${respuesta.carpetas[i]._id}" class="imagen card-img-top archivo" src="img/f2.png" alt="..."/></a>
            <div class="card-body scroll"
      style="overflow-y: hidden; padding-top: 0; overflow-y: auto;">
      <h4>${respuesta.carpetas[i].nombre}</h4>
    </div>
  </div>      
  </div>`);
      }
    }
  });
});

$(document).on("click", ".archivo", function() {
  let elemento = $(this)[0];
  let idCarpeta = $(elemento).attr("idCarpeta");
  let parametros = {
    idCarpeta
  };
  console.log(idCarpeta);
  $.ajax({
    url: "/abrirCarpeta",
    method: "POST",
    data: parametros,
    dataType: "json",
    success: function(respuesta) {
      if (respuesta.status === 200) {
        location.href = "/editor";
      }
    }
  });
});

$("#modal4").click(function() {
  $.ajax({
    url: "/usuario",
    method: "GET",
    dataType: "json",
    success: function(respuesta) {
      console.log(respuesta);
      $("#nombreUsuario").val(respuesta.usuario.nombre);
      $("#correoUsuario").val(respuesta.usuario.correo);
    }
  });
});

$("#actualizar").click(function() {
  var nombre = $("#nombreUsuario").val();
  var correo = $("#correoUsuario").val();
  var contrasenaActual = $("#contrasenaActual").val();
  var contrasena = $("#contrasenaNueva").val();
  var datos = {
    nombre,
    correo,
    contrasenaActual,
    contrasena
  };
  $.ajax({
    url: "/actualizar",
    method: "PUT",
    data: datos,
    dataType: "json",
    success: function(respuesta) {
      console.log(respuesta);
      $("#bienvenida").text("Binvenido " + respuesta.usuario.nombre);
    }
  });
});

$("#enlace-proyectos").click(function() {
  $("#bienvenida").hide();
  $('.contenido').toggleClass('abrir');
  cargarCarpetas();
});

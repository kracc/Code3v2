$(function() {
  //cargarCarpetas();
  configurarCuenta();
});

$("#creare").submit(function(e) {
  e.preventDefault();
  var nombre = $(".nombre").val();
  var descripcion = $(".descripcion").val();
  var proyectoPadre = $("#txtCarpetaId").val()

  if(proyectoPadre==""){
    proyectoPadre=undefined
  }
  //console.log(proyectoPadre);
  var datos = {
    //   clave:valor
    nombre: nombre,
    proyectoPadre
    //descripcion: descripcion
  };
  $.ajax({
    url: "/nueva-carpeta",
    data: datos,
    dataType: "json",
    method: "POST",
    success: function(respuesta) {
      console.log(respuesta);
      if (respuesta.status === 200) {
        $("#proyectos").append(
          /* html */
          ` <div class="col-xl-3 col-lg-3 col-md-6 col-sm-10 col-12">
            <div class="card tarjetas" style="width: 15rem; height: 15rem;">
              <a><img idCarpeta="${respuesta.carpeta._id}" class="imagen card-img-top archivo" src="img/carpeta.png" alt="..."/></a>
            <div class="card-body scroll"
      style="overflow-y: hidden; padding-top: 0; overflow-y: auto;">
      <h4>${respuesta.carpeta.nombre}</h4>
    </div>
  </div>      
  </div>`);
      }
      if (respuesta.status === 404) {
        console.log("mal -_-");
      }
      if(respuesta.status===403){
        $("#exampleModal").append(
       ` <div class="alert alert-danger" style ="text-align: center;" role="alert">
          Para continuar actualice a premium.
        </div>`);
      }
    }
  });
});

$("#nuevaCarpeta").submit(function(e) {
  e.preventDefault();
  var nombre = $("#nombreCarpeta").val();
  var proyectoPadre = $("#txtCarpetaId").val()

  if(proyectoPadre==""){
    proyectoPadre=undefined
  }

  //console.log(proyectoPadre);
  var datos = {
    //   clave:valor
    nombre: nombre,
    proyectoPadre
    //descripcion: descripcion
  };
  console.log(datos);
  $.ajax({
    url: "/proyecto",
    data: datos,
    dataType: "json",
    method: "POST",
    success: function(respuesta) {
      console.log(respuesta);
      if (respuesta.status === 200) {
        console.log(respuesta);
        $("#proyectos").append(
          /* html */
          ` <div class="col-xl-3 col-lg-3 col-md-6 col-sm-10 col-12">
            <div class="card tarjetas" style="width: 15rem; height: 15rem;">
              <a><img idCarpeta="${respuesta.proyecto._id}" class="imagen card-img-top proyecto" src="img/f2.png" onclick="cargarProyectos('${respuesta.proyecto._id}')" alt="..."/></a>
            <div class="card-body scroll"
      style="overflow-y: hidden; padding-top: 0; overflow-y: auto;">
      <h4>${respuesta.proyecto.nombre}</h4>
    </div>
  </div>      
  </div>`)
        $("#nuevaCarpeta").reset();
        $("#NuevaCarpeta").modal("hide");
      }
      if (respuesta.status === 404) {
        console.log("mal -_-");
      }
      if(respuesta.status===403){
        $("#exampleModal").append(
       ` <div class="alert alert-danger" style ="text-align: center;" role="alert">
          Para continuar actualice a premium.
        </div>`);
      }
    }
  });
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
  //cargarCarpetas();
  cargarProyectos();
});

$("#guardarCuenta").click(function () {
  var tarjeta = $("#txtTarjeta").val();
  var datos = {
    tarjeta
  };
  $.ajax({
    url: "/actualizarPlan",
    method: "POST",
    data: datos,
    dataType: "json",
    success: function (respuesta) {
      if (respuesta.status === 200) {
        $("#configurarCuenta").html("");
        $("#exampleModalLabel2-1").text("Mensaje de Confirmacion");
        $("#configurarCuenta").html(/* html */
        `
        <div class="form-group">
          <img src="img/Visa-MasterCard-1024x393.png" style="margin-left:29%">
          <p style="color:antiquewhite">Gracias por apoyar este proyecto</p>
        </div>
        `);
        $("#cerrar").text("Cerrar");
        $("#guardarCuenta").hide();
      }
    }
  });
});

function configurarCuenta() {
  $.ajax({
    url: "/usuario",
    method: "GET",
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      if (respuesta.usuario.cuenta.tipoCuenta) {
        console.log("aqui estoy");
        $("#cuentaMensaje").text("")
        $("#configurarCuenta").html("");
        $("#configurarCuenta").append(
        /* html */
        `<div class="form-group">
          <p style="color:antiquewhite">Actualmente tienes una cuenta tipo premium puedes relajarte y programar un poco. Gracias por apoyar este proyecto</p>
        </div>
        `);
        $("#cerrar").text("Cerrar");
        $("#guardarCuenta").hide();
      } 
    }
  });
}

function cargarProyectos(id){
  console.log(id);
  if(id==""){
    id = undefined
  }
  var datos ={
    proyectoPadre:id
  }
  $.ajax({
    url:"/proyectos",
    method:"POST",
    data:datos,
    dataType:"json",
    success:function(respuesta){
      console.log(respuesta);
      var valor =id
      $("#txtCarpetaId").val(valor )
      $("#proyectos").html("")
      for (var i = 0; i < respuesta.proyectos.length; i++) {
        //idCarpeta=${respuesta.carpetas[i]._id}
        $("#proyectos").append(
        /* html */
        ` <div class="col-xl-3 col-lg-3 col-md-6 col-sm-10 col-12">
          <div class="card tarjetas" style="width: 15rem; height: 15rem;">
            <a><img idCarpeta="${respuesta.proyectos._id}" class="imagen card-img-top proyecto" src="img/f2.png" onclick="cargarProyectos('${respuesta.proyectos[i]._id}')" alt="..."/></a>
          <div class="card-body scroll"
    style="overflow-y: hidden; padding-top: 0; overflow-y: auto;">
    <h4>${respuesta.proyectos[i].nombre}</h4>
  </div>
</div>      
</div>`);
      }
      for (var i = 0; i < respuesta.carpetas.length; i++) {
        //idCarpeta=${respuesta.carpetas[i]._id}
        console.log(respuesta.carpetas[i]);
        $("#proyectos").append(
        /* html */
        ` <div class="col-xl-3 col-lg-3 col-md-6 col-sm-10 col-12">
          <div class="card tarjetas" style="width: 15rem; height: 15rem;">
            <a><img idCarpeta="${respuesta.carpetas[i]._id}" class="imagen card-img-top archivo" src="img/carpeta.png" alt="..."/></a>
          <div class="card-body scroll"
    style="overflow-y: hidden; padding-top: 0; overflow-y: auto;">
    <h4>${respuesta.carpetas[i].nombre}</h4>
  </div>
</div>      
</div>`);
      }
      
    }
  })

}
$(function(){
    cargarArchivos();
    cargarUsuarios();
})

function cargarArchivos(){
    var idCarpeta = $("#idCarpeta").val();
    $.ajax({
        url:`/carpeta/${idCarpeta}`,
        method:"GET",
        dataType:"json",
        success:function(respuesta){
            //console.log(respuesta);
            if(respuesta.status===200){
                $("#idhtml").val(respuesta.carpeta.html._id)         
                $("#idcss").val(respuesta.carpeta.css._id)
                $("#idjs").val(respuesta.carpeta.js._id)
                eh.setValue(respuesta.carpeta.html.contenido)
                ec.setValue(respuesta.carpeta.css.contenido)
                ej.setValue(respuesta.carpeta.js.contenido)
            }
            
        }
    })
}

$("#guardar").click(function(){
    var idCarpeta = $("#idCarpeta").val();
    var html = $("#idhtml").val()         
    var css = $("#idcss").val()
    var js = $("#idjs").val()
    var contenidohtml =eh.getValue(); 
    var contenidocss =ec.getValue();
    var contenidojs = ej.getValue(); 
    datos = {
        idCarpeta,
        html,
        css,
        js,
        contenidohtml,
        contenidocss,
        contenidojs
    }

    $.ajax({
        url:"/actualizrArchivos",
        method:"POST",
        data:datos,
        dataType:"json",
        success:function(respuesta){
            if(respuesta.status===200){
                location.href="/dashboard";
            }
        }
    })
})

function cargarUsuarios(){
    $.ajax({
        url:"/usuarios",
        method:"GET",
        dataType:"json",
        success:function(respuesta){
            console.log(respuesta)
            $("#usuarios").html("");
            for(var i=0;i<=respuesta.usuarios.length;i++){
                $("#usuarios").append(/*html */
                    `<tr>
                    <th scope="row"></th>
                    <td>${respuesta.usuarios[i].nombre}</td>
                    <td><button onclick="compartir('${respuesta.usuarios[i]._id}')" class="btn btn-success compartido">Compartir</button></td>
                </tr>`)
            }
        }
    })
}

function compartir(idUusuario){
    var idUsuarioCompartido = idUusuario
    var idCarpeta = $("#idCarpeta").val();
    var datos={
        idUsuarioCompartido,
        idCarpeta
    }
    $.ajax({
        url:"/compartir",
        method:"POST",
        data:datos,
        dataType:"json",
        success:function(respuesta){
            console.log(respuesta);
            $('#exampleModal').modal('hide');
            
        }
    })
     

}



import { link } from "fs";

$(function() {
    $('.proyectos').hide();
    let estado_enlace = false;
})

$('#enlace-proyectos').on('click', function(){
    let estado_enlace;
    // $('#bienvenida').toggleClass('ocultarbienvenida');
     $('#bienvenida').hide('#bienvenida');
     $('.proyectos').toggleClass('.proyectos');
    // $('#exampleModal').show('#exampleModal');    
 });
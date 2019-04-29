$('.menu-bar').on('click', function(){
    $('.contenido').toggleClass('abrir');
    
});

$('#modal1').on('click', function(){
   // $('#bienvenida').toggleClass('ocultarbienvenida');
    $('#bienvenida').hide('#bienvenida');
   // $('#exampleModal').show('#exampleModal');
});

$('#modal2-1').on('click', function(){
     $('#bienvenida').hide('#bienvenida');
     
 });

 //Llamar toda lo básico
 function generarItems(proyectos){
    //console.log('GENERAR ITEMS');

        document.getElementById(project._id).innerHTML += 
                `<div class="row">
                <div class="col-sm-4"  id="${project._id}">
                  <div class="card text-white bg-dark">
                    <div class="card-body">
                      
                      <p class="card-text">With supporting text below as a natural lead-in to additional content.
                      </p>
                      
                      <button type="submit" class="btn btn-secondary btn-block" style="text-align: left;">
                         <h5 class="card-title">Special title treatment</h5>
                         Editar...
                      </button>
                      
                    </div>
                  </div>
                </div>
          </div>`;
}

 //manejo de los tipos de cuenta
var cuenta=true;
if (cuenta == false){
    $('<a class ="delLista" id="modal2" href="#exampleModa2-1" data-toggle="modal" data-target="#exampleModa2-1">Cuenta</a>').replaceAll('#modal2');  
}
else
$('<a class ="delLista" id="modal2" href="#exampleModa2-2" data-toggle="modal" data-target="#exampleModa2-2">Cuenta</a>').replaceAll('#modal2');  

function errormas([]){
    $('#exampleModal').modal('hide')
}
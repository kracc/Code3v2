
if(navigator.serviceWorker){
    console.log("Podemos usarlos")
    navigator.serviceWorker.register("/sw.js")
}


// const db = new PouchDB("mensajes");
// function guardarMensaje(mensaje){
//     mensaje._id = new Date().toISOString();
//     db.put(mensaje)
//     .then(()=>{
//        // console.log("repuesta");

//        self.registration.sync.register("nuevo-post")
//     }) 
// }

$(function(){
    var mensaje = {user: "Iroman",mensaje:"Soy inevitable"}
    fetch('api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( mensaje )
        }).then( res => res.json() )
        .then( res => console.log( 'app.js', res ))
})




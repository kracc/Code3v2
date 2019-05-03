
importScripts("pouchdb.min.js")
self.addEventListener("fetch",(e)=>{
    if ( e.request.url.includes('/api') ) {

        // return respuesta????
        respuesta = manejoApiMensajes(e.request );
        e.respondWith( respuesta );
    }
})

self.addEventListener('sync', e => {

    console.log('SW: Sync');

    if ( e.tag === 'nuevo-post' ) {

        // postear a BD cuando hay conexión
        const respuesta = postearMensajes();
        
        e.waitUntil( respuesta );
    }



});

//utilidades
function manejoApiMensajes(req){
    if ( self.registration.sync ) {
        return req.clone().text().then( body =>{

            // console.log(body);
            const bodyObj = JSON.parse( body );
            return guardarMensaje( bodyObj );

        });
}
}


const db = new PouchDB('mensajes');


function guardarMensaje( mensaje ) {

    mensaje._id = new Date().toISOString();

    return db.put( mensaje ).then( () => {

        self.registration.sync.register('nuevo-post');

        const newResp = { ok: true, offline: true };

        return new Response( JSON.stringify(newResp) );

    });

}

function postearMensajes() {

    const posteos = [];

    return db.allDocs({ include_docs: true }).then( docs => {


        docs.rows.forEach( row => {

            const doc = row.doc;

            const fetchPom =  fetch('api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( doc )
                }).then( res => {
                    console.log(doc);
                    return db.remove( doc );

                });
            
            posteos.push( fetchPom );

        }); // fin del foreach

        return Promise.all( posteos );
    });
}
const firebaseConfig = {
    apiKey: "AIzaSyD9vM-58fv2Vdd921GAL-eixtbtMh45sKE",
    authDomain: "globalkorban-326ef.firebaseapp.com",
    projectId: "globalkorban-326ef",
    storageBucket: "globalkorban-326ef.appspot.com",
    messagingSenderId: "163529659898",
    appId: "1:163529659898:web:bcc0c58d3f59c778c14043",
    measurementId: "G-8RQ7P75EG9"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const datos = (callback) => db.collection('vehiculos').onSnapshot(callback);
const url = window.location.search;
let sess = null;
const getSid = (url) =>{
    if(!url){return}
    // console.log(url.split('&')[1].split('=')[1])
    return url.split('&')[1].split('=')[1]
}

const init = () =>{
    sess = wialon.core.Session.getInstance(); 
    sess.loadLibrary("itemIcon"); 
    sess.updateDataFlags(
	[{type: "type", data: "avl_unit", flags: 1025, mode: 0}], 
		function (code) { 
    		if (code) { alert(wialon.core.Errors.getErrorText(code)); return; }
	    	const units = sess.getItems("avl_unit");
            
    		if (!units || !units.length){ console.log("Units not found"); return; } 
            $('#datos').html('');
            let vehiculos = []
            units.forEach((data) => {
                let id = data.getName();
                vehiculos.push({
                    placa:id
                })
            });
            mostrar(vehiculos)
	    }
	);
}

const mostrar = (objs) =>{
    console.log(objs)
    objs.forEach((data, elemento)=>{
        let placa= data.placa;
        $('#datos').append(`
        <tr>
            <th scope="row">${elemento}</th>
            <td>${placa}</td>
            <td>
                <button class="btn btn-success ver" data-id="${data.placa}">
                     Ver
                </button>
            </td>
        </tr>
    `);
    })
    const ver = document.querySelectorAll(".ver");
        ver.forEach(btn => {
            btn.addEventListener('click', (e) => {
                buscar(e.target.dataset.id)
            })
        })
}
const buscar = (placa) =>{
    
    datos((data) =>{
        data.forEach(obj =>{
            let t = obj.data();
            console.log()
            if(t.Placa === placa){
                let arreglo = {
                    clase:t.Clase,
                    marca:t.Marca,
                    serie:t.Serie,
                    motor:t.Motor,
                    linea:t.Linea,
                    unidad:t.Tipo,
                    imei:t.Imei,
                    gps:t.gps,
                    usurio: t.usuario,
                    ident:t.ident
                }
                localStorage.setItem(placa, JSON.stringify(arreglo))
                // location.href = "assents/pages/certificacion.html";
            }
        })
    })
}

$(document).ready(function () {
	wialon.core.Session.getInstance().initSession("https://hst-api.wialon.com");
	wialon.core.Session.getInstance().loginAuthHash(getSid(url),function pruebas(code) {
        if (code){ console.log(wialon.core.Errors.getErrorText(code)); return; }
        init()
    })
});
const url = window.location.search;
let sess = null;
const getSid = (url) =>{
    if(!url){return}
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
            mostrar(...vehiculos)
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
                <button class="btn btn-success" onclick="buscar(${data.placa})">
                     Ver
                </button>
            </td>
        </tr>
    `)
    })
}
const buscar = (...placa) =>{
    console.log(placa)
}

$(document).ready(function () {
	wialon.core.Session.getInstance().initSession("https://hst-api.wialon.com");
	wialon.core.Session.getInstance().loginAuthHash(getSid(url),function pruebas(code) {
        if (code){ console.log(wialon.core.Errors.getErrorText(code)); return; }
        init()
    })
});
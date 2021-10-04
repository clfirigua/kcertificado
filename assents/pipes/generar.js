const clase = document.getElementById('clase');
const marca = document.getElementById('marca');
const serie = document.getElementById('serie');
const motor = document.getElementById('motor');
const linea = document.getElementById('linea');
const tiunidad = document.getElementById('tiunidad');
const imei = document.getElementById('imei');
const idegps = document.getElementById('idegps');
const nombre = document.getElementById('nombre');
const cc = document.getElementById('cc');


const generarPdf = ()=>{
    console.log('ver')
    const $elementoParaConvertir = document.getElementById('documento');

html2pdf()
    .set({
        margin: 1,
        filename: 'Certificado.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 3,
            letterRendering: true,
        },
        jsPDF: {
            unit: "in",
            format: "a4",
            orientation: 'portrait'
        }
    })
    .from($elementoParaConvertir)
    .save()
    .catch(err => console.log(err));

}

const printPdf = (obj) => {
    console.log(clase)
    try {
        clase.innerHTML = obj.clase;
        marca.innerHTML = obj.marca;
        serie.innerHTML = obj.serie;
        motor.innerHTML = obj.motor;
        linea.innerHTML = obj.linea;
        tiunidad.innerHTML = obj.unidad;
        imei.innerHTML = obj.imei;
        idegps.innerHTML = obj.gps;
        nombre.innerHTML = obj.usurio;
        cc.innerHTML = obj.ident;

        generarPdf()
    } catch (error) {
        console.log(error)
    }

}


const buscar = () => {

    try {
        let data = JSON.parse(localStorage.getItem('data'));
        printPdf(data);
    } catch (err) {
        alert(err)
    }
}

buscar()




  window.addEventListener("load", inicio);

 function inicio(){
     document.getElementById("mostrar").addEventListener("click", mostrarACoco);
 }

function mostrarACoco(){
    const coordenadas = "{3311014444}";

    // Comprobamos que el formato de las Coordenadas Artesanas sea el correcto
    if(formatoCoordenadasOK(coordenadas)){
        let coorConComas = [];
        coorConComas = ponerComas(coordenadas);
 
        const coorConPuntos = [];
        coorConComas.map( e => {
            // Poner el punto de decimal en las coordenadas que tengan 2 o más digitos
            if(e[0].length>=2 && e[1].length>=2){
                const latitudes = [];
                const longitudes = [];

                // Guardamos latitudes con 2 o más dígitos, con punto en un array
                for(let j=0; j<e[0].length-1; j++) {
                    lat = e[0].substring(0,j+1)+"."+e[0].substring(j+1,e[0].length);
                    latitudes.push(lat);
                    }

                    // Guardamos longitudes con 2 o más dígitos, con punto en otro array
                    for(j=0; j<e[1].length-1; j++) {
                    lng = e[1].substring(0,j+1)+"."+e[1].substring(j+1,e[1].length);
                    longitudes.push(lng);
                }

                // Recorremos ambas arrays y construímos una con todas las coordenadas posibles, con el punto decimal
                for(j=0; j<latitudes.length; j++){
                    for(let z=0; z<longitudes.length; z++){
                        coorConPuntos.push([latitudes[j],longitudes[z]])
                    }
                }
            }
        });

        // Descartamos coordenadas incorrectas
        let coorSinEmpezarPorCero = descartarComienzosPorCero(coorConPuntos);
        let coorConSignos = ponerSignos(coorSinEmpezarPorCero);
        let coorConValoresOK = evaluarValores(coorConSignos);
 
        // Enviar POST a la API
        lanzarPostApi(coorConValoresOK);
    }else{
        console.log("Formato de coordenadas incorrecto. Vuelva a intentarlo");
    }
    
}

function lanzarPostApi(arrayCoordenadas){
    const url= "https://donde-esta-supercoco.vercel.app/api/reto/2";

    arrayCoordenadas.map( (e, index) => {
 
        const data = `{"solution":"{${e[0]},${e[1]}}"}`;
        const post = {
            id: index,
            method:'POST',
            headers: {"Content-type":"application/x-www-form-urlencoded"},
            body:data
        };
        
        fetch(url,post)
        .then((response) => response.json())
        .then((data) => {
            console.log(`id: ${post.id} - {${e[0]},${e[1]}}`, 'Success:', data);
            data.supercoco_is_here ? (document.getElementById("parrafo").innerHTML= `${data.status}<br /><h2>id: ${post.id} -> {${e[0]},${e[1]}}</h2><img src=${data.supercoco_is_here} />>`)  : ""
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } );
}

function formatoCoordenadasOK(coordenadas) {
    const l_coordenadas = coordenadas.length;
 
    // Devolver false si tiene menos de 4 dígitos
    if(l_coordenadas<6){
        return false;
    }

    // Devolver false si contiene algún caracter que no sea un número, o no está entre llaves
    if( (coordenadas.substring(0,1)==="{") && (coordenadas.substring(l_coordenadas-1,l_coordenadas)==="}") ){
         for(let i=1; i<=l_coordenadas-2; i++){
            if(isNaN(coordenadas.substring(i,i+1))){
                return false;
            }
        }
    } else {
        return false;
    }

    return true;
}

function ponerComas(coordenadas){
    const coorConComas = [];
 
    for(let i=1; i<coordenadas.length-2; i++){
        coorConComas[i-1]=[coordenadas.substring(1,i+1),coordenadas.substring(i+1,coordenadas.length-1)];
    }
    
    return coorConComas;
}

function descartarComienzosPorCero(array){
    const array2 = [];

    // Descartar las coordenadas que comienzan por cero
    array.map( e => {
 
        ( (e[0].substring(0,1)==="0") || (e[1].substring(0,1)==="0") ) ? "" : array2.push([e[0], e[1]]);
    });   
    
    return array2;
}

function evaluarValores(array){
    const array2 = [];

    // Descartar para latitudes valores que no estén entre -90 y 90, y para longitudes los que no estén entre -180 y 180
    array.map( e => {
        lat=parseFloat(e[0]);
        lng=parseFloat(e[1]);
        ( (lat>=-90 && lat<=90) && (lng>=-180 && lng<=180) ) ? array2.push([e[0],e[1]]) : "";
    });

    return array2;
}

function ponerSignos(array){
    const array2 = [];

    // Añadir coordenadas con signos
    array.map( e => {
        array2.push([e[0],e[1]]);
        array2.push([`-${e[0]}`,e[1]]);
        array2.push([e[0],`-${e[1]}`]);
        array2.push([`-${e[0]}`,`-${e[1]}`]);
    });

    return array2;
}
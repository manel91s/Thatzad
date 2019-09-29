window.onload=function() {

    var arrayresultado = []
    var arrayresultado2 = []

    consultarTemperaturas()

    
    //Recuperar las temperaturas del localStorage
    if(localStorage.getItem('temperatura')!=undefined){
        // leer el Storage
        var codigoPostal = localStorage.getItem('codigopostal');
        var temperatura = localStorage.getItem('temperatura');

        var arrayTemperatura = JSON.parse(temperatura);

        console.log(arrayTemperatura)

        for(i=0; i<arrayTemperatura.list.length; i++) {
            arrayresultado2.push(arrayTemperatura.list[i]);
        }

        //console.log(arrayresultado2)


        for(i=0; i<arrayTemperatura.list.length; i+=8) {

            arrayresultado.push(arrayTemperatura.list[i]);
            
        }
        
       

        var pais = {
            ciudad: arrayTemperatura.city.name,
            temp: arrayresultado
            
        }
        

        //console.log(pais)

        listatemperaturas(arrayresultado2,pais,codigoPostal)

        
}

}

function consultarTemperaturas() {

    var datos = new FormData()

    datos.append('opcion','B')

    fetch('proceso.php', {

        method: 'POST',
        body:datos

        

    })
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json()
            } else {
                console.log(respuesta)
                throw ('error en la llamada AJAX')

            }
        })
        .then(function (datos) {
            if(datos[0]=='00') {
                ultimasTemperaturas(datos[1])
            }
            
            
            
        })
        .catch(function (error) {
            alert(error)
        })
}



function listatemperaturas(array1, array2,cp) {
    console.log(array2)



    //imagenes dias
    document.querySelector("#t1").src=`img/${array1[0].weather[0].icon}.png`
    document.querySelector(".t1").src=`img/${array1[0].weather[0].icon}.png`
    document.querySelector("#t2").src=`img/${array1[1].weather[0].icon}.png`
    document.querySelector("#t3").src=`img/${array1[2].weather[0].icon}.png`
    document.querySelector("#t4").src=`img/${array1[3].weather[0].icon}.png`
    
    //imagenes proximos 5 dias
    document.querySelector("#t5").src=`img/${array2.temp[0].weather[0].icon}.png`
    document.querySelector("#t6").src=`img/${array2.temp[1].weather[0].icon}.png`
    document.querySelector("#t7").src=`img/${array2.temp[2].weather[0].icon}.png`
    document.querySelector("#t8").src=`img/${array2.temp[3].weather[0].icon}.png`



   

    //Codigo postal y ciudad
    document.querySelector("#ciudad").innerHTML=` <strong>${array2['ciudad']}</strong>`
    document.querySelector("#cp").innerHTML=` <strong>${cp}</strong>`

    //horas

     //recuperar fecha y hora
     var horas1 = array1[1].dt_txt
     var horas2 = array1[2].dt_txt
     var horas3 = array1[3].dt_txt
     

     //recojer la hora
     var hora1 = horas1.substring(11, 16);
     var hora2 = horas2.substring(11, 16);
     var hora3 = horas3.substring(11,16);
     

     //printar horas
     document.querySelector("#hora1").innerHTML=hora1
     document.querySelector("#hora2").innerHTML=hora2
     document.querySelector("#hora3").innerHTML=hora3

     
     

    //Temperatura proximos dias -----
    document.querySelector("#ahora1").innerHTML=Math.round(array1[0]['main']['temp'])+"º"
    document.querySelector("#ahora2").innerHTML=Math.round(array1[0]['main']['temp'])+"º"
    document.querySelector("#h1").innerHTML=Math.round(array1[1]['main']['temp'])+"º"
    document.querySelector("#h2").innerHTML=Math.round(array1[2]['main']['temp'])+"º"
    document.querySelector("#h3").innerHTML=Math.round(array1[3]['main']['temp'])+"º"

    //Proximos 5 dias -----
    document.querySelector("#d1").innerHTML=Math.round(array2['temp'][0]['main']['temp'])+"º"
    document.querySelector("#d2").innerHTML=Math.round(array2['temp'][1]['main']['temp'])+"º"
    document.querySelector("#d3").innerHTML=Math.round(array2['temp'][2]['main']['temp'])+"º"
    document.querySelector("#d4").innerHTML=Math.round(array2['temp'][3]['main']['temp'])+"º"

}

function ultimasTemperaturas(temperaturas) {
    console.log(temperaturas)


   

    //temperaturas
    document.querySelector("#tmp1").innerHTML=temperaturas[0].temperatura + "º";
    document.querySelector("#temp2").innerHTML=temperaturas[1].temperatura + "º";
    document.querySelector("#temp3").innerHTML=temperaturas[2].temperatura + "º";
    document.querySelector("#temp4").innerHTML=temperaturas[3].temperatura + "º";
    document.querySelector("#temp5").innerHTML=temperaturas[4].temperatura + "º" ;

    //codigos postales
    document.querySelector("#cps1").innerHTML=`<strong>${temperaturas[0].cp}</strong>`
    document.querySelector("#cps2").innerHTML=`<strong>${temperaturas[1].cp}</strong>`;
    document.querySelector("#cps3").innerHTML=`<strong>${temperaturas[2].cp}</strong>`;
    document.querySelector("#cps4").innerHTML=`<strong>${temperaturas[3].cp}</strong>`;
    document.querySelector("#cps5").innerHTML=`<strong>${temperaturas[4].cp}</strong>`;

    //ciudades
    document.querySelector("#cds1").innerHTML=`<strong style="font-size:20px">${temperaturas[0].nombre}</strong>`;
    document.querySelector("#cds2").innerHTML=`<strong style="font-size:20px">${temperaturas[1].nombre}</strong>`;
    document.querySelector("#cds3").innerHTML=`<strong style="font-size:20px">${temperaturas[2].nombre}</strong>`;
    document.querySelector("#cds4").innerHTML=`<strong style="font-size:20px">${temperaturas[3].nombre}</strong>`;
    document.querySelector("#cds5").innerHTML=`<strong style="font-size:20px">${temperaturas[4].nombre}</strong>`;






}
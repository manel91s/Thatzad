<?php
	
	//LLAMADA A UN RECURSO EXTERNO (WEB SERVICE) DESDE NUESTRO CONTROLADOR PHP UTILIZANDO LA LIBRERIA CURL

  	class peticionCurl {
    
        public function consultar() {

            //url a consultar
            $url = "http://api.idescat.cat/pob/v1/cerca.json?p=tipus/com";

            //inicializar recurso 
            $ch = curl_init();

            //definir opción para consulta de la url especificada
            curl_setopt($ch, CURLOPT_URL, $url);

            //definir opción de respuesta:
            //a true, obtendremos los datos de la url, en otro caso se mostrarán directamente en el navegador. 
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            //opción para tipo de acción que queremos utilizar para la petición: post, get, put o delete
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");

            //obtenemos la respuesta
            $respuesta = curl_exec($ch);

            // Se cierra el recurso CURL para liberar recursos
            curl_close($ch);

            if(!$respuesta) {
                return false;
            }else{
                return $respuesta;
            }
        }
    }

    $obj = new peticionCurl();

    $datos = $obj ->consultar();

    //la respuesta es directamente un json que podemos enviar a JS
    echo $datos;
?>
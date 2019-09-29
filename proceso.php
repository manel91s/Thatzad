<?php

require 'modelo/insertar_temperaturas.php';

$opcion = $_POST['opcion'];
$temperaturas = new Temperaturas();
switch ($opcion) {

    case 'A':

    $cp = $_POST['cp'];
    $temps = [];
    $url = "http://api.openweathermap.org/data/2.5/forecast?zip=$cp,es&units=metric&APPID=d7f99687f226f1327c51a0c6f0c42f61";
    
  
    
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
    
                $array = json_decode($respuesta,true);
    
                for($i=0; $i<sizeof($array['list']); $i=$i+8) {
                    
                    $temp = array($array['list'][$i]);
                    //print_r($array['list'][$i]);
                }
    
                $temps = array($array['city']['name'],$temp);
    
                //print_r($temps[0]);
                //print_r($temps[1][0]['main']['temp']);
                
    
                //print_r($array['list'][$i][0][1]);
                if(!$respuesta) {
                    
                    return false;
                    
                }else{
                    $ciudades = array('00',$respuesta);
                    $mensaje = $temperaturas->insertarTemperaturas($cp,$temps[0],$temps[1][0]['main']['temp']);
                    
                }
                
               
                echo json_encode($ciudades);

        break;

        case 'B':

       

        //Consulta de las 5 ultimas temperaturas

        try {

          $consulta = $temperaturas->consultarTemperaturas();
            //devolvemos el array en formato json con codigo de error
           $respuesta = array('00',$consulta);
           
           echo json_encode($respuesta);
          
    
        }catch(Exception $e) {
            $mensaje = $e->getCode().' '.$e->getMessage();
            $respuesta=array('99', $error);
    }


     
}


?>
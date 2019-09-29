<?php

require 'conexion_temperatura.php';

class Temperaturas extends Conexion {
    public function insertarTemperaturas($cp,$nombre,$temp) {

        try {
          
            $stmt = $this->dbh->prepare("INSERT INTO ciudad VALUES(:cp, :nombre, :temperatura)");
            $stmt->bindParam(':cp', $cp);
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':temperatura', $temp);

            $stmt->execute();


        }catch(PDOException $e) {

            if($stmt->errorInfo()[1]==1062) {
                
                $stmt = $this->dbh->prepare("UPDATE ciudad SET nombre=:nombre, temperatura=:temperatura 
                WHERE cp=:cp");

                $stmt->bindParam(':nombre', $nombre);
                $stmt->bindParam(':temperatura', $temp);
                $stmt->bindParam(':cp', $cp);

                $stmt->execute();


            }else {
                echo $error->getMessage(),$e->getCode();
            }
            //throw new Exception($e->getMessage(),$e->getCode());

        }
    }


    public function consultarTemperaturas() {
        $array_filas = [];
        try {
            $stmt = $this->dbh->prepare("SELECT * FROM ciudad ORDER BY temperatura ASC LIMIT 5");

            $stmt->setFetchMode(PDO::FETCH_ASSOC);

            $stmt->execute();

            while ($fila = $stmt->fetch()){
                array_push($array_filas,$fila);
            }

            return $array_filas;


            
        } catch(PDOException $error) {
            echo $error->getMessage();
    
            
         }

    }

}


?>
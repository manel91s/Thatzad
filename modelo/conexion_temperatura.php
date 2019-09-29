<?php
class Conexion {
    //atributo de conexion a la base de datos en PDO utilizamos dbh
    protected $dbh;
    public function __construct() {
        try{
            $dsn = "mysql:host=localhost;dbname=temperaturas;charset=UTF8";
            $this->dbh = new PDO($dsn, 'root', '');
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch (PDOException $e) {
            throw new Exception('dbh: '.$e->getMessage(), $e->getCode());
        }
    }

}


//$dbh = new Conexion;


?>
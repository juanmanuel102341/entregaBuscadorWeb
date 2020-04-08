<?php
require("libreria.php");
$ciudad=$_POST["ciudad"];
$tipo=$_POST["tipo"];
$precioMin=$_POST["precioMin"];
$precioMax=$_POST["precioMax"];
$response["ciudad"]=$ciudad;
$response["tipo"]=$tipo;
$response["precioMin"]=$precioMin;
$response["precioMax"]=$precioMax;
$datosXCiudad=getDataCiudad($ciudad);
$datosXTipo=getDataTipo($datosXCiudad,$tipo);
$data=DataXrangoPrecios($datosXTipo,$precioMin,$precioMax);

echo json_encode($data);
 ?>

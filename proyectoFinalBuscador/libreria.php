
<?php
function getData(){
$file=fopen("data-1.json","r");

$arrBase=fread($file,filesize("data-1.json"));
$arr=json_decode($arrBase,true);
fclose($file);
return $arr;
}
function DataXrangoPrecios($arrData2,$pmin,$pmax){
   $objs=array();
   $precioObj="";
  for($i=0;$i<count($arrData2);$i++){
    $precioObj=$arrData2[$i]['Precio'];
    $precioObj2=preg_replace('/,/','',$precioObj);
    $precioObj3=preg_replace('/[^A-Za-z0-9\-]/','',$precioObj2);//remueve carateres espciales
    $num=(int)$precioObj3;
     if($num>=$pmin&&$num<=$pmax){
      $objs[count($objs)]=$arrData2[$i];
    }
  }
  return $objs;
}
function getDataCiudad($ciudadBuscada){
  $data=getData();
  $coleccion=array();
    for($i=0;$i<count($data);$i++){
      if($ciudadBuscada==$data[$i]['Ciudad']||$ciudadBuscada=="todas"){
        $coleccion[count($coleccion)]=$data[$i];
      }
    }
    return $coleccion;
}
function getDataTipo($coleccionBase,$tipoBuscado){
  $coleccion=array();
  for($i=0;$i<count($coleccionBase);$i++){
    if($tipoBuscado==$coleccionBase[$i]['Tipo']||$tipoBuscado=="todos"){
      $coleccion[count($coleccion)]=$coleccionBase[$i];
    }
  }
  return $coleccion;
}
function getDataOpciones(){
  $arrData2=getData();
  $ciudades=array();
  $tipos=array();
  $activoCiudades=false;
  $activoTipos=false;
  $ciudadPot="";
  $tipoPot="";
  $arrOpciones=array();
    for($i=0;$i<count($arrData2);$i++){
      $ciudadPot=$arrData2[$i]['Ciudad'];
      $tipoPot=$arrData2[$i]['Tipo'];
      $activoCiudades=false;
      $activoTipos=false;
      for($i2=0;$i2<count($ciudades);$i2++){
        if($ciudadPot==$ciudades[$i2]){
          $activoCiudades=true;
          break;
        }
      }
      for($i2=0;$i2<count($tipos);$i2++){
        if($tipoPot==$tipos[$i2]){
          $activoTipos=true;
          break;
        }
      }
      if(!$activoCiudades){
        $ciudades[count($ciudades)]=$ciudadPot;
      }
      if(!$activoTipos){
        $tipos[count($tipos)]=$tipoPot;
      }
    }
    $arrOpciones["ciudades"]=$ciudades;
    $arrOpciones["tipos"]=$tipos;
    return $arrOpciones;
}
?>

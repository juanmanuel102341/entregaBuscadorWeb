
var slider;
var initSlider=0;
var finSlider=0;
$(document).ready(function() {
    $('select').material_select();//importante sino n funciona select!!!!!
    OpcionesPhp();
});
/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
var instance=$("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$",
    onStart:GuardandoDataSlider,
    onFinish:GuardandoDataSlider
    //onUpdate:EscribiendoSlider
  });
  slider=instance.data("ionRangeSlider");
  $("#submitButton").click(function(e){
    ////********************Buscar*************************
    e.preventDefault();
  //  console.log("aprentando buscar");
  //  console.log("initSlider "+initSlider);
  //  console.log("finSlider "+finSlider);
    var cards=$("#contenedorCards").children();
  //  console.log("cantidad d cards "+cards.length);
    //console.log("card html "+cards.html());
    if(cards.length>0){
      cards.remove();
    //  cards=[]:
    }
    slider.update({
      from:initSlider,
      to:finSlider
    });
    var ciudad=$("#selectCiudad").val();
    var tipo=$("#selectTipo").val();
  //  console.log("ciudad desde buscar php antes "+ciudad);
    //console.log("tipo desde buscar php antes "+tipo);
    if(ciudad==""){
      ciudad="todas";
    }
    if(tipo==""){
      tipo="todos";
    }
    //console.log("ciudad desde buscar php "+ciudad);
    //console.log("tipo desde buscar php "+tipo);
BuscarPhp(ciudad,tipo,initSlider,finSlider);
  //  MostrarXrangoPrecios(dataObj);
  })
}
function BuscarPhp(_ciudad,_tipo,_precioMin,_precioMax){
//  console.log("obteniendoData");
  var obj={
    ciudad:_ciudad,
    tipo:_tipo,
    precioMin:_precioMin,
    precioMax:_precioMax
  }
  $.ajax(
    {
      url:"./Buscar.php",
      type:'POST',
      data:obj,
      success:function(data){
  //     console.log("exito "+data);
       var data_buscador=JSON.parse(data);
    //   console.log(dataObj);
    //console.log("tam databuscardo "+data_buscador.length);
    //console.log("data_buscador"+data_buscador[0].Ciudad)
    MostrarTodos(data_buscador);

  },
      error:function(xhr, ajaxOptions, thrownError){
        console.log("xhr"+xhr+" ajaxOptions "+ajaxOptions+""+thrownError);
      }
    }
  )
}
function OpcionesPhp(){
  $.ajax(
    {
      url:"./OpcionesData.php",
      type:'POST',
      //data:obj,
      success:function(data){
  //     console.log("exito opciones"+data);
       var data_opciones=JSON.parse(data);
  //    console.log("desde java opciones"+data_opciones["ciudades"][0]);
    AppendOpciones(data_opciones["ciudades"],data_opciones["tipos"]);


  },
      error:function(xhr, ajaxOptions, thrownError){
        console.log("xhr"+xhr+" ajaxOptions "+ajaxOptions+""+thrownError);
      }
    }
  )
}
function GuardandoDataSlider(data){
  initSlider=data.from;
  finSlider=data.to;
}

/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

//console.log("entrando index js");
$("#mostrarTodos").click(function(event){
//  console.log("entrando submit");
    event.preventDefault();
    var cards=$("#contenedorCards").children();
  //  console.log("cantidad d cards "+cards.length);
    //console.log("card html "+cards.html());
    if(cards.length>0){
      cards.remove();

    }
    BuscarPhp("todas","todos",0,100000);


})

function AppendOpciones(arrCiudades,arrTipo){
var optionCode="";
//console.log("AppendOpciones");
//console.log("arrCiudades "+arrCiudades.length);
  for(i=0;i<arrCiudades.length;i++){
    optionCode=`<option selected>${arrCiudades[i]}</option>`;
  //  console.log("optionCode "+optionCode);
    $("#selectCiudad").append(optionCode);
    //console.log($("#selectCiudad"));
  }
  for(i=0;i<arrTipo.length;i++){
  optionCode=`<option selected>${arrTipo[i]}</option>`;
  $("#selectTipo").append(optionCode);
  }
  $('select').material_select();//si no funciona
}

function MostrarTodos(arrDataExterna){
//  console.log("mostrarTodos "+arrDataExterna.length);
  for(i=0;i<arrDataExterna.length;i++){
  //  console.log(arrDataExterna[i]);
    $("#contenedorCards").append(setCardData(arrDataExterna[i].Direccion,arrDataExterna[i].Ciudad,arrDataExterna[i].Telefono,arrDataExterna[i].Codigo_Postal,arrDataExterna[i].Tipo,arrDataExterna[i].Precio));
  }
}
function setCardData(direccion,ciudad,telefono,codigo_postal,tipo,precio){
  var codigoCard=`<div class="card horizontal">
          <div class="card-image"><img src="img/home.jpg"></div>
            <div class="card-stacked">
              <div class="card-content">
                <p>Direccion:${direccion}</p>
                <p>Ciudad:${ciudad}</p>
                <p>Telefono:${telefono}</p>
                <p>Codigo_Postal:${codigo_postal}</p>
                <p>Tipo:${tipo}</p>
                <p>Precio:${precio}</p>
                    </div>
                      </div>
                        </div>`
    return codigoCard;
}

inicializarSlider();
//playVideoOnScroll();


$(document).ready(function() {
    BuscarPokemones();
    $('.general').hide(); 
  })
  
  function next(){
    BuscarPokemones(Next);
    $("#carouselExampleControls").hide();
    $('.general').hide();
  }
  
  function previous(){
    BuscarPokemones(Previous);
    $("#carouselExampleControls").hide();
    $('.general').hide();
  }

  function aparece(){
    $("#carouselExampleControls").show();
  }

  function getPokemonId(){
    
    var iva = $("#idPokemon")[0].value;
    if (iva !== undefined) {
      obtenerPokemonPorIdApi(iva);
    } else {
      alert("El id está indefinido");
    }
  } 
  
function obtenerPokemonPorIdApi(iva) {
    $.get("https://pokeapi.co/api/v2/pokemon/"+iva, data => {
      $("#nombrePokemon")[0].innerHTML = data.name.toUpperCase();
      $("#pokeImg")[0].src = data.sprites.front_default;
      $('.general').show();
      let stats = data.stats;
      $('#canvas')[0].innerHTML=
            '<button onclick="Graficar('+stats[0].base_stat+','+stats[3].base_stat+','+stats[0].base_stat+','+stats[0].base_stat+')" type="button" id="Graficar" class="btn btn-primary" data-toggle="modal" data-target="#myModal">' +
              'Ver Gráfica' +
            '</button>'
    })
    
  }

  function BuscarPokemones(url) {
    $('.row').html('');
    if(!url){
      url=  ' https://pokeapi.co/api/v2/pokemon';
    }
    $.get(url, data => {
      Next = data.next
      Previous = data.previous
      data.results.forEach(pokemones => {
        $.get(pokemones.url, dataPokemon => {
          let imgFront = dataPokemon.sprites.front_default
          let stats = dataPokemon.stats;
          $('.row').append('<div class="posicionCard">'+
            '<div class="card col-9" >' +
              '<div class="flip-card">' +
                '<div class="flip-card-inner">' +
                  '<div class="flip-card-front">' +
                  '<img class="card-img-top" id="Imagen" src=" ' +
                  imgFront +
                  '" alt="Card image cap">'+
                  '</div> '+ 
                  '<div class="nombre">' + '<h5>' +
                  pokemones.name +
                  '</h5>' + '<button onclick="Graficar('+stats[0].base_stat+','+stats[3].base_stat+','+stats[0].base_stat+','+stats[0].base_stat+')" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">' +
                  'Ver Gráfica' + '</button>' + '</div>' + '</div>' +'</div>'+'</div>'
                   )
        })
      })
    })
  }
  

  function Graficar(speed,defense,attack,hp){

    var chart = new CanvasJS.Chart("chartContainer", {
      theme: "light1", // "light1", "light2", "dark1", "dark2"
      exportEnabled: false,
      animationEnabled: true,
      data: [{
        type: "pie",
        startAngle: 10,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 18,
        indexLabel: "{label} - {y}",
        dataPoints: [
          { y: speed, label: "speed" },
          { y: defense, label: "Defense" },
          { y: attack, label: "attack" },
          { y: hp, label: "hp" },
        ]
      }]
    });
    chart.render();
  }

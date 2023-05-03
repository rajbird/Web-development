$(document).ready(function () {
		//
		console.log("Rajbir Deol: 0918139");
		var pokemons = new Array(7);
		var modals = new Array(7);
		var name;
		var modal;

		function setUpModal(index, obj, id){
			pokemons[index] = obj.name;

			var temp = "<div class=\"img-container\"><img class=\"rounded float-left\" src=\"" + obj.artwork + "\"></div><div class=\"stats\"><h5 class=\"pokemonID\">#" + id + "</h5><table class=\"table base\"><tbody><tr><td class=\"stat-name\">HP</td><td><div class=\"progress\"><div class=\"progress-bar bg-success progress-bar-striped\" style=\"width:" + (parseInt(obj.hp)/255 * 100) + "%\">" + obj.hp + "</div></div></td></tr><tr><td class=\"stat-name\">Defense</td><td><div class=\"progress\"><div class=\"progress-bar bg-warning\"  style=\"width:" + (parseInt(obj.def)/255 * 100) + "%\">" + obj.def + "</div></div></td></tr><tr><td class=\"stat-name\">Attack</td><td><div class=\"progress\"><div class=\"progress-bar bg-danger\" style=\"width:" + (parseInt(obj.atk)/255 * 100) + "%\">" + obj.atk + "</div></div></td></tr><tr><td class=\"stat-name\">Speed</td><td><div class=\"progress\"><div class=\"progress-bar bg-primary\"  style=\"width:" + (parseInt(obj.spd)/255 * 100) + "%\">" + obj.spd + "</div></div></td></tr><tr><td class=\"stat-name\">Sp Atk</td><td><div class=\"progress\"><div class=\"progress-bar bg-secondary\"  style=\"width:" + (parseInt(obj.sa)/255 * 100) + "%\">" + obj.sa + "</div></div></td></tr><tr><td class=\"stat-name\">Sp Def</td><td><div class=\"progress\"><div class=\"progress-bar bg-info\" style=\"width:" + (parseInt(obj.sd)/255 * 100) + "%\">" + obj.sd + "</div></div></td></tr></tbody></table></div><div class=\"float-container\"><div class=\"float-child\" style=\"width:220px;margin-top:5px\"><p><strong>Height: </strong>" + obj.height + " m</p><p><strong>Weight: </strong>" + obj.weight + " kg</p><p><strong>Abilities: </strong>" + obj.abi + "</p></div><div class=\"float-child\"><p><strong>Type: </strong></p><p>" + obj.types + "</p></div><div class=\"float-child\" style=\"width:450px\"><p><strong>Weakness: </strong></p><p>" + obj.weaknesses + "</p></div></div>";
			modals[index] = temp;
		}

		function getPokemon(cardNumber){
			var id = Math.floor((Math.random() * 700) + 21);
			$.ajax({
          method: 'GET',
          url: '/pokemon/' + id + "/" + cardNumber,
          success: (data) => {
						var obj = JSON.parse(data);
						if(obj.status == 503){
							console.log("error");
							$("#results").innerHTML = "<h4 class=\"pokemon-name\" href=\"#\" id=\"pokemon-name\">" + obj.msg + "</h4>";
						}
						else{
							setUpModal(parseInt(cardNumber), obj, id);
							var typeHTML = "";
							if(obj.type2 != '--'){
								typeHTML = "<p><span class=\"label label-default\" style=\"background-color:" + obj.type1Color + "\">" + obj.type1 + "</span><span class=\"label label-default\" style=\"background-color:" + obj.type2Color + "\">" + obj.type2 + "</span></p>";
							}
							else{
								typeHTML = "<p><span class=\"label label-default\" style=\"background-color:" + obj.type1Color + "\">" + obj.type1 + "</span></p>";
							}
							var newHTML = " <img class=\"card-img-top\" src=\"" + obj.artwork + "\" >    <div class=\"card-body\">      <h5 class=\"card-title\">" + obj.name + "        <span href=\"#\" id=\"PokemonCardName" + cardNumber + "\"><svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-unlock\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">          <path fill-rule=\"evenodd\" d=\"M9.655 8H2.333c-.264 0-.398.068-.471.121a.73.73 0 0 0-.224.296 1.626 1.626 0 0 0-.138.59V14c0 .342.076.531.14.635.064.106.151.18.256.237a1.122 1.122 0 0 0 .436.127l.013.001h7.322c.264 0 .398-.068.471-.121a.73.73 0 0 0 .224-.296 1.627 1.627 0 0 0 .138-.59V9c0-.342-.076-.531-.14-.635a.658.658 0 0 0-.255-.237A1.122 1.122 0 0 0 9.655 8zm.012-1H2.333C.5 7 .5 9 .5 9v5c0 2 1.833 2 1.833 2h7.334c1.833 0 1.833-2 1.833-2V9c0-2-1.833-2-1.833-2zM8.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z\"/></svg></span></h5> " + typeHTML + "  <table class=\"table table-bordered\"><tr><td scope=\"col\">" + obj.move1 + "</td><td scope=\"col\">" + obj.move2 + "</td></tr><tr><td scope=\"col\">" + obj.move3 + "</td><td scope=\"col\">" + obj.move4 + "</td></tr></table>    </div>";
							var card = "#card" + cardNumber;

							$(card).html(newHTML);
						}
          },
          fail: (err) => {
              console.log("There was an error completing the request: " + err)
          }
      });
		}
		$("#generate").click(function(){
			var array = ['1', '2', '3', '4', '5', '6'];
			for (i = 0; i < 6; i++) {
				var card = "card" + array[i];
				if(document.getElementById(card).style.background != 'white'){
					getPokemon(array[i]);
				}
			}
			setTimeout(function(){
				document.getElementById("results").style.display = 'block';
			    //do what you need here
			}, 2000);

		});

		function lock(id, cardName){
			if(document.getElementById(id).style.background == 'white'){
				document.getElementById(id).style.background = "transparent";
				$(cardName).html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-unlock" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.655 8H2.333c-.264 0-.398.068-.471.121a.73.73 0 0 0-.224.296 1.626 1.626 0 0 0-.138.59V14c0 .342.076.531.14.635.064.106.151.18.256.237a1.122 1.122 0 0 0 .436.127l.013.001h7.322c.264 0 .398-.068.471-.121a.73.73 0 0 0 .224-.296 1.627 1.627 0 0 0 .138-.59V9c0-.342-.076-.531-.14-.635a.658.658 0 0 0-.255-.237A1.122 1.122 0 0 0 9.655 8zm.012-1H2.333C.5 7 .5 9 .5 9v5c0 2 1.833 2 1.833 2h7.334c1.833 0 1.833-2 1.833-2V9c0-2-1.833-2-1.833-2zM8.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/></svg>');
			}
			else{
				document.getElementById(id).style.background = "white";
				$(cardName).html('<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-lock-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z\"/><path fill-rule=\"evenodd\" d=\"M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z\"/></svg>');
			}
		}

		$("#card1").click(function(){
			lock("card1", "#PokemonCardName1");
		});

		$("#card2").click(function(){
			lock("card2", "#PokemonCardName2");
		});

		$("#card3").click(function(){
			lock("card3", "#PokemonCardName3");
		});

		$("#card4").click(function(){
			lock("card4", "#PokemonCardName4");
		});

		$("#card5").click(function(){
			lock("card5", "#PokemonCardName5");
		});

		$("#card6").click(function(){
			lock("card6", "#PokemonCardName6");
		});

		function setModal(){
			$('#pokedexModal .modal-title').html(name);
			$('#pokedexModal .modal-body').html(modal);
		}

		$("#getPokédex1").click(function(){
			name = pokemons[1];
			modal = modals[1];
			setModal();
		});

		$("#getPokédex2").click(function(){
			name = pokemons[2];
			modal = modals[2];
			setModal();
		});

		$("#getPokédex3").click(function(){
			name = pokemons[3];
			modal = modals[3];
			setModal();
		});

		$("#getPokédex4").click(function(){
			name = pokemons[4];
			modal = modals[4];
			setModal();
		});

		$("#getPokédex5").click(function(){
			name = pokemons[5];
			modal = modals[5];
			setModal();
		});

		$("#getPokédex6").click(function(){
			name = pokemons[6];
			modal = modals[6];
			setModal();
		});

});

function addEgg(){
    for( var i = 0; i<App.game.party.caughtPokemon.length; i++){
    	var poke = App.game.party.caughtPokemon[i]
		if(App.game.breeding.canBreedPokemon() && BreedingController.visible(poke)()){
		    // bypass mom using embedded filters and custom categories
                    App.game.breeding.addPokemonToHatchery(poke)
                    console.log("addPokemonToHatchery:", poke.name, poke.level, poke.breeding, PokemonHelper.calcNativeRegion(poke.name))
		}
	}
}

function hatchEggs(){
	for(var i = App.game.breeding._eggList.length-1; i>=0; i--){
		var egg = App.game.breeding._eggList[i]();
		if(egg !== null){
			if( egg.canHatch()){
			    App.game.breeding.hatchPokemonEgg(i)
			    console.log("hatchPokemonEgg:", egg.pokemon)
			}
		}
    }
}

function loopEggs(){
    var eggLoop = setInterval(function() {
    	console.log("looping Eggs:")
        hatchEggs()
        addEgg()
    }, 6000)
}

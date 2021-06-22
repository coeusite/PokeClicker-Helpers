function addEgg(){
    for( var i = 0; i<App.game.party.caughtPokemon.length; i++){
    	var poke = App.game.party.caughtPokemon[i]
		if(App.game.breeding.hasFreeEggSlot() && BreedingController.visible(poke)()){
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

// raise to global variable
var flagStopEggLoop = false

function loopEggs(){
    // start new loop
    var looper = setInterval(function() {
        hatchEggs()
        addEgg()
        // stop egg loop
        if(flagStopEggLoop) {
            console.log("stop egging loop")
            clearInterval(looper)
            flagStopEggLoop = false
	}
    }, 6000)
}

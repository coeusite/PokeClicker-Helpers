function addEgg(){
    for( var i = 0; i<player.caughtPokemonList.length; i++){
		if(canBreed(player.caughtPokemonList[i]) && breedSlotLeft()){
		    //update to bypass mom
            poke = player.caughtPokemonList[i].name
                gainPokemonEgg(poke)
                releasePokemon(poke)
		}
	}
}

function hatchEggs(){
    for(var i = 0; i<player.eggList.length; i++){
		var egg = player.eggList[i];
		if(egg !== null){
			if( egg.progress >= egg.steps){
			    hatchEgg(i)
			}
		}
    }
}

function loopEggs(){

    var eggLoop = setInterval(function() {
        hatchEggs()
        addEgg()
    }, 6000)
}


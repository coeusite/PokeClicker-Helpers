function loopGym(gymName, times)  {
    loadGym(gymName)  
    var times = times


    var looper = setInterval(function() {
        //if still have loops, and currentGym.pokemons[gymPokemonIndex] != null, continue
        //if all pokemon beat, one less times
        //if no times, clearInterval(looper)
        console.log("entered loop")
        if(times != 0 && currentGym.pokemons[gymPokemonIndex] != null){

        }
        if(times != 0 &&currentGym.pokemons[gymPokemonIndex] == null){
            times = times - 1
            $("#gymModal").modal('hide');
            loadGym(gymName)
        }
        if(times == 0 && currentGym.pokemons[gymPokemonIndex] == null){
            console.log("done")
            clearInterval(looper)
            $("#gymModal").modal('hide');
        }

    }, 600)
}
function loadGym(gymName) {
    if (gymName in gymList) {
        var gym = gymList[gymName]
    } else {
        var gym = player.town().gym
    }
    if (gym) {
        GymRunner.startGym(gym)
        console.log('loading Gym:', gym.leaderName)
    } else {
        console.log('This Gym does not exist:', gymName)
    }
}

function loopGym(gymName, times = 1)  {
    console.log("entering loop")
    var times = Math.floor(times)
    var looper = setInterval(function() {
        //if still have loops, and currentGym.pokemons[gymPokemonIndex] != null, continue
        //if all pokemon beat, one less times
        //if no times, clearInterval(looper)
        if(times > 0 && App.game.gameState == GameConstants.GameState.gym){

        }
        if(times > 0 && App.game.gameState != GameConstants.GameState.gym){
            times = times - 1
            // $("#gymModal").modal('hide');
            loadGym(gymName)
        }
        if(times <= 0 && App.game.gameState != GameConstants.GameState.gym){
            // $("#gymModal").modal('hide');
            console.log("done")
            clearInterval(looper)
        }

    }, 600)
}

function loadGym(gymName) {
    if (gymName in gymList) {
        var gym = gymList[gymName]
    } else {
        var gym = player.town().gym
    }
    if (gym) {
        GymRunner.startGym(gym)
        console.log('loading Gym:', gym.leaderName, loopTimesGym)
    } else {
        console.log('This Gym does not exist:', gymName)
    }
}

var loopTimesGym = 0

function loopGym(gymName, times = 1)  {
    console.log("entering loop")
    loopTimesGym = Math.floor(times)
    var looper = setInterval(function() {
        //if still have loops, and currentGym.pokemons[gymPokemonIndex] != null, continue
        //if all pokemon beat, one less times
        //if no times, clearInterval(looper)
        if(loopTimesGym > 0 && App.game.gameState == GameConstants.GameState.gym){

        }
        if(loopTimesGym > 0 && App.game.gameState != GameConstants.GameState.gym){
            loopTimesGym = loopTimesGym - 1
            // $("#gymModal").modal('hide');
            loadGym(gymName)
        }
        if(loopTimesGym <= 0 && App.game.gameState != GameConstants.GameState.gym){
            // $("#gymModal").modal('hide');
            console.log("done")
            clearInterval(looper)
        }

    }, 600)
}

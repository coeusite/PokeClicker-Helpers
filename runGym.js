function loadGym(leaderName) {
    if (player.town().gym){
        var gym = player.town().gym
    } else if ('gymList' in player.town()) {
        var gym = searchGymList(leaderName)
    }
    if (gym) {
        GymRunner.startGym(gym)
        console.log('loading Gym:', gym.leaderName)
    } else {
        console.log('This Gym does not exist:', leaderName)
    }
}

function searchGymList(leaderName){
    for (var i=0; i < player.town().gymList.length; i++) {
        if (player.town().gymList[i].leaderName === leaderName) {
            return player.town().gymList[i];
        }
    }
}

function loopGym(leaderName, times = 1)  {
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
            loadGym(leaderName)
        }
        if(times <= 0 && App.game.gameState != GameConstants.GameState.gym){
            // $("#gymModal").modal('hide');
            console.log("done")
            clearInterval(looper)
        }

    }, 600)
}

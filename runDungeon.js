
function loadDungeon(dungeonName) {
    if (dungeonName in dungeonList) {
        var dungeon = dungeonList[dungeonName]
    } else {
        var dungeon = player.town().dungeon
    }
    if (dungeon) {
        DungeonRunner.initializeDungeon(dungeon)
        console.log('loading Dungeon:', dungeon.name)
    } else {
        console.log('This Dungeon does not exist:', dungeonName)
    }
}

function loopDungeon(dungeonName, times = 1)  {
    
    console.log("entering dungeon loop")
    var times = Math.floor(times)
    
    // patch for previous winning
    if(DungeonRunner.defeatedBoss() && times > 0) {times = times + 1}
    
    var looper = setInterval(function() {
        // if not in a dungeon
        if((App.game.gameState != GameConstants.GameState.dungeon )){
            // next step
            if(times > 0) {
                //if not in a gym or having other constraints
                if(App.game.gameState != GameConstants.GameState.gym){
                    
                    // if won
                    if(DungeonRunner.defeatedBoss()) {times = times - 1}
                    
                    // next time?
                    if(times > 0) {
                        //start the dungeon
                        //order in which to traverse dungeon tiles
                        dOrder = [11, 6, 7, 8, 13, 18, 17, 16, 15, 10, 5, 0 , 1, 2, 3, 4, 9, 14, 19, 24, 23, 22, 21, 20]
                        dIndex = 0
                        loadDungeon(dungeonName)
                    }
                }
            } else { // stop loop
                console.log("done")
                clearInterval(looper)
                complete = 1
            }
            
        }
        
        // To Do: move or action
        if(dungeonCanMove && !DungeonRunner.defeatedBoss()){
            // open chest or start boss fight
            if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.chest) {
                DungeonRunner.openChest();
            } else if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.boss && !DungeonRunner.fightingBoss()) {
                DungeonRunner.startBossFight();
            }
            moveToRoom(dOrder[dIndex])
            dIndex = dIndex + 1
        }
    }, 600)
}

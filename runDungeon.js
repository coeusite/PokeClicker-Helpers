
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
    
    var times = Math.floor(times)
    console.log("entering dungeon loop", times)
    var stepOrder
    var stepIndex
    
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
                        // load dungeon first
                        loadDungeon(dungeonName)
                        //start the dungeon
                        //order in which to traverse dungeon tiles
                        //remake dOrder based on DungeonRunner.map.size and DungeonRunner.map.playerPosition
                        var xList = [];
                        var yList = [];
                        for (let x = DungeonRunner.map.playerPosition()['x']; x >= 0; x--) {xList.push(x)}
                        for (let x = DungeonRunner.map.playerPosition()['x'] + 1; x < DungeonRunner.map.size; x++) {xList.push(x)}
                        for (let y = DungeonRunner.map.playerPosition()['y']; y >= 0; y--) {yList.push(y)}
                        for (let y = DungeonRunner.map.playerPosition()['y'] + 1; y < DungeonRunner.map.size; y++) {yList.push(y)}
                        // 
                        stepOrder = [];
                        for (const y of yList) {  for (const x of xList) {
                            stepOrder.push(new Point(x,y))
                        }}
                        stepIndex = 1
                    }
                }
            } else { // stop loop
                console.log("done")
                clearInterval(looper)
                complete = 1
            }
            
        }
        
        // To Do: move or action
        if(!(DungeonRunner.fighting() || DungeonBattle.catching()) && !DungeonRunner.defeatedBoss()) {
            // open chest or start boss fight
            if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.chest) {
                DungeonRunner.openChest();
            } else if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.boss && !DungeonRunner.fightingBoss()) {
                DungeonRunner.startBossFight();
            }
            if (DungeonRunner.map.moveToTile(stepOrder[stepIndex])) {
                stepIndex = stepIndex + 1
            }
        }
    }, 600)
}

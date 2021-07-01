
function loadDungeon(dungeonName) {
    if (dungeonName in dungeonList) {
        var dungeon = dungeonList[dungeonName]
    } else {
        var dungeon = player.town().dungeon
    }
    if (dungeon) {
        DungeonRunner.initializeDungeon(dungeon)
        console.log('loading Dungeon:', dungeon.name, loopTimeDungeon)
    } else {
        console.log('This Dungeon does not exist:', dungeonName)
    }
}

var loopTimeDungeon = 0

function loopDungeon(dungeonName, times = 1, stepMode = 0)  {
    var stepMode = stepMode
    
    if (!(dungeonName in dungeonList) && !player.town().dungeon) {
        console.log("This Dungeon does not exist:", dungeonName)
        return
    }
        
    loopTimeDungeon = Math.floor(times)
    console.log("entering dungeon loop", times)
    var stepOrder
    var stepIndex
    
    // patch for previous winning
    if(DungeonRunner.defeatedBoss() && loopTimeDungeon > 0) {loopTimeDungeon = loopTimeDungeon + 1}
    
    var looper = setInterval(function() {
        // if not in a dungeon
        if((App.game.gameState != GameConstants.GameState.dungeon )){
            // next step
            if(loopTimeDungeon > 0) {
                //if not in a gym or having other constraints
                if(App.game.gameState != GameConstants.GameState.gym){
                    
                    // if won
                    if(DungeonRunner.defeatedBoss()) {loopTimeDungeon = loopTimeDungeon - 1}
                    
                    // next time?
                    if(loopTimeDungeon > 0) {
                        // load dungeon first
                        loadDungeon(dungeonName)
                        //start the dungeon
                        //order in which to traverse dungeon tiles
                        //remake dOrder based on DungeonRunner.map.size and DungeonRunner.map.playerPosition
                        stepOrder = [];
                        // first line
                        var xList = [];
                        for (let x = DungeonRunner.map.playerPosition()['x']; x >= 0; x--) {xList.push(x)}
                        for (let x = DungeonRunner.map.playerPosition()['x'] + 1; x < DungeonRunner.map.size; x++) {xList.push(x)}
                        for (const x of xList) {
                            stepOrder.push(new Point(x, DungeonRunner.map.playerPosition()['y']))
                        }
                        // switch to columns first
                        var xList = [];
                        for (let x = 1; x < DungeonRunner.map.size; x = x+3) {xList.push(x)}
                        for (let x = 0; x < DungeonRunner.map.size; x = x+3) {xList.push(x)}
                        for (let x = 2; x < DungeonRunner.map.size; x = x+3) {xList.push(x)}
                        var yList = [];
                        for (let y = DungeonRunner.map.playerPosition()['y'] - 1; y >= 0; y--) {yList.push(y)}
                        for (let y = DungeonRunner.map.playerPosition()['y'] + 1; y < DungeonRunner.map.size; y++) {yList.push(y)}
                        // 
                        for (const x of xList) {  for (const y of yList) {
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
            var stepNext
            
            // open chest or start boss fight
            if (DungeonRunner.map.currentTile().type() !== GameConstants.DungeonTile.entrance) { DungeonRunner.handleClick();}
           
            // if all tiles shown
            if (DungeonRunner.chestsOpened >= GameConstants.DUNGEON_MAP_SHOW) {
                if (stepMode == 1){
                    var typeTile = GameConstants.DungeonTile.enemy
                } else { 
                    var typeTile = GameConstants.DungeonTile.boss
                }
                for (let i = 0; i < DungeonRunner.map.board().length; i++) {
                        for (let j = 0; j < DungeonRunner.map.board()[i].length; j++) {
                            if (DungeonRunner.map.board()[i][j].type() == typeTile) {
                                stepNext = new Point(j,i)
                            }
                        }
                }
            }
            
            
            // always open chests first if possible
            if (DungeonRunner.chestsOpened >= GameConstants.DUNGEON_CHEST_SHOW && DungeonRunner.chestsOpened < GameConstants.DUNGEON_MAP_SHOW) {
                    for (let i = 0; i < DungeonRunner.map.board().length; i++) {
                        for (let j = 0; j < DungeonRunner.map.board()[i].length; j++) {
                            if (DungeonRunner.map.board()[i][j].type() == GameConstants.DungeonTile.chest) {
                                if (DungeonRunner.map.hasAccesToTile(new Point(j,i))) {
                                    stepNext = new Point(j,i)
                                }
                            }
                        }
                    }
            }
            
            if (stepNext) {
                console.log('jumping to', stepNext)
                DungeonRunner.map.moveToTile(stepNext)
            } else {
                DungeonRunner.map.moveToTile(stepOrder[stepIndex])
                stepIndex = stepIndex + 1
            }
        }
    }, 600)
}

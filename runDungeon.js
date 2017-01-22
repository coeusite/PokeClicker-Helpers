function runDungeon(dungeonName, times)  {
    loadDungeon(dungeonName)  
    hackDungeon = currentDungeon

    //order in which to traverse dungeon tiles
    var dOrder = [11, 6, 7, 8, 13, 18, 17, 16, 15, 10, 5, 0 , 1, 2, 3, 4, 9, 14, 19, 24, 23, 22, 21, 20]
    var dIndex = 0

    var looper = setInterval(function() {
        
        if(dungeonCanMove && !bossDefeated()){
            openDungeonChest()
            moveToRoom(dOrder[dIndex])
            dIndex = dIndex + 1
        }
        if(bossDefeated() && times > 0){
            dOrder = [11, 6, 7, 8, 13, 18, 17, 16, 15, 10, 5, 0 , 1, 2, 3, 4, 9, 14, 19, 24, 23, 22, 21, 20]
            dIndex = 0
            if(inProgress==0){
                times = times - 1
                console.log("Again!")
                loadDungeon(dungeonName)
            }
        }
        if(bossDefeated() && times <= 0){
            console.log("done")
            clearInterval(looper)
            complete = 1
        }
    }, 600)
}
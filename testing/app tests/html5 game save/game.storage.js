$(window).unload(function(e){
    saveGame(0,playerData);
});
saveSlotPrefix = 'gameID_save_';    // this should be unique to keep from even the offchance of overwriting other app data storage, though the domain rule should prevent this
saveSlots = 6;  // slot '0' is reserved for current data and data loaded from code

saveGame = function(slotID, gameState){
    var confirmation = true;
    if(slotID != 0){
        confirmation = confirm('are you sure you want to overwrite the contents of save slot #' + slotID + '?')
    }
    if(confirmation){
        $.store.set(saveSlotPrefix+slotID, JSON.stringify(gameState));
    }
    return getSavedGame(slotID);
}

getSavedGame = function(slotID){
    var slotContents = $.store.get(saveSlotPrefix+slotID);
    if(slotContents){
        return JSON.parse(slotContents);
    }else{
        return null;
    }
}

getSaveCode = function(slotID){
    return JSON.stringify(getSavedGame(slotID));
}

getSavedGames = function(){
    var savedGames = [];
    for(var i = 1; i < saveSlots; i++){ // skips slot 0, that's internal use only, to avoid losing autosave
        savedGames.push(getSavedGame(i));
    }
    return savedGames;
}

clearSlot = function(slotID){
    if(confirm('are you sure you want to delete the contents of save slot #' + slotID + '?')){
        $.store.remove(saveSlotPrefix+slotID);
    }
    return getSavedGame(slotID);
}

wipeSlots = function(){
    for(var i = 1; i < saveSlots; i++){ // skips slot 0, that's internal use only
        clearSlot(i);
    }
    return getSavedGames();
}

loadGame = function(slotID){
    startNewGame(getSavedGame(slotID));
}
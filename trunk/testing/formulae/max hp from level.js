this.getPotentialHP = function(lvl){
    var basePoints = 20;
    var pointsPerLevel = 3;
    var pointsAtLvl = basePoints + ((lvl-1) * pointsPerLevel);
    var otherStatsMin = 4; // for dex, per, chr, and knw

    var startingStr = 1;
    var startingEnd = 15;    // dumping all points to end initially

    var pointsForHP = pointsAtLvl - otherStatsMin - startingStr - startingEnd;

    var newStr = startingStr;
    var newEnd = startingEnd;

    while(pointsForHP > 0){
            // put 2 into endurance        
        pointsForHP -= 2;
        newEnd += 2;
            // and 1 into strength
        pointsForHP -= 1;   
        newStr += 1;
    }

    var baseHP = 50;
    var HPPerStr = (lvl < 25) ? 1 : 2;
    var HPPerEnd = (lvl < 20) ? 2 : 3;

    var maxHP = baseHP + (newStr * HPPerStr) + (newEnd * HPPerEnd); 

    return maxHP;
}
	//	alt is interesting
	//	if attr1 is half attr2, chance is 1/3%
	//	if attr1 and attr2 are equal, chance is 1/2%
	//	chance tends towards 50%, diminishing returns past that point
	//	if attr1 is twice attr2, chance is 2/3%
	//	if attr1 is x10 attr2, chance approaches 90%
	
function statvschance_alt(attr1, attr2){	//	returns % probability of success
	var baseChance = (statMax / 2);
	var cd = (attr1+attr2);
	var chanceMod = ((((attr1/cd) * statMax) - ((attr2/cd) * statMax)) / 2);
	var chance = baseChance + chanceMod;
	return chance;
}

function statvschance(attr1, attr2){	//	returns % probability of success
	var chance = .5;
	if(attr1>attr2){
		chance = ((2 * attr1) - attr2) / (2 * attr1);
	}else{
		chance = attr1 / (2 * attr2);
	}
	return chance;
}

function tryChance(chance){	//	returns boolean of success against 1d[statMax] roll
	var roll = Math.ceil(Math.random() * statMax);
	var result = chance > roll;
	return result;
}
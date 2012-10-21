function tryStagger(attStr, defEnd){
	var roll = Math.ceil(Math.random() * 100);
	var staggerChance = 100 - (((defEnd / attStr) / 2) * 100);
	var result = staggerChance > roll;
	return result;
}
function test_pickAnAction(actions){
	var results = new Object();
	for(var i = 0; i < 1000; i++){
		var action = pickAnAction(actions);
		if(results[action.name]){
			results[action.name]++;
		}else{
			results[action.name] = 1;
		}
	}
	
	return results;
}

function testStatVS(attr1, attr2){
	var average = 0;
	for(var i = 0; i < 100; i++){
		var result = tryChance(statvs(attr1,attr2));
		average += (result) ? 1 : 0;
	}
	console.log(average, '%');
}
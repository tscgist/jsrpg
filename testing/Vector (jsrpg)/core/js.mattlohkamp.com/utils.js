function is(value,className){
	return (typeof value != 'undefined' && value.constructor == className) ? true : false;
}
function updateObj(template, current, update){
	for(var propertyName in update){
		if(update[propertyName] != template[propertyName]){
			current[propertyName] = update[propertyName]
		}
	}
	return current;
}
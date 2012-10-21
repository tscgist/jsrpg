function Action(_name,_priority,_condition){
	this.name = is(_name,String) ? _name : 'newAction';
	this.priority = is(_priority,Number) ? _priority : 1;
	this.condition = is(_condition,Boolean) ? _condition : true;
}

function pickAnAction(actions){
	var total = 0;
	var possibleActions = new Array();
	var action = null;
	for each(action in actions){
		if(action.condition == true){
			possibleActions.push(action);
			total += action.priority;
		}
	}
/*		//	not sure if this saves time or not
	possibleActions.sort(function(a,b){
		return a.priority - b.priority;
	});
*/
	var index = Math.floor(Math.random() * total);
	var count = total;
	for each(action in possibleActions){
		count -= action.priority;
		if(count <= index){
			return action;
		}
	}
}
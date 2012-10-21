function Type(_name,_stats,_mods){
	this.name = is(_name,String) ? _name : 'newType';
	this.stats = is(_stats,Stats) ? _stats : new Stats();
	this.mods = is(_mods,Mods) ? _mods : new Mods();
}

		/*
		
			PC character starting class types
		
				  Hero
			 Bard _|_ Crusader
			Thief  |  Monk
				Ranger
			
		         Strength
		 Charisma  _|_  Endurance
		Dexterity   |   Intelligence
		        Perception
				
			moving clockwise, primary trait is preceeded by two secondary traits, and anti-prime-trait is across from prime.
		
		*/
		
function Hero(){	// prime stat: strength
	return new Type(
		'Hero',
		new Stats(3,1,1,1,2,2),
		$.extend(new Mods(), {globalHPMod:10})
	);
}

function Crusader(){	// prime stat: endurance
	return new Type(
		'Crusader',
		new Stats(2,3,1,1,1,2),
		$.extend(new Mods(), {globalHPMod:10})
	);
}

function Monk(){	// prime stat: intelligence
	return new Type(
		'Monk',
		new Stats(2,2,3,1,1,1),
		$.extend(new Mods(), {globalHPMod:0})
	);
}

function Ranger(){	// prime stat: perception
	return new Type(
		'Ranger',
		new Stats(1,2,2,3,1,1),
		$.extend(new Mods(), {globalHPMod:0})
	);
}

function Thief(){	// prime stat: dexterity
	return new Type(
		'Thief',
		new Stats(1,1,2,2,3,1),
		$.extend(new Mods(), {globalHPMod:-10})
	);
}

function Bard(){	// prime stat: charisma
	return new Type(
		'Bard',
		new Stats(1,1,1,2,2,3),
		$.extend(new Mods(), {globalHPMod:-10})
	);
}
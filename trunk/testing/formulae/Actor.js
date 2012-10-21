function Actor(_name,_type,_stats,_mods){
	this.name = is(_name,String) ? _name : 'newActor';
	this.type = is(_type,Type) ? _type : new Type();
	this.stats = is(_stats,Stats) ? $.extend(new Stats(), this.type.stats, _stats) : $.extend(new Stats(), this.type.stats);
	this.mods = is(_mods,Mods) ? updateObj(new Mods(),updateObj(new Mods(),new Mods(),this.type.mods),_mods) : updateObj(new Mods(),this.type.mods);
	this.__defineGetter__('hpMax', function(){
		return ((this.mods.baseHP + this.mods.baseHPMod) + (this.stats.str.value * this.mods.hpPerStr) + (this.stats.end.value * this.mods.hpPerEnd) + (this.stats.int.value * this.mods.hpPerInt)) + this.mods.globalHPMod;
    });
	this.__defineGetter__('primeStat', function(){
		return this.stats[this.type.stats.array.sort(function(a,b){return a.value - b.value;}).reverse().shift().abbr];
    });
	this.hp = this.hpMax;
}

function Stats(_str, _end, _int, _per, _dex, _chr){
		/*
		         Strength
		 Charisma  \_|_/  Endurance
		Dexterity  / | \  Intelligence
		        Perception
		*/
	this.str = new Stat('str','strength','a measure of your physical strength',is(_str,Number)?_str:1);
	this.end = new Stat('end','endurance','how hard you can push yourself',is(_end,Number)?_end:1);
	this.int = new Stat('int','intelligence','your general mental aptitude',is(_int,Number)?_int:1);
	this.per = new Stat('per','perception','how aware you are of your environment',is(_per,Number)?_per:1);
	this.dex = new Stat('dex','dexterity','your ability to perform eye-hand coordination',is(_dex,Number)?_dex:1);
	this.chr = new Stat('chr','charisma','how physically attractive you are',is(_chr,Number)?_chr:1);
	this.__defineGetter__('array',function(){
		return [this.str,this.end,this.int,this.per,this.dex,this.chr];
	});
}

function Stat(_abbr,_name,_description,_value){
	this.abbr = is(_abbr,String) ? _abbr : 'stat';
	this.value = is(_value,Number) ? _value : 1;
	this.name = is(_name,String) ? _name : 'newStat';
	this.description = is(_description,String) ? _description : this.name + ' is a new stat.';
}
function Mods(){
	this.hpPerInt = 0;
	this.hpPerStr = 1;
	this.hpPerEnd = 2;
	this.baseHP = 40;
	this.baseHPMod = 0;
	this.globalHPMod = 0;
	this.hpCap = 250;
}

function CommonSense(){	// rangers and monks
	this.hpPerInt = 1;
	this.hpCap = 500
}

function Juggernaut(){
	this.hpPerStr = 2;
	this.hpPerEnd = 3;
	this.hpCap = 1000
}
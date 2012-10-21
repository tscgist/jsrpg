function JSRPG(_gameConfigURL){
	
	var gameConfigURL = is(_gameConfigURL,String) ? _gameConfigURL:'gameConfig.xml';
	var $gameConfigXML;
	
	var loadConfigXML = function(){
		$.ajax({
			url:gameConfigURL,
			success:gameConfigXMLLoaded,
			error:function(jqXHR, textStatus, errorThrown){
				alert('error (' + errorThrown + '): could not load gameConfig xml from "' + gameConfigURL + '"');
			}
		});
	}
	
	var gameConfigXMLLoaded = function(_gameConfigXML){
		$gameConfigXML = $(_gameConfigXML);
		_this.loadEventXML($gameConfigXML.children().eq(0).attr('initEvent'));
	}
	
	var init = function(){
		loadConfigXML();
	};
	
	this.currentEvent;
	
	this.loadEventXML = function(eventXMLURL){
		this.currentEvent = new JSRPG.Event(eventXMLURL);
	}
	
	var _this = this._this = this;
	
	init();
}
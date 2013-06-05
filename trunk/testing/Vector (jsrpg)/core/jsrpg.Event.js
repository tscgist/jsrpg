JSRPG.Event = function(_eventXMLURL){

	var eventXMLURL = _eventXMLURL;
	var $currentElementXML = $('');
	var $currentFrameXML = $('');

	var init = function(){
		$('#eventLoader').show();
		$.ajax({
			url:eventXMLURL,
			success:eventXMLLoaded
		});
	}

	var eventXMLLoaded = function(_currentEventXML){
		$('#eventLoader').hide();
		var $currentEventXML = $(_currentEventXML);
		_this.gotoFrame($('timeline frame', $currentEventXML).eq(0));
		$('#viewContainer,#uiContainer').show();
	}

	this.renderFrameElement = function(_$currentElementXML){
		_this.$currentElementXML = _$currentElementXML;
			console.log('...frameElement:',_this.$currentElementXML);
		$('#uiContainer').empty();

		if(_this.$currentElementXML.attr('clear') == 'true'){
			$('#viewContainer').empty().scrollTo(0);
		}
		
		switch(_this.$currentElementXML[0].tagName){
			case 'decision':
				_this.$currentElementXML.children('choice').each(function(){
					var $innerElementXML = $(this);
					$('#choiceButton').tmpl({label:$innerElementXML.attr('label')}).appendTo('#uiContainer').data('target',$innerElementXML).click(choiceButtonClick);
				});
			break;
			case 'conditional':
				var conditionText = _this.$currentElementXML.children('if').text();
				var conditionResult = eval(conditionText);
				
					console.log(conditionText,' is ',conditionResult);
					
				if(conditionResult){
					renderFrameElement(_this.$currentElementXML.children('then').children().eq(0))
				}else{
					renderFrameElement(_this.$currentElementXML.children('else').children().eq(0))
				}
			break;
			case 'goto':
				gotoFrame($('frame[id="'+$_this.currentElementXML.text()+'"]',$currentFrameXML.parent()));
			break;
			case 'exit':
				console.log('the end of the event');
			break;
			case 'exposition':
			default:
				$('<div></div>').append($(_this.$currentElementXML.text())).tmpl(jsrpg.pc).appendTo('#viewContainer');
				if(_this.$currentElementXML.attr('next') != undefined){
					$('#choiceButton').tmpl({label:_this.$currentElementXML.attr('next')}).appendTo('#uiContainer').click(expoButtonClick);
				}else{
					_this.nextElement();
				}
			break;
		}
		
		$('#viewContainer').scrollTo($('#viewContainer .playerAction:last'),'slow');
		
		$('#uiContainer button').eq(0).focus();
	}
	
	var expoButtonClick = function(){
		$('#viewContainer').append($('<p class="playerAction"><strong>&gt;</strong>&nbsp;'+$(this).text()+'</p>'));
		_this.nextElement();
	}

	this.nextElement = function(){
		var $nextElementXML = _this.$currentElementXML.next();
		console.log('..nextElement:',$currentElementXML, '->', $nextElementXML);
		if($nextElementXML.length){
			_this.renderFrameElement($nextElementXML);
		}else{
			_this.nextFrame();
		}
	}

	this.gotoFrame = function(_$currentFrameXML){
		_this.$currentFrameXML = _$currentFrameXML;
		_this.renderFrameElement(_this.$currentFrameXML.children().eq(0));
	}

	this.nextFrame = function(){
		var $nextFrameXML = $currentFrameXML.next();
		console.log('.nextFrame:',$currentFrameXML, '->', $nextFrameXML);
		if($nextFrameXML.length){
			gotoFrame($nextFrameXML);
		}else{
			console.log('all out of frames...');
		}
	}

	var choiceButtonClick = function(){
		renderFrameElement($(this).data('target').children().eq(0));
	}
	
	var _this = this._this = this;
	
	init();
}
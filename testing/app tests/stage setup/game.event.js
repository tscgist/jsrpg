$(function(){
    $('#frameNextButton').click(nextElement);
});

var $currentElementXML = $('');
var $currentFrameXML = $('');

startNewEvent = function(eventXMLURL){
    $('#eventLoader').show();
    $.ajax({
        url:eventXMLURL,
        complete:function(e){
            console.log(e);
            renderEvent(e.responseXML);
        }
    });
}

renderEvent = function(_$currentEventXML){
    $('#eventLoader').hide();
    $currentEventXML = _$currentEventXML;
    gotoFrame($('timeline frame', $currentEventXML).eq(0));
    $('#viewContainer,#uiContainer').show();
}

renderFrameElement = function(_$currentElementXML){
    $currentElementXML = _$currentElementXML;
	console.log('...frameElement:',$currentElementXML);
	$('#uiContainer').empty();
	if($currentElementXML.attr('clear') == 'true'){
		$('#viewContainer').empty();
	}
    switch($currentElementXML[0].tagName){
        case 'decision':
			$currentElementXML.children('choice').each(function(){
				var $innerElementXML = $(this);
				$('#choiceButton').tmpl({label:$innerElementXML.attr('label')}).appendTo('#uiContainer').data('target',$innerElementXML).click(choiceButtonClick);
			});
        break;
        case 'conditional':
			var conditionText = $currentElementXML.children('if').text();
			var conditionResult = eval(conditionText);
			
				console.log(conditionText,' is ',conditionResult);
				
            if(conditionResult){
                renderFrameElement($currentElementXML.children('then').children().eq(0))
            }else{
                renderFrameElement($currentElementXML.children('else').children().eq(0))
            }
        break;
		case 'goto':
			gotoFrame($('frame[id="'+$currentElementXML.text()+'"]',$currentFrameXML.parent()));
		break;
		case 'exit':
			console.log('the end of the event');
		break;
        case 'exposition':
        default:
            $('<div></div>').append($($currentElementXML.text())).tmpl(playerData).appendTo('#viewContainer');
			if($currentElementXML.attr('next') != undefined){
				$('#choiceButton').tmpl({label:$currentElementXML.attr('next')}).appendTo('#uiContainer').click(nextElement);
			}else{
				nextElement();
			}
        break;
    }
}

nextElement = function(){
	var $nextElementXML = $currentElementXML.next();
	console.log('..nextElement:',$currentElementXML, '->', $nextElementXML);
	if($nextElementXML.length){
		renderFrameElement($nextElementXML);
	}else{
		nextFrame();
	}
}

gotoFrame = function(_$currentFrameXML){
    $currentFrameXML = _$currentFrameXML;
	renderFrameElement($currentFrameXML.children().eq(0));
}

nextFrame = function(){
	var $nextFrameXML = $currentFrameXML.next();
	console.log('.nextFrame:',$currentFrameXML, '->', $nextFrameXML);
	if($nextFrameXML.length){
		gotoFrame($nextFrameXML);
	}else{
		console.log('all out of frames...');
	}
}

choiceButtonClick = function(){
	renderFrameElement($(this).data('target').children().eq(0));
}
(function ( $ ) {
    $.fn.meritMeter = function( options ) {
        return $(this).each(function(index,value){
        	$meritMeter = $(this);
        	settings = $.extend(options);
        	$meritMeter.addClass("meritMeter meritMeter_"+index);
        	$meritMeter.attr('title','RATING : '+settings.value.toFixed(3));
    		for($i = 1; $i <= 10; $i++){
    			$meritMeter.append("<div data-value="+$i+" class='meritBox meritBox_"+index+" "+$i+"'></div>");
    		}
			fillBox(settings.value,index);
			addTriggerBtn(index);
			addForm(settings.url,settings.label,index);

			$('.showMerit_'+index).click(function(){
				$(this).slideUp();
				$('#meritForm_'+index).slideDown();
			});

			$('.cancelMeritBtn_'+index).click(function(){
				$('#meritForm_'+index).slideUp();
				$('.showMerit_'+index).slideDown();
			});

			$('.meritGiven_'+index).mouseup(function(){
				$('.scoreShow_'+index).text($(this).val());
			});

			$('.meritGiven_'+index).bind( "touchend", function(e){
			    $('.scoreShow_'+index).text($(this).val());
			});
		});
    };

    $.fn.meritMeterTransfer = function( options ) {
        return $(this).each(function(index,value){
        	$meritMeter = $(this);
        	$meritMeter.addClass("meritMeter2");
        	settings = $.extend(options);
			
			addForm2(settings.url,settings.label,index);

			$('.meritGiven_'+index).mouseup(function(){
				$('.scoreShow_'+index).text($(this).val());
			});

			$('.meritGiven_'+index).bind( "touchend", function(e){
			    $('.scoreShow_'+index).text($(this).val());
			});
		});
    };

    $.fn.meritViewer = function( options ) {
    	return $(this).each(function(index,value){
    		$meritMeter = $(this);
    		settings = $.extend(options);
    		
    		$meritMeter.addClass("meritViewer meritViewer_"+index);
    		$meritMeter.attr('title','RATING : '+settings.value.toFixed(3));
    		for($i = 1; $i <= 10; $i++){
    			$meritMeter.append("<div data-value="+$i+" class='meritBox meritBox_"+index+" "+$i+"'></div>");
    		}
			fillBox(settings.value,index);
    	});
    };

    function addTriggerBtn(index){
    	$('.meritMeter_'+index).after("<button type='button' class='showMerit showMerit_"+index+" btn btn-danger widthAuto'>Rate</button><br/>");
    }

    function addForm(url,content,index){
    	$('.showMerit_'+index).after("<form id='meritForm_"+index+"' class='meritForm' method='POST' action='"+url+"'></form>");
    	$('#meritForm_'+index).append("<input type='range' name='meritGiven' class='meritGiven meritGiven_"+index+"' min='-10' max='10' value=0>");
    	$('#meritForm_'+index).append("<div class='scoreShow scoreShow_"+index+"'>0</div>");
    	$('#meritForm_'+index).append("<button type='submit' class='meritBtn meritBtn_"+index+" btn btn-danger '>"+content+"</button><br/>");
    	$('#meritForm_'+index).append("<button type='button' class='cancelMeritBtn cancelMeritBtn_"+index+" btn btn-danger '>Cancel</button>");
    }

    function addForm2(url,content,index){
    	$('.meritMeter2').after("<form id='meritForm_"+index+"' class='meritForm2' method='POST' action='"+url+"'></form>");
    	$('#meritForm_'+index).append("<input type='range' name='meritGiven' class='meritGiven2 meritGiven_"+index+"' min='-10' max='10' value=0>");
    	$('#meritForm_'+index).append("<div class='scoreShow scoreShow_"+index+"'>0</div>");
    	$('#meritForm_'+index).append("<button type='submit' class='meritBtn meritBtn_"+index+" btn btn-danger '>"+content+"</button><br/>");
    }

    function colorPicker(number){
		if(number == 1){
			return "#A60400";
		}
		if(number == 2){
			return "#D8210E";
		}
		if(number == 3){
			return "#FF4100";
		}
		if(number == 4){
			return "#FF7C00";
		}
		if(number == 5){
			return "#FFBA40";
		}
		if(number == 6){
			return "#FFD640";
		}
		if(number == 7){
			return "#E8FB71";
		}
		if(number == 8){
			return "#AEF100";
		}
		if(number == 9){
			return "#48DD00";
		}
		if(number == 10){
			return "#007F16";
		}
	}
	function fillBox(total,index){
		$('.meritBox_'+index).each(function(){
			if(total < 1){
				$(this).append("<div class='addition addition_"+index+"'></div>");
				$mod = total*100;
				$('.addition_'+index).css('background-color',colorPicker($(this).attr('data-value')));
				$('.addition_'+index).css('width',$mod+"%");
				return false;
			}else{
				if($(this).attr('data-value') <= total){
					$(this).css('background-color',colorPicker($(this).attr('data-value')));
				}else{
					var $last = $(this).attr('data-value')-1;
					$mod = total%$last;
					$mod = $mod*100;
					if($mod > 0){
						$(this).append("<div class='addition addition_"+index+"'></div>");
						$('.addition_'+index).css('background-color',colorPicker($(this).attr('data-value')));
						$('.addition_'+index).css('width',$mod+"%");
					}
					return false;
				}	
			}
    	});
	}
 
}( jQuery ));
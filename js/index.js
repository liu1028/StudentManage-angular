$(document).ready(function(){
	$('.lhs_menu li a').click(function(){
		$('.lhs_menu li a').removeClass('active');
		$(this).addClass('active');
	});
	
	$('.contentL').scroll(function(){  
		var vtop=$('.contentL').scrollTop();
		
		if(70<=vtop){
			if($('#fab_toolb').is(':hidden'))
				$('#fab_toolb').fadeIn();
		}else{
			if(!$('#fab_toolb').is(':hidden'))
				$('#fab_toolb').hide();
		}
	});

});
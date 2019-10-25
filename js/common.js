$(function() {
	
	var HEIGHT = $(window).height()
	$('.card_modals').css({'bottom': -HEIGHT})

	$(function($){

		$("input[name='phone']").inputmask("+7 (999)-999-99-99");

	});
	
	var wih = $('.section-hidden').width()
	
	$('.section-hidden').css({'marginLeft': -wih+'px'});

	$(".down").click(function(){
		
		$("body,html").animate({

			"scrollTop" : 800}, 1000);

		return false;

	});

	$('.scrolling a').click(function(){
			var name = $(this).attr('href').slice(1)
			var Top = $('#'+name).offset().top
			$("html, body").animate({ 'scrollTop' : Top }, 1000)
			
	});

	$(window).scroll(function(){
		var top = $(window).scrollTop();
		260 < top && $(".title-each-sect").animated("bounceInUp");
	});
	
	$('.top-colum').waypoint(function() {
		$('.colum-main').each(function(index) {
			var t = $(this);
			setTimeout(function(){
				t.animated('bounceIn');
			}, 500*index)
		})
	}, {
		offset : "33%"
	});
	$(window).scroll(function(){
		var top = $(window).scrollTop() + 50;
		var one = $('.section-one').offset().top
		var two = $('.section-two').offset().top
		var three = $('.section-three').offset().top
		if (one < top && top < two){
			$('.top_navi span').css({'background' : '#000'})
		}else if(two < top && three > top){
			$('.top_navi span').css({'background' : '#FFF'})
		}else{
			$('.top_navi span').css({'background' : '#FFF'})
		}
	});

	
	$('.close').click(function(){
		var wih = $('.section-hidden').width()
		$('.section-hidden').animate({'marginLeft': -wih+'px'}, 1000);

	})
	$('.top_navi').click(function(){
		
		$('.section-hidden').animate({'marginLeft': 0}, 1000);

	})
	
	var HEI = $('.hiddeb_form_block').height()
	
	$('.hiddeb_form_block').css({'marginTop': -HEI})
	
	$('.header-button,.feedback_button').click(function() {
			
			$('.hiddeb_form_block').animate({'marginTop': 3+'%'}, 1000);
	
	});

	$('.close_form').click(function() {

		$('.hiddeb_form_block').animate({'marginTop': -HEI}, 1000);
	
	});
	getInfor = function(ind, th){
		var th = th.children();
		$.ajax({
			url: '/dataInfo/info'+ind+'.html',
			data: 'html',
			success: function(result) {
				th.children('.inverse.back').html(result)
			},
			error: function(){
				console.log("Информация отсутсвует")
			},

		});
	}

	getIdCardWind = function(ind){
		var i = ind[0]
		$.ajax({
			url: '/dataInfo/card_'+i+'/'+ind+'.html',
			data: 'html',
			success: function(result) {
				$('.infor_html').html(result)
			},
			error: function(){
				$('.infor_html').html("Информация отсутсвует")
			},

		});
	}
	$('.colum-main').click( function() {
		var th = $(this)
		ind = th.attr('id')
				th.animate({  rotation: 0 }, {
					step: function() {
						var par = th.children('.colum-wrap')
						par.css('transform','rotateY(180deg)')
						 par.children('.inverse.back').css('transform','rotateY(180deg)') 
					},
					duration: 'slow'},'linear');
					
					getInfor(ind, th)
	});
	//Для динамически созданных объектов, где ".inverse.back" родитель 
	//а '.card_ind' сгенерированый или подгруженый объект
	$(".inverse.back").on('click', '.card_ind', function(){
		var ths = $(this).attr('id')
		var height = $(window).height()
		$('.card_modals').animate({'bottom': 0})
			getIdCardWind(ths)
			$('.close_info').on('click', function(){
				$('.card_modals').animate({'bottom': -height}, 1000)
			})
		
	})

	$('.thumbnail').click(function() {

			$(this).animate({'transform': 'rotate(180deg)'}, 1000)

	})
	

});



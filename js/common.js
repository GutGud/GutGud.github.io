$(function() {
	var userAG = detect.parse(navigator.userAgent);
	if('IE' == userAG.browser.family){
		$("body").prepend("<div class='bed_ie'><p>Уважаемые пользователи не пользуйтесь Internet Explorer</p><p>В этом браузере многие сайты отображаются не корректно!</p><p>Пожалуйста пользуйтесь другим браузером, например Google Chrome или Firefox</p><b>click me!</b></div>");
		$(".bed_ie").click(function(){
			$(this).css({'display':'none'})
		})		
	}
	$(document).ready(function() {
		$("#preloader_wrap").delay(100).fadeOut("slow")
	});
	
	var HEIGHT = $(window).height() + 200
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
		var top = $(window).scrollTop()
		if(top > 1000)	
			$(".scroll-back-up").css({'display':'block'})
		else
			$(".scroll-back-up").css({'display':'none'})

	});
	$(".scroll-back-up").click(function(){
		$("body,html").animate({
			"scrollTop" : '0'}, 1000);
		return false;
	});
	$(window).scroll(function(){
		var nameClass = $('header').attr('class');
		if(nameClass == 'parent'){
			var top = $(window).scrollTop() + 50;
			var one = $('.section-one').offset().top
			var two = $('.section-two').offset().top
			var three = $('.section-three').offset().top
			var four = $('.section-four').offset().top
			var five = $('.section-five').offset().top
			if (one > top){
				$('.top_navi span').css({'background' : '#FFF'})
			}else if(two < top && three > top){
				$('.top_navi span').css({'background' : '#FFF'})
			}else if(three < top && four > top){	
				$('.top_navi span').css({'background' : '#000'})
			}else if(four < top && five > top){	
				$('.top_navi span').css({'background' : '#FFF'})
			}else{
				$('.top_navi span').css({'background' : '#000'})
			}
		}else{
			stop()
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

		$('.hiddeb_form_block').animate({'marginTop': 4+'%'}, 1000);

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
				th.children('.inverse.back').html("<div style='color:red;font-size:1.2em;text-align:center;'>Информация отсутсвует</div>")
			},

		});
	}
	
	getIdCardWind = function(ind){
		var i = ind[0]
		$.ajax({
			url: '/dataInfo/card_'+i+'/'+ind+'.html',
			data: 'html',
			success: function(result, status) {
				$('.infor_html').html(result)
				return status
			},
			error: function(result, status){
				$('.infor_html').html("<div style='color:red;font-size:2em;text-align:center;'>Информация отсутсвует</div>")
				return status
			}

		});
	}
	
	$('.colum-main').click( function() {
		var th = $(this)
		ind = th.attr('id')
		th.animate({  rotation: 0 }, {
			step: function() {
				var par = th.children('.colum-wrap')
						par.css({'transform': 'rotateY(180deg)'})
						par.children('.inverse.back').css({'transform': 'rotateY(180deg)'}) 
			},
			duration: 'slow'},'linear');

		getInfor(ind, th)
	});
	getIdNeyb = function(ind) {
		var i = 0
		$('.card_ind').each(function(){
			var tch = $(this)
			var idN = tch.attr('id')
			if(idN[0] == ind){
				i++
			}
		})
		return i
	} 
	//Для динамически созданных объектов, где ".inverse.back" родитель 
	//а '.card_ind' сгенерированый или подгруженый объект
	$(".inverse.back").on('click', '.card_ind', function(){
		var ths = $(this)
		var ind = ths.attr('id')
		var height = $(window).height()
		var i = ind[1]
		var cou = getIdNeyb(ind[0])
		var wit = $(window).width()
		if(wit > 760)
			$('.card_modals').animate({'bottom': 0})
		getIdCardWind(ind)
		$(".arroy_right").click(function() {
			if(i < cou)
				i++ 
			if(i <= cou && i > 0)
				getIdCardWind(ind.replace(ind[1], i))
			else
				getIdCardWind(ind.replace(ind[1], i=0))
		})
		$(".arroy_left").click(function() {
			if(i > 1)
				i--
			if(i <= cou && i > 0)
				getIdCardWind(ind.replace(ind[1], i))
			else
				getIdCardWind(ind.replace(ind[1], i=cou))
		})
		$('.close_info').on('click', function(){
			$('.card_modals').animate({'bottom': -height}, 1000)
		})
		
	})

	$('.thumbnail').click(function() {

		$(this).animate({'transform': 'rotate(180deg)'}, 1000)

	})
	$(".advantages-block").waypoint(function(){
		$(".svg-card-infor").each(function(index){
			var t = $(this)
			setTimeout(function(){
				t.animated('zoomInDown');
			}, 500*index)
		})
	}, {
		offset : "33%"
	});

});



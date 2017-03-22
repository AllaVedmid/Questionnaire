$( document ).ready(function() { 
    

    pageSize = 1;
    pagesCount = $(".content").length;
    var currentPage = 1;
    var totalPages = Math.ceil(pagesCount / pageSize);
   
	$(".numeros").first().addClass("active");
	$(".finish_btn").hide();
    
    showPage = function() {
        $(".content").hide().each(function(n) {
            if (n >= pageSize * (currentPage - 1) && n < pageSize * currentPage)
                $(this).show();
        });
    }
    showPage();


    $(".pagination li.numeros").click(function() {
        $(".pagination li").removeClass("active");
        $(this).addClass("active");
        currentPage = parseInt($(this).text());
        showPage();

         if(currentPage == 4) {
			showFinishButton();
		}
       showNextButton();
        
    });

    $(".pagination li.pag_prev").click(function() {
        if($(this).next().is('.active')) return;
        $('.numeros.active').removeClass('active').prev().addClass('active');
        currentPage = currentPage > 1 ? (currentPage-1) : 1;
        showPage();
        showNextButton();
    });

    $(".pagination li.pag_next").click(function() {
        if($(this).prev().is('.active')) return;
        $('.numeros.active').removeClass('active').next().removeClass('btn-is-disabled').addClass('active');
        $('.pagination li.pag_next').addClass('btn-is-disabled');
        currentPage = currentPage < totalPages ? (currentPage+1) : totalPages;
        showPage();
        	var last = $(".numeros").last();
	 		if (last.is('.active')) {
				showFinishButton();

			}

			 if(currentPage == 2) {
			showCountry();
			}
    });



    $('#form_1__name').change(function(){

        var name = $("#form_1__name").val();    	
        localStorage.setItem('user_name', name);

        
    });
    $('#form_1__email').change(function(){

        var email = $("#form_1__email").val();        
        localStorage.setItem('user_email', email);
       

    });
    $('#form_1_valid').change(function(){
    	 if ($('.form-group').is('.has-error')) {
        	$('.pagination li.pag_next').addClass('btn-is-disabled ');
        }
        else {
        	$('.pagination li.pag_next').removeClass('btn-is-disabled ');
        }
    });
     
    ///////////////Page 2/////////////////////////////////

	
	$('#form_2__countries').change(function(){
		var val = $(this).find('option:selected').val();
		var country = $(this).find('option:selected').text();
		 localStorage.setItem('country', country);
		
	 $("#form_2__cities").find("option:gt(0)").remove();
		$.get( "cities.json", function( data ) {
			 $("#form_2__cities").find("option:first").text("Город");
			$.each(data , function (idx, obj) {
			    if (obj.country == val) {
			        
			        $("#form_2__cities").append('<option >'+obj.name+'</option>');
			    }
			});
			
		 

		

		});
    		

	});
	$('#form_2__cities').change(function(){		
		var city = $(this).find('option:selected').text();
		 localStorage.setItem('city', city);

	});

	$('#form_2_valid').change(function(){
		var val = $('#form_2__countries').find('option:selected').val();
		var city = $('#form_2__cities').find('option:selected').val();
		if(val == null  ){
			$('.pagination li.pag_next').addClass('btn-is-disabled ');

		}
		if ( city == null){
			$('.pagination li.pag_next').addClass('btn-is-disabled ');
		}
		else {
        	$('.pagination li.pag_next').removeClass('btn-is-disabled ');
        }
	});




//////////////////////////////////////////////////////////////////

    /////////Page 3/////////////////////

    $('input[type="checkbox"]').click(function(){
		if($(this).attr("value") === "fb"){
			$(".fb_add").toggle();
		}
		if($(this).attr("value") === "vk"){
			$(".vk_add").toggle();
		}
		if($(this).attr("value") === "tw"){
			$(".tw_add").toggle();
		}
		if($(this).attr("value") === "cm"){
			$(".cm_add").toggle();
		}


		});
   	$('#fb_add').change(function(){		
		var facebook = $(this).val();
		 localStorage.setItem('facebook', facebook);
		 $('.pagination li.pag_next').removeClass('btn-is-disabled ');

	});
	$('#vk_add').change(function(){		
		var vkontakte = $(this).val();
		 localStorage.setItem('vkontakte', vkontakte);
		 $('.pagination li.pag_next').removeClass('btn-is-disabled ');

	});
	$('#tw_add').change(function(){		
		var twitter = $(this).val();
		 localStorage.setItem('twitter', twitter);
		 $('.pagination li.pag_next').removeClass('btn-is-disabled ');

	});
	$('#cm_add').change(function(){		
		var classmates = $(this).val();
		 localStorage.setItem('classmates', classmates);
		 $('.pagination li.pag_next').removeClass('btn-is-disabled ');

	});

    
////////////////////////////////////////////////////

	/////// Page 4 ////

	$('#cat1').on('click', function(){
		$('#finish').removeClass('btn-is-disabled' );
		 localStorage.setItem('image', 'img/cat1.jpg');
		 $('.err_msg').css('display', 'none');
	});
	$('#cat2').on('click', function(){
		$('#finish').removeClass('btn-is-disabled' );
		 localStorage.setItem('image', 'img/cat2.jpg');
		 $('.err_msg').css('display', 'none');
	});

	$('#cat3').on('click', function(){
		$('#finish').removeClass('btn-is-disabled' );
		 localStorage.setItem('image', 'img/cat3.jpg');
		 $('.err_msg').css('display', 'none');
	});
	$('#dog').on('click', function(){
		$('.err_msg').fadeIn();
		$('#finish').addClass('btn-is-disabled' );
		 
	});

	$('#finish').on('click', function(){
		$('#total_info').fadeIn();
		$('#bottom_nav').hide();
		$('#top_nav').hide();
		$('.content').hide();
		if(localStorage.getItem("user_name") != null){
			var info_name = localStorage.getItem("user_name");
			$('.total_info_name').text(info_name);
		}
		if(localStorage.getItem("user_email") != null){
			var info_email = localStorage.getItem("user_email");
			$('.total_info_email').text(info_email);
		}
		if(localStorage.getItem("country") != null && localStorage.getItem("city") != null){
			var info_country = localStorage.getItem("country");
			var info_city = localStorage.getItem("city");
			$('.total_info_address').text(info_country + ','+' ' + info_city);
		}
		if(localStorage.getItem("facebook") != null){
			var info_facebook = localStorage.getItem("facebook");			
			$('.total_info_fb').text('Facebook:'+' ' + info_facebook);
		}
		if(localStorage.getItem("vkontakte") != null){
			var info_vkontakte = localStorage.getItem("vkontakte");			
			$('.total_info_vk').text('Вконтакте:'+' ' + info_vkontakte);
		}
		if(localStorage.getItem("twitter") != null){
			var info_twitter = localStorage.getItem("twitter");			
			$('.total_info_tw').text('Twitter:'+' ' +info_twitter);
		}
		if(localStorage.getItem("classmates") != null){
			var info_classmates = localStorage.getItem("classmates");			
			$('.total_info_cm').text('Однокласники:'+' ' +info_classmates);
		}
		if(localStorage.getItem("image") != null){
			var info_image = localStorage.getItem("image");			
			$('#total_info_image_item').attr('src', info_image);
		}

	});

	///////////////////

	//////////////// Page 5//////////

	$('#try_again').on('click', function(){
		localStorage.clear();
		$('#form_1_valid')[0].reset();
		$("#form_2__cities").find("option:gt(0)").remove();
		$("#form_2__countries").find("option:gt(0)").remove();
		$('#form_3_valid')[0].reset();
		$('#form_3_check')[0].reset();
		$('.social').hide();
		$('.total_info_fb').text(' ' );
		$('.total_info_vk').text(' ');
		$('.total_info_tw').text(' ' );
		$('.total_info_cm').text(' ' );
		$('#total_info').css('display', 'none');
		$('#bottom_nav').show();
		$('#top_nav').show();
		 $('#form_1').show();
		// $('.pagination li.pag_next').removeClass('btn-is-disabled ');
		$(".pagination li").removeClass("active");
        $(".numeros").first().addClass("active");
        currentPage = 1;
        showPage();
        showNextButton();
       
	});
	/////////////////////////////////
	
});
 
	function showCountry() {
		$.getJSON('countries.json', function(obj){

			for(key in obj){
				console.log( "Ключ: " + key + " значение: " + obj[key] );
				$("#form_2__countries").append('<option value="'+key+'">'+obj[key]+'</option>');
				
			}
		});
	}

	function showNextButton (){
		$(".finish_btn").hide();
        $(".pagination li.pag_next").show();
	}
	function showFinishButton (){
		$(".finish_btn").show();
		$(".pagination li.pag_next").hide();
	}
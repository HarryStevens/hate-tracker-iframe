var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

$.getJSON("data/getdata.json", function(data){

	// cards
	data.forEach(function(d, i){
		$(".cards-wrapper").append("<div data-slide-number='" + i + "' class='incident-block left incident-block-" + i + "'></div>");
		$(".incident-block-" + i).append("<a href='incident/" + d.url + "'></a>");
		$(".incident-block-" + i + " a").append("<div class='back'></div>");
		$(".incident-block-" + i + " a").append("<div class='text-container'></div>");
		$(".incident-block-" + i + " a .text-container").append("<p class='incident-date'>" + parseDate(d.dateOfIncident) + "</p>");
		$(".incident-block-" + i + " a .text-container").append("<h2 class='incident-title'>" + d.headline + "</h2>");
		$(".incident-block-" + i + " a").append("<div class='map-thumb'></div>");
		$(".incident-block-" + i + " a .map-thumb").css("background-image", "url('img/bisada-dadri-uttar-pradesh.png')");
	});

	var ibw = $("body").width() - ($(".incident-block").css("margin-left").split("px")[0] * 2);
	$(".incident-block").css({"max-width": ibw, "width": ibw });
	$(window).smartresize(function(){
		var ibw = $("body").width() - ($(".incident-block").css("margin-left").split("px")[0] * 2);
		$(".incident-block").css({"max-width": ibw, "width": ibw });
	});

	// show first one
	$(".incident-block-0").addClass("show").show();

	// for desktop
	$(document).on("click", ".change-slide.active", function(){
		changeSlide($(this).attr("data-type"), getSlideOptions($(this).attr("data-type")));
	});

	var swiping = false;

	$(".incident-block").draggable({
		axis: "x",
		stop: function(){
			
			if (isMobile){
				var curr = getCurrSlide();
				setTimeout(function(){
					$(".incident-block-" + curr).animate({"left": 0});	
				}, 10);	
			}
			
		}
	});

	if (!isMobile) $(".incident-block").draggable("option", "revert", true)

	$(".cards-wrapper").swipe( {

    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			
			var dir = direction == "left" ? "next" : "prev";
    	var options = getSlideOptions(dir);

    	if (options.curr_slide_number != data.length - 1 && dir == "next" || options.curr_slide_number != 0 && dir == "prev"){
    		
    		changeSlide(dir, options);
    		
    	} else {
    		
    		$(".incident-block").animate({left: 0});
    		
    	}

    }
  });

	function setChangeActive(){
		var obj = {
			prev: (getCurrSlide() == 0 ? false : true),
			next: (getCurrSlide() == data.length - 1 ? false: true)
		}

		if (obj.prev) {
			$(".change-slide.prev").addClass("active");
		} else {
			$(".change-slide.prev").removeClass("active");
		}

		if (obj.next) {
			$(".change-slide.next").addClass("active");
		} else {
			$(".change-slide.next").removeClass("active");
		}
	}

	setChangeActive();

	// function handleDrag(options){

	// 	$(".incident-block-" + options.curr_slide_number).css("opacity", 0);
	// 	$(".incident-block-" + options.next_slide_number).css("opacity", 1);

	// }

	function getSlideOptions(direction){
		return {
			curr_slide_number: getCurrSlide(),
			next_slide_number: direction == "next" ? getCurrSlide() + 1 : getCurrSlide() - 1,
			curr_slide_direction: direction == "next" ? "left" : "right",
			next_slide_direction: direction == "next" ? "right" : "left"
		}
	}

	function changeSlide(direction, options){

		var speed = 500;

		$(".show").removeClass("show").hide("slide", { direction: options.curr_slide_direction }, speed);
		$(".incident-block-" + options.next_slide_number).addClass("show").show("slide", { direction: options.next_slide_direction }, speed);

		setChangeActive();	

	}

	function getCurrSlide(){
		return +$(".show").attr("data-slide-number");
	}

	function parseDate(date){
		var months = [{num:1,month:"January"},{num:2,month:"February"},{num:3,month:"March"},{num:4,month:"April"},{num:5,month:"May"},{num:6,month:"June"},{num:7,month:"July"},{num:8,month:"August"},{num:9,month:"September"},{num:10,month:"October"},{num:11,month:"November"},{num:12,month:"December"}],
			split = date.split("-"),
			year = split[0],
			month = split[1],
			day = split[2];

		return (months.filter(function(d){ return d.num == +month; })[0].month) + " " + Number(day) + ", " + year; 

	}

});
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

	$(document).on("click", ".change-slide.active", changeSlide);

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

	function changeSlide(){

		var speed = 500;

		$(".change-slide").removeClass("active"); // remove active while sliding

		var direction = $(this).attr("data-type"),
			curr_slide_number = getCurrSlide();

		var options = {
			next_slide_number: direction == "next" ? curr_slide_number + 1 : curr_slide_number - 1,
			curr_slide_direction: direction == "next" ? "left" : "right",
			next_slide_direction: direction == "next" ? "right" : "left"
		}

		$(".incident-block").addClass("sliding");
		
		$(".show").removeClass("show").hide("slide", { direction: options.curr_slide_direction }, speed);

		$(".incident-block-" + options.next_slide_number).addClass("show").show("slide", { direction: options.next_slide_direction }, speed);
		$(".incident-block").removeClass("sliding");

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
$(document).ready(function() {
	timer = setInterval(function(){
		if(count==0){
			$("#loader").fadeOut();
			clearInterval(timer);

			var $root = $('html, body');
				$('a').click(function() {
					var href = $.attr(this, 'href');
					$root.animate({
					scrollTop: $(href).offset().top
					}, 500, function(){document.location.hash = href;
					document.location.hash = href;});
				return false;
			});


			$('body').scrollspy({ target: '#navigationBar' });
			$(document).on('activate.bs.scrollspy', function(e) {
				var $hash, $node;
				$hash = $("a[href^='#']", e.target).attr("href").replace(/^#/, '');
				$node = $('#' + $hash);
				if ($node.length) {
				$node.attr('id', '');
				}
				document.location.hash = $hash;
				document.location.hash = $hash;
				if ($node.length) {
					return $node.attr('id', $hash);
				}
			});
		}
	}, 5000);
	//setStellar();
	loadTrainingProject();
	loadnetwork();
	loadbudget();
	loadservice();
	//loadSkills();
	loadTrainSyl();
	loadExtraActivities();
	loadExtraAchievements();
});




function setStellar(){
	$.stellar({
	  // Set scrolling to be in either one or both directions
	  horizontalScrolling: true,
	  verticalScrolling: true,

	  // Set the global alignment offsets
	  horizontalOffset: 0,
	  verticalOffset: 0,

	  // Refreshes parallax content on window load and resize
	  responsive: false,

	  // Select which property is used to calculate scroll.
	  // Choose 'scroll', 'position', 'margin' or 'transform',
	  // or write your own 'scrollProperty' plugin.
	  scrollProperty: 'scroll',

	  // Select which property is used to position elements.
	  // Choose between 'position' or 'transform',
	  // or write your own 'positionProperty' plugin.
	  positionProperty: 'position',

	  // Enable or disable the two types of parallax
	  parallaxBackgrounds: true,
	  parallaxElements: true,

	  // Hide parallax elements that move outside the viewport
	  hideDistantElements: true,

	  // Customise how elements are shown and hidden
	  hideElement: function($elem) { $elem.hide(); },
	  showElement: function($elem) { $elem.show(); }
	});
}

var timer;
var hash;
var count=8;
var spreadsheetID1 = "1KTMZtbXMXjK1EzX9wTnFlHyVDrrl08ef5edDLT5oYKI";
var spreadsheetID2 = "1oTbp_6Vn7mEX2n04gX1GtwKDqVvc7AuWH9aBsMz9oLs";
var spreadsheetID3 = "11b6pdiHr3n0NYcp1m8puWalWFUeAkRb0Pe9UuTJVWVw";
var trainSyl = [];
var trainingProject = [];
var network =[];
var budget = [];
var service = [];
var projects = [];
var activities = [];
var achievements = [];


function loadTrainSyl(){
	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID2 + "/1/public/values?alt=json";

	var jqxhr = $.getJSON(url);

	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;

		$(entries).each(function(){
			trainSyl.push(new TrainingSyllabus(this));
		});

		ko.applyBindings(trainSyl, document.getElementById("trainingSyllabus"));
		count--;
		$('.updateStatus').append('<p>Loaded: Loaded training Syllabus</p>');
	});
}

function loadTrainingProject(){
	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID3 + "/1/public/values?alt=json";

	var jqxhr = $.getJSON(url);

	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;

		$(entries).each(function(){
			trainingProject.push(new TrainingProject(this));
		});

		ko.applyBindings(trainingProject, document.getElementById("trainingProject"));
		$('.updateStatus').append('<p>Loaded: Training Project Details</p>');
		count--;
	});
}

function loadnetwork(){

	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID3 + "/2/public/values?alt=json";

	var jqxhr = $.getJSON(url);

	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;


        $(entries).each(function(){
			str = '<b>'+this.gsx$subject.$t+'</b>: ';
			str += this.gsx$courses.$t;
			network.push(str);

		});

		ko.applyBindings(network, document.getElementById("network"));
		$('.info').matchHeight();
		$('.updateStatus').append('<p>Loaded: Scholastic Achievements</p>');
		count--;
	});
}

function loadbudget(){

	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID3 + "/3/public/values?alt=json";

	var jqxhr = $.getJSON(url);

	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;

		$(entries).each(function(){
			str = '<b>'+this.gsx$subject.$t+'</b>: ';
			str += this.gsx$courses.$t;
			budget.push(str);
		});

		ko.applyBindings(budget, document.getElementById("budget"));
		$('.info').matchHeight();
		$('.updateStatus').append('<p>Loaded: Courework</p>');
		count--;
	});

}

function loadservice(){

	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID3 + "/4/public/values?alt=json";

	var jqxhr = $.getJSON(url);

	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;



		$(entries).each(function(){
			str = '<b>'+this.gsx$subject.$t+'</b>: ';
			str += this.gsx$courses.$t;
			service.push(str);

		});

		ko.applyBindings(service, document.getElementById("service"));
		$('.info').matchHeight();
		$('.updateStatus').append('<p>Loaded: service</p>');
		count--;
	});

}


function loadExtraActivities(){

	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID1 + "/1/public/values?alt=json";
	var jqxhr = $.getJSON(url);

	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;

		$(entries).each(function(){
			activities.push(this.gsx$activity.$t);
		});

		ko.applyBindings(activities, document.getElementById("activities"));
		$('.updateStatus').append('<p>Loaded: Extracurricular Activities</p>');
		count--;
	});

}

function loadExtraAchievements(){

	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID1 + "/2/public/values?alt=json";
	var jqxhr = $.getJSON(url);

	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;

		$(entries).each(function(){
			achievements.push(this.gsx$achievement.$t);
		});

		ko.applyBindings(achievements, document.getElementById("achievements"));
		$('.updateStatus').append('<p>Loaded: Extracurricular Achievements</p>');
		count--;
	});

}

function TrainingSyllabus(data) {
	this.type = data.gsx$type.$t;
    this.startDate = data.gsx$startdate.$t;
	this.endDate = data.gsx$enddate.$t;
	this.title = data.gsx$title.$t;
	this.programes = data.gsx$programes.$t;
	this.location = data.gsx$location.$t;
	this.Desc= data.gsx$describtion.$t;
}

function TrainingProject(data) {
	this.startDate = data.gsx$startdate.$t;
	this.ptitle = data.gsx$ptitle.$t,
	this.datasource = data.gsx$datasource.$t;
	this.public = data.gsx$public.$t;
	this.score = data.gsx$score.$t;
}

function initializeCarousel(){
	var jcarousel = $('.jcarousel');

	var perPageItem;

        jcarousel
            .on('jcarousel:reload jcarousel:create', function ()
					{
						var carousel = $(this),
							width = carousel.innerWidth();
							perPageItem = 1;

						if (width>=1000){
							perPageItem = 6;
						} else if (width >= 600) {
							perPageItem = 3;
						} else if (width >= 350) {
							perPageItem = 2;
						}

						width = Math.floor(width / perPageItem);;

						carousel.jcarousel('items').css('width',width + 'px');
					})
            .jcarousel({
                wrap: 'circular'
            });

        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            .jcarouselPagination({
                perPage: 1,
                item: function(page) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            });
	$('.jcarousel').jcarouselAutoscroll({
	target: '+=1'//+Math.max(Math.ceil(perPageItem/2),1)
});
}

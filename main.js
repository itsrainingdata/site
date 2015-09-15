//
//  main.js
//
//  Created by Bryon Aragam on 2/1/14.
//  Copyright (c) 2014 Bryon Aragam. All rights reserved.
//

//
// Browser check: For future use
//  NOTE: Currently no issues have been found with this file. Use this
//         in the future if issues arise, though.
if(true){
	var ALLOW_TRANSITIONS = true;
}

//-----------------------------------------------------------------------------/
// SUNSET / SUNRISE CODE
//-----------------------------------------------------------------------------/
var d = new Date();		// current date and time
var h = d.getHours();	// extract the hours
var m = d.getMinutes();	// extract the minutes
m = 60*h + m; 			// current time in minutes

var sunriseStart = 5*60; // start at 5:00am
var sunsetStart = 17*60; // start at 5:00pm

//------------TESTING------------/
//m = 18*60;
//-------------------------------/

var duration = 180; // length of sunrise or sunset (in minutes)
var sunriseEnd = sunriseStart + duration;
var sunsetEnd = sunsetStart + duration;

//
// This is used to avoid setting a timer to save computational resources 
// When the time is not close to start/end of sunrise/sunset, there is no point in setting a timer
//
var dt = 10;	// threshold in minutes before and after to define a "grace period" for setting the timer
var start_timer = ((m > sunriseStart - dt) && (m < sunriseStart + dt)) || ((m > sunriseEnd - dt) && (m < sunriseEnd + dt)) || ((m > sunsetStart - dt) && (m < sunsetStart + dt)) || ((m > sunsetEnd - dt) && (m < sunsetEnd + dt));
//alert(start_timer); // TESTING

// set footer colour (to make the footer easy to see in any condition)
FOOTER_BG_COLOUR = "rgba(200,200,200,0.4)"

//-----------------------------------------------------------------------------/
// DEFINE THEMES
//-----------------------------------------------------------------------------/

//
// Each theme has 6 major components:
//  0) Theme ID
//  1) Background colour
//  2) Background image
//  3) Text colour
//  4) Menu background colour
//  5) Menu text highlight colour
//  6) Mobile navbar background colour
//  7) Day/night identifier
//
var day_clean_theme = ["day-clean",
					   "rgb(255,255,255)",
	   				   null,
				 	   "rgb(50,50,50)", 
				 	   "rgba(50,50,50,0.8)",
				 	   "rgb(255,255,255)",
				 	   "rgba(255,255,255,0.8)",
				 	   "day"
				 	   ];
var night_clean_theme = ["night-clean", 
					     "rgb(0,0,0)",
						 null,
						 "rgb(120,120,120)",
						 "rgba(120,120,120,0.8)",
						 "rgb(0,0,0)",
						 "rgba(0,0,0,0.8)",
						 "night"
						];

var day_theme = ["day",
			     "rgb(255,255,255)",
	   			 "url(./imgs/sunny.jpg)",
				 "rgb(50,50,50)", 
				 "rgba(50,50,50,0.8)",
				 "rgb(10,135,217)",
				 "rgba(10,135,217,0.8)",
				 "day"
				 ];
var night_theme = ["night",
			     "rgb(0,0,0)",
	   			 "url(./imgs/stars.jpg)",
				 "rgb(120,120,120)", 
				 "rgba(120,120,120,0.8)",
				 "rgb(0,0,0)",
				 "rgba(0,0,0,0.8)",
				 "night"
				 ];
var sunrise_theme = ["sunrise",
			         "rgb(255,255,255)",
	   			     "url(./imgs/downtown.jpg)",
				  	 "rgb(250,250,250)", 
				     "rgba(250,250,250,0.8)",
				     "rgb(93,105,136)",
				     "rgba(93,105,136,0.8)",
				     "day"
				     ];			
var sunset_theme = ["sunset",
    		        "rgb(255,255,255)",
       			    "url(./imgs/sunset.jpg)",
    			  	"rgb(250,250,250)", 
    			    "rgba(250,250,250,0.8)",
    			    "rgb(236,110,95)",
    			    "rgba(236,110,95,0.8)",
    			    "day"
    			     ];	 

// always starts in day-clean theme (white bg, gray text)
var CURRENT_THEME = day_clean_theme;
var THEMES = [day_clean_theme, night_clean_theme, day_theme, night_theme, sunrise_theme, sunset_theme];

// set default images
//! var day_img = 'url(./imgs/sunny.jpg)';
//! var night_img = 'url(./imgs/stars.jpg)';

// set default text colours
//! var day_text_colour = "rgb(50,50,50)";
//! var night_text_colour = "rgb(120,120,120)";

//set default background colours
//! var day_bg_colour = "rgba(255,255,255,1)";
//! var night_bg_colour = "rgba(0,0,0,1)";

//set default navbar colours (mobile mode)
//! var day_nav_colour = "rgba(255,255,255,0.9)";
//! var night_nav_colour = "rgba(0,0,0,0.75)";

// change images and text based on time of day
if(m >= sunsetStart && m <= sunsetEnd){
	//alert("sunset");
	var is_sunset = true;
	//! day_img = 'url(./imgs/sunset.jpg)';
	//! var sunset_text_colour = "rgb(250,250,250)";
	//! var sunset_nav_colour = "rgba(181,62,62,0.85)"
} else if(m >= sunriseStart && m <= sunriseEnd){
	//alert("sunrise");
	var is_sunrise = true;
	//! day_img = 'url(./imgs/downtown.jpg)';
	//! var sunrise_text_colour = "rgb(250,250,250)";
	//! var sunrise_nav_colour = "rgba(106,121,154,0.85)"
} else{
	var is_sunset = false;
	var is_sunrise = false;
}

//
// Do not include "a.hover-clean-day:hover, a.hover-clean-night:hover" as this will
//  break the blur on-hover animation in the menu
//
// 4/16/14: Removed li > a from text_selectors
//
var text_selectors = ".my-main-content, .my-content, #my-day, #my-night, #my-off, .my-main-heading > a, #my-navbar-header-xs, #my-footer"; 
// text_selectors = "a.hover-clean-day:hover, a.hover-clean-night:hover, .my-main-content, .my-content, #my-day, #my-night, .my-main-heading > a, #my-navbar-header-xs, #my-footer, li>a";

// 
// Updates the time and the associated image/colour scheme data if the user is still on the site
//  when we transition to or from sunrise/sunset
//
function updateTime(){
	d = new Date();
	h = d.getHours();
	m = d.getMinutes();
	m = 60*h + m;

	if(m >= sunsetStart && m <= sunsetEnd){
		is_sunset = true;
		//! day_img = 'url(./imgs/sunset.jpg)';
		//! sunset_text_colour = "rgb(250,250,250)";
		//! sunset_nav_colour = "rgba(181,62,62,0.85)"
	} else if(m >= sunriseStart && m <= sunriseEnd){
		is_sunrise = true;
		//! day_img = 'url(./imgs/downtown.jpg)';
		//! sunrise_text_colour = "rgb(250,250,250)";
		//! sunrise_nav_colour = "rgba(106,121,154,0.85)"
	} else{
		//! day_img = 'url(./imgs/sunny.jpg)'; // this is needed to make sure we can transition BACK to the usual daytime background
		is_sunset = false;
		is_sunrise = false;
	}
}

// Random numbers weeeeeee
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//
// Important function that changes the colour of the mobile navbar toggle
//
function change_toggle_colour(c){
	$("span.icon-bar").animate({
		backgroundColor: c
	}, {duration: 1000, queue: false});

	$(".navbar-toggle, .navbar-collapse").animate({
		borderColor: c
	}, {duration: 1000, queue: false});
}

//
// Control the transition to a given scheme
//
// Each theme has 6 major components:
//  0) Theme ID
//  1) Background colour
//  2) Background image
//  3) Text colour
//  4) Menu background colour
//  5) Menu text highlight colour
//  6) Mobile navbar background colour
//  7) Day/night identifier
//
function to_scheme(from_scheme, to_scheme){
	var background_img = $("#bg");				// select the background tag
	var menu_class = to_scheme[0];				// theme id
	var bg_colour_swap = to_scheme[1];			// this is the colour the background will eventually change to
	var bg_img = to_scheme[2];					
	var text_colour_swap = to_scheme[3];		// this is the colour the text will eventually change to
	var menu_text_colour_swap = to_scheme[5];	// this is the colour the text will eventually change to
	var nav_colour_swap = to_scheme[6];			// this is the colour the mobile navbar will eventually change to
	var to_theme = to_scheme[7];

	var to_hover_menu_class = "hover-" + menu_class;
	var to_active_menu_class = "hover-" + menu_class + "-active";

	var from_hover_menu_class = "hover-" + from_scheme[0];
	var from_active_menu_class = "hover-" + from_scheme[0] + "-active";

	$("#my-nav-list-xs a, #my-navbar a").removeClass(from_hover_menu_class).addClass(to_hover_menu_class);
	$("#my-nav-list-xs a.menu-active, #my-navbar a.menu-active").removeClass(from_active_menu_class).addClass(to_active_menu_class);
	
	// If we want to change link colours based on theme
	//$(".my-link").addClass("my-not-blue-link");

	// transition the background colour
	$("body").animate({
		backgroundColor: bg_colour_swap
	}, {duration: 2000, queue: false});
	
	// transition the mobile navbar colour
	$("#my-navbar-xs").animate({
		backgroundColor: nav_colour_swap
	}, {duration: 2000, queue: false});

	// transition the font colour (everywhere!)
	$(text_selectors).animate({
		color: text_colour_swap
	}, {duration: 1000, queue: false});

	// transition the lower border of the navbar
	$("#my-navbar-xs").animate({
		borderBottomColor: text_colour_swap
	}, {duration: 1000, queue: false});

	change_toggle_colour(text_colour_swap);

	if(bg_img != null){ 
		// fade out the current background image, swap it out for a new one, and then fade the new one back in
	    background_img.fadeOut(1000).promise().done( function(){
	    	background_img.css('background-image', bg_img);
	    });
	    background_img.fadeIn(1000);
	    background_img.removeClass("content-hidden");

	    // when adding an image background we need to make sure the footer is always easy to see
	    if(to_theme == "day"){
		    $("#my-footer").animate({
				backgroundColor: FOOTER_BG_COLOUR
			}, {duration: 1000, queue: false});
		} else{
			$("#my-footer").animate({
				backgroundColor: "transparent"
			}, {duration: 1000, queue: false});
		}
    } else{
    	// fade out the background image (do not fade a new one in--we are fading in a flat background colour here)
		background_img.fadeOut(1000);
		background_img.addClass("content-hidden");

		// since we aren't fading a new image in, get rid of the footer "shadow"
		$("#my-footer").animate({
			backgroundColor: "transparent"
		}, {duration: 1000, queue: false});
    }

    if(to_theme == "day"){
    	// toggle classes between night / day
		$(".active-night").toggleClass("active-day").toggleClass("active-night");
    } else{
    	// toggle classes between night / day
		$(".active-day").toggleClass("active-night").toggleClass("active-day");
    }

    CURRENT_THEME = to_scheme; // finally, update the current theme ID
    //alert(CURRENT_THEME);
}

//
// An attempt to have the theme automatically transition between night/sunrise/day/sunset/night
//   The timing works--it transitions automatically--however, the to_scheme function was not 
//   written to handle image to image cross-fading (currently it only handles colour to image to
//   colour). Thus, the transition occurs, but looks funky. Before implementing this the transitions
//   in to_scheme need to be fixed to handle image to image fading.
//
function autoSwitchTheme(){
	updateTime();

	if(CURRENT_THEME[7] == "night" && is_sunrise){
		to_scheme(CURRENT_THEME, sunrise_theme);
	} else if(CURRENT_THEME[7] == "sunrise" && !is_sunrise){
		to_scheme(CURRENT_THEME, day_theme);
	} else if(CURRENT_THEME[7] == "day" && is_sunset){
		to_scheme(CURRENT_THEME, sunset_theme);
	} else if(CURRENT_THEME[7] == "sunset" && !is_sunset){
		to_scheme(CURRENT_THEME, night_theme);
	}

}

// If it's close to the start or end of sunrise or sunset, set a timer so that the image will update as needed
if(start_timer){
	setInterval(updateTime, 60*1000);
	//setInterval(autoSwitchTheme, 60*1000);
}

//
// Main jQuery code
//
$(document).ready(function(){

	// This collapses the mobile navbar once a selection has been made
	//
	//   NOTE: To collapse the mobile nav list when user clicks on the main heading, add
	//          #my-navbar-header-xs to the jQuery selector below; note that this has
	//          the undesirable side effect of *opening* the list when it is closed.
	$('.nav a').on('click', function(){		
	    $(".navbar-toggle").click();
	});

	// need to add this manually at the beginning so that the day/night footer shows up without/before any click events
	if(ALLOW_TRANSITIONS) addFooter("#intro-content");

	// this controls how long the transitions between content selections last
	var fade_delay = 600;

	// main function that animates the fade effect for transitioning between content sections
	function changeContent(selected, id_show, d, blurPersists){
		var background_img = $("#bg");

		// Change the classes associated with the theme
		//
		//  1) Eliminate all "active-xxxx" tags
		//  2) If it used to be "clean" on-hover (i.e. the selection), make it blurry
		//  3) Make the new selection "clean" on-hover and make it active
		//  4) Add an "active-xxxx" class to the background div
		
		var theme_id = "day-clean"; //default
		if(background_img.hasClass("active-day")){
			if(background_img.hasClass("content-hidden")){
				theme_id = "day-clean";
			} else{
				if(is_sunrise){
					theme_id = "sunrise";
				} else if(is_sunset){
					theme_id = "sunset";
				} else{
					theme_id = "day";
				}
			}
		} else if(background_img.hasClass("active-night")){
			if(background_img.hasClass("content-hidden")){
				theme_id = "night-clean";
			} else{
				theme_id = "night";
			}
		}

		var class_id = "hover-" + theme_id + "-active";
		$("." + class_id).removeClass(class_id).removeClass("menu-active");
		selected.addClass(class_id).addClass("menu-active");
		//background_img.addClass("active-day");

		// Fade out old content
		// After the fade animation, add the footer
		$(".my-content").fadeOut().promise().done( function(){ addFooter(id_show)});

		// Fade in new content
		// The delay is used to sync the animations and is necessary 
		$(id_show).delay(d).fadeIn();
	}

	function addFooter(id_show){
		// First remove the footer; this is critical so we don't have multiple footer divs floating around
		$("#my-footer").remove();

		// Only add the footer if the browser passes and transitions are allowed
		if(ALLOW_TRANSITIONS){
			// needed for background fade
			var background_img = $("#bg");

			// now add it back to the necessary content div
			// $(id_show).append('<div id="my-footer">&nbsp;<a id="my-day">day</a> / <a id="my-night">night</a> / <a id="my-off">off</a>&nbsp;</div>');
			$(id_show).append('\
				<div id="my-footer"> \
					<div id="my-left-footer"> \
						<a class="hidden-xs hover-day-clean" style="float:left; margin-right:18px" id="linkedin" href="http://www.linkedin.com/in/test"><i class="fa fa-linkedin fa-1x"></i></a> \
						<a class="hidden-xs" style="float:left; margin-right:18px" href="https://github.com/test"><i class="fa fa-github fa-1x"></i></a> \
						<a class="hidden-xs" style="float:left; margin-right:18px" id="email-xs" href="mailto:test@stat.ucla.edu"><i class="fa fa-envelope-o fa-1x"></i> </a> \
					</div> \
					<div id="my-right-footer"> \
						&nbsp;<a id="my-day">day</a> / <a id="my-night">night</a> / <a id="my-off">off</a>&nbsp; \
					</div> \
				</div> \
			');
			$("#my-footer, #my-footer > a").css("color", CURRENT_THEME[3]);
			
			// if there is already an image background we need to make sure the footer is always easy to see
			// ps only in day mode though
			if(!background_img.hasClass("content-hidden") && background_img.hasClass("active-day")){
				$("#my-footer").animate({
					backgroundColor: FOOTER_BG_COLOUR
				}, {duration: 1000, queue: false});
			}
	
			// add the click event to day
			$("#my-day").click(function(){
				if(CURRENT_THEME[7] == "night" || !background_img.hasClass("content-hidden")){
					to_scheme(CURRENT_THEME, day_clean_theme);
				} else{
					if(is_sunrise){
						to_scheme(CURRENT_THEME, sunrise_theme);
					} else if(is_sunset){
						to_scheme(CURRENT_THEME, sunset_theme);
					} else if(background_img.hasClass("content-hidden")){
						to_scheme(CURRENT_THEME, day_theme);
					} else{
						to_scheme(CURRENT_THEME, day_clean_theme);	
					}
				}
			});
	
			// add the click event to night
			$("#my-night").click(function(){
				if(CURRENT_THEME[7] == "day"){
					to_scheme(CURRENT_THEME, night_clean_theme);
				} else{
					if(background_img.hasClass("content-hidden")){
						to_scheme(CURRENT_THEME, night_theme);
					} else{
						to_scheme(CURRENT_THEME, night_clean_theme);	
					}
				}
			});
			
			// add click event to off button
			$("#my-off").click(function(){
				to_scheme(CURRENT_THEME, day_clean_theme);
			});
		}
	}

	//
	// Add click events for each nav element to enable transitioning 
	//  between content sections
	//
	// 04/12/14: Used to use changeContent($(this), ...) but this was changed so that the list selection / blur
	//             would still update properly when a selection was made outside the list itself 
	//			   (e.g. clicking on "E-mail me" in other sections)
	//
	$("#my-navbar-header, #my-navbar-header-xs").click(function(){
		changeContent($("#my-navbar-header, #my-navbar-header-xs"), "#intro-content", fade_delay, false);
		
		// Only when the user clicks on the header (e.g. "home"), all of the navigation links 
		//  should become unblurred since none of these sections are "active"
		$("#my-navbar a, #my-nav-list-xs a").removeClass("active-day").removeClass("active-night");
	});

	$("#research, #research-xs, #click-research-1").click(function(){
		changeContent($("#research, #research-xs"), "#research-content", fade_delay, true);
	});

	$("#teaching, #teaching-xs").click(function(){
		changeContent($("#teaching, #teaching-xs"), "#teaching-content", fade_delay, true);
	});

	// deprecating
	// $("#tutoring, #tutoring-xs").click(function(){
	// 	changeContent($("#tutoring, #tutoring-xs"), "#tutoring-content", fade_delay, true);
	// });

	$("#software, #software-xs").click(function(){
		changeContent($("#software, #software-xs"), "#software-content", fade_delay, true);
	});

	$("#consulting, #consulting-xs, #click-consulting-1").click(function(){
		changeContent($("#consulting, #consulting-xs"), "#consulting-content", fade_delay, true);
	});

	$("#about, #about-xs, #click-about-1, #click-about-2").click(function(){
		changeContent($("#about, #about-xs"), "#about-content", fade_delay, true);
	});

	$("#playtime").click(function(){
		var rdm = getRandomInt(0, 1);
		if(rdm){
			$("#my-night").click();
		} else{
			$("#my-day").click();
		}
	});

});
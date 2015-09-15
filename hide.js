//
//  hide.js
//
//  Created by Bryon Aragam on 4/14/14.
//  Copyright (c) 2014 Bryon Aragam. All rights reserved.
//

//
// Simple script used to hide content if Javascript is detected / on / available
//   If Javascript is turned off, all the content will display on one page. This is ugly,
//   but more desirable than being unable to view any of the content beyond the intro page.
//
$(document).ready(function(){
	$("#research-content, #teaching-content, #software-content, #consulting-content, #about-content").addClass("content-hidden");
	$(".my-hidden-heading").addClass("content-hidden");

	$("body").show();
});
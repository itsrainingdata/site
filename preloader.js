//
// Preloader code
//  NEEDS TESTING AND UPDATING
//
function preloader() {
	if (document.images) {
		var img1 = new Image();
		var img2 = new Image();
		var img3 = new Image();
		var img4 = new Image();

		img1.src = "./imgs/sunny.jpg";
		img2.src = "./imgs/sunset.jpg";
		img3.src = "./imgs/stars.jpg";
		img4.src = "./imgs/downtown.jpg";
	}
}

$(document).ready(function(){
	preloader(); // preload the background images
});
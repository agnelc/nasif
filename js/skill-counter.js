// Skill Counter

current = 0;
current1 = 0;
current2 = 0;
current3 = 0;
   /*
jQuery(function () {
	interval = setInterval(function () {
		current++;
		if (current == 91) {
			clearInterval(interval);
		}
		jQuery("#timer1").html(current + "%");
	}, 100);
	interval1 = setInterval(function () {
		// do whatever here
		current1++;
		if (current1 == 85) {
			clearInterval(interval1);
		}
		jQuery("#timer2").html(current1 + "%");
	}, 100);
	interval2 = setInterval(function () {
		// do whatever here
		current2++;
		if (current2 == 74) {
			clearInterval(interval2);
		}
		jQuery("#timer3").html(current2 + "%");
	}, 100);
	interval3 = setInterval(function () {
		// do whatever here
		current3++;
		if (current3 == 57) {
			clearInterval(interval3);
		}
		jQuery("#timer4").html(current3 + "%");
	}, 100);
});*/


function loadCounter() 
	{
	interval = setInterval(function () {
		current++;
		if (current == 91) {
			clearInterval(interval);
		}
		jQuery("#timer1").html(current + "%");
	}, 50);
	interval1 = setInterval(function () {
		// do whatever here
		current1++;
		if (current1 == 85) {
			clearInterval(interval1);
		}
		jQuery("#timer2").html(current1 + "%");
	}, 50);
	interval2 = setInterval(function () {
		// do whatever here
		current2++;
		if (current2 == 74) {
			clearInterval(interval2);
		}
		jQuery("#timer3").html(current2 + "%");
	}, 50);
	interval3 = setInterval(function () {
		// do whatever here
		current3++;
		if (current3 == 57) {
			clearInterval(interval3);
		}
		jQuery("#timer4").html(current3 + "%");
	}, 50);
}
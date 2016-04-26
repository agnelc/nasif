/** *************Init JS*********************
	
    TABLE OF CONTENTS
	---------------------------
	1. Preloader
	2. Ready Function
	   a) Auto height for the home page
	   b) accordion
	   c) nicescroll
	3. Stickey Header
	4. Nvigation & Social Icons
	5. Owl Carousel
	6. Scroll To 
	7. Portfolio
	8. Form JS
	9. Placeholder (IE)JS


/*************************************/
"use strict";

var $j = jQuery.noConflict();
var $scroll = 0;
var $window_width = $j(window).width();
var $window_height = $j(window).height();
var logo_height;
var menu_dropdown_height_set = false;
var sticky_amount = 0;
var content_menu_position;
var content_menu_top;
var content_menu_top_add = 0;
var src;
var next_image;
var prev_image;
var $top_header_height;
var min_w = 1500;
var video_width_original = 1280;
var video_height_original = 720;
var vid_ratio = 1280 / 720;
var skrollr_slider;

/*========== Page Loader start ================*/
$j(window).load(function() {
	// Animate loader off screen
	$j(".loader").fadeOut();
    /*will fade out the whole DIV that covers the website.*/
	$j(".loader-icon").delay(100).fadeOut("slow");
	panel();
});
function panel(){
	$j('.show-panel').click(function () {
		$j('.panel').slideToggle();
	});
}
/*========== Page Loader end ================*/

$j(document).ready(function () {
	$j(".content").css("min-height", $j(window).height() - $j("header.page_header").height() - $j("footer").height());
	if ($j("header").hasClass("regular")) {
		content_menu_top = 0
	}
	if ($j("header").hasClass("fixed")) {
		content_menu_top = min_header_height_scroll
	}
	if ($j("header").hasClass("stick") || $j("header").hasClass("stick_with_left_right_menu")) {
		content_menu_top = 0
	}
	if (!$j("header.page_header").hasClass("scroll_top") && $j("header.page_header").hasClass("has_top") && $j("header.page_header").hasClass("fixed")) {
		content_menu_top_add = 34
	}
	if ($j("body").hasClass("vertical_menu_enabled"))
	{
		content_menu_top = 0;
		content_menu_top_add = 0;
		var a = 0
	}
	setDropDownMenuPosition();
	initDropDownMenu();
	initVerticalMenuToggle();
	initVerticalMobileMenu();
	initSideMenu();
	initCheckSafariBrowser();
	initCheckFirefoxMacBrowser();
	$scroll = $j(window).scrollTop();
	$j("header:not(.stick_with_left_right_menu) .q_logo a").css("visibility", "visible");	
	/*setAutoHeight*/
	var setElementHeight = function () {
		var width = $j(window).width();		
		if(width>=992){
			var height = $j(window).height();			
			$j('.autoheight').css('min-height', (height));		
		}
		else{
			$j('.autoheight').css('min-height', (752));	
		}
	};
	$j(window).on("resize", function () {
		setElementHeight();
	}).resize();	
	/*Accordion*/
	var $accordionEl = $j('.accordion');
	if( $accordionEl.length > 0 ){
		$accordionEl.each( function(){
			var $accElement = $j(this);
			var accElementState = $accElement.attr('data-state');

			$accElement.find('.acc_content').hide();

			if( accElementState != 'closed' ) {
				$accElement.find('.acctitle:first').addClass('acctitlec').next().show();
			}

			$accElement.find('.acctitle').on('click',function(){
				if( $j(this).next().is(':hidden') ) {
					$accElement.find('.acctitle').removeClass('acctitlec').next().slideUp("normal");
					$j(this).toggleClass('acctitlec').next().slideDown("normal");
				}
				return false;
			});
		});
	}
	/*Accordion*/	
});
/*========== Stickey Header start ================*/
function stickyMenu() {
	var windowOffset = jQuery(window).scrollTop();
	if(windowOffset > 10)
	{
		 jQuery('#header_main_in').addClass('sticky-header');
	}
	else if(windowOffset < 240)
	{
		 jQuery('#header_main_in').removeClass('sticky-header');
	}
} 
jQuery(window).scroll(function () {
    stickyMenu(); 
}); 
/*========== Stickey Header end ================*/

if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
	document.createTextNode(
	  '@-ms-viewport{width:auto!important}'
	)
  )
  document.querySelector('head').appendChild(msViewportStyle)
}

/*========== Nvigation & Social Icons start ================*/
jQuery(document).on("click", ".menu-btn a", function(){
	jQuery(this).toggleClass("active");
	jQuery(".navigation").slideToggle();
	jQuery(".social-links").slideUp();
	jQuery(".connect-btn a").removeClass("active");
	return false;
});	
jQuery(document).on("click", ".connect-btn a", function(){
	jQuery(this).toggleClass("active");
	jQuery(".social-links").slideToggle();
	jQuery(".navigation").slideUp();
	jQuery(".menu-btn a").removeClass("active");
	return false;
});
/*========== Nvigation & Social Icons end ================*/

/*========== Owl Carousel start ================*/
var cl=1;
jQuery("#owl-example").owlCarousel({
	items : 1,
	slideSpeed : 900,
	loop:true,
	lazyLoad : true,
	navigation : true,
	responsiveClass:true,
	afterMove:moved
});
var loaded=false;
function moved()
{
	var owl = jQuery("#owl-example").data('owlCarousel');
    if (owl.currentItem==4)
	{
		if(!loaded)
		{
		loadCounter();
		loaded=true;
		}
    }
}
/*========== Owl Carousel end ================*/

/*========== Scroll To Section Start ================*/
var globalDeviceWidth = jQuery(window).width();
var globalDeviceHeight=jQuery(".header_main").height();;
jQuery(document).on("click", ".scroll-home", function (event) {
	event.preventDefault();		
	if(globalDeviceWidth>=992)
	{		
		globalDeviceHeight=jQuery(".header_main").height();
	}
	jQuery(".navigation").children("nav").children("ul").children("li").children("a").removeClass("active");
	jQuery('html, body').animate({
		scrollTop: jQuery(".main-slider").offset().top - globalDeviceHeight
	}, 2000);
});
jQuery(document).on("click", ".scroll-1", function (event) {
	event.preventDefault();
	if(globalDeviceWidth>=992)
	{		
		globalDeviceHeight=jQuery(".header_main").height();
	}
	jQuery(".navigation").children("nav").children("ul").children("li").children("a").removeClass("active");
	jQuery('html, body').animate({
		scrollTop: jQuery("#portfolio_main").offset().top - globalDeviceHeight
	}, 2000);
	jQuery(this).addClass("active");
});
jQuery(document).on("click", ".scroll-2", function (event) {
	event.preventDefault();
	if(globalDeviceWidth>=992)
	{		
		globalDeviceHeight=jQuery(".header_main").height();
	}
	jQuery(".navigation").children("nav").children("ul").children("li").children("a").removeClass("active");
	jQuery('html, body').animate({
		scrollTop: jQuery("#my_story_block").offset().top - globalDeviceHeight
	}, 2000);
	jQuery(this).addClass("active");
});
jQuery(document).on("click", ".scroll-3", function (event) {
	event.preventDefault();
	if(globalDeviceWidth>=992)
	{		
		globalDeviceHeight=jQuery(".header_main").height();
	}
	jQuery(".navigation").children("nav").children("ul").children("li").children("a").removeClass("active");
	jQuery('html, body').animate({
		scrollTop: jQuery("#contact_block").offset().top - globalDeviceHeight
	}, 2000);
	jQuery(this).addClass("active");
});
jQuery(document).on("click", ".scroll-4", function (event) {
	event.preventDefault();
	if(globalDeviceWidth>=992)
	{		
		globalDeviceHeight=jQuery(".header_main").height();
	}
	jQuery(".navigation").children("nav").children("ul").children("li").children("a").removeClass("active");
	jQuery('html, body').animate({
		scrollTop: jQuery("#download_block").offset().top - globalDeviceHeight
	}, 2000);
	jQuery(this).addClass("active");
});
/*========== Scroll To Section end ================*/

/*========== Portfolio Lightbox start ================*/
jQuery('#portfolio').magnificPopup({
	delegate: 'a',
	type: 'image',
	mainClass: 'mfp-with-zoom mfp-img-mobile',
	closeOnContentClick: false,
    closeBtnInside: false,
	image: {
	  cursor: null,
	  titleSrc: 'title',
	},
	zoom: {
		enabled: true,
		duration: 300, // don't foget to change the duration also in CSS
		opener: function(element) {
		  return element.find('img');
		}
  	},
	gallery: {
	  enabled: true,
	  preload: [0,1], // Will preload 0 - before current, and 1 after the current image
	  navigateByImgClick: true
	}
});
/*========== Portfolio Lightbox end ================*/

/*========== Form JS start ================*/
var theForm = document.getElementById( 'theForm' );

new stepsForm( theForm, {
	onSubmit : function( form ) {
			
		var person_name = document.getElementById("q1").value;	
		var user_email = document.getElementById("q2").value;		
		var user_contact = document.getElementById("q3").value;		
		var user_message = document.getElementById("q4").value;		
		
		var post_data = {
			'userName': person_name,
			'userEmail': user_email,
			'userContact':user_contact,
			'userMessage': user_message
		}
		//Ajax post data to server
		jQuery.post('contact_me.php', post_data, function(response) {
			//load json data from server and output message
			if (response.type == 'error') {
				// hide form
				classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );
				// let's just simulate something...
				var messageEl = theForm.querySelector( '.final-message' );
				messageEl.innerHTML = response.text;
				classie.addClass( messageEl, 'show' );
			} else {
				// hide form
				classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );
				// let's just simulate something...
				var messageEl = theForm.querySelector( '.final-message' );
				messageEl.innerHTML = response.text;
				classie.addClass( messageEl, 'show' );
			}			
		}, 'json');		
		
	}
});
/*========== Form JS end ================*/

/*========== Placeholder (IE)JS start ================*/
jQuery('input, textarea').placeholder();
/*========== Placeholder (IE)JS end ================*/

function checkSliderForHeaderStyle(a, c) {
	var b = "";
	if (a.hasClass("light")) {
		b = "light"
	}
	if (a.hasClass("dark")) {
		b = "dark"
	}
	if (b !== "") {
		if (c) {
			$j("header.page_header").removeClass("dark light").addClass(b);
			$j("aside.vertical_menu_area").removeClass("dark light").addClass(b)
		}
		$j(".carousel .carousel-control, .carousel .carousel-indicators").removeClass("dark light").addClass(b)
	} else {
		if (c) {
			if (default_header_style !== "") {
				$j("header.page_header").removeClass("dark light").addClass(default_header_style);
				$j("aside.vertical_menu_area").removeClass("dark light").addClass(default_header_style)
			}
		}
		$j(".carousel .carousel-control, .carousel .carousel-indicators").removeClass("dark light").addClass(default_header_style)
	}
}
function initSideMenu() {
	$j("window").on("click",".side_menu_button_wrapper a.side_menu_button_link,  a.close_side_menu",function (a) {
		a.preventDefault();
		$j(".side_menu").css({
			right: "0"
		});
		if (!$j(".side_menu_button_wrapper a.side_menu_button_link").hasClass("opened")) {
			$j(".side_menu").css({
				visibility: "visible"
			});
			$j(this).addClass("opened");
			$j("body").addClass("right_side_menu_opened");
			current_scroll = $j(window).scrollTop();
			$j(window).scroll(function () {
				if (Math.abs($scroll - current_scroll) > 400) {
					$j("body").removeClass("right_side_menu_opened");
					$j(".side_menu_button_wrapper a").removeClass("opened");
					var c = setTimeout(function () {
						$j(".side_menu").css({
							visibility: "hidden"
						});
						clearTimeout(c)
					}, 400)
				}
			})
		} else {
			$j(".side_menu_button_wrapper a.side_menu_button_link").removeClass("opened");
			$j("body").removeClass("right_side_menu_opened");
			var b = setTimeout(function () {
				$j(".side_menu").css({
					visibility: "hidden"
				});
				clearTimeout(b)
			}, 400)
		}
	});
}
function setDropDownMenuPosition() {
	var a = $j(".drop_down > ul > li.narrow");
	a.each(function (d) {
		var g = $j(window).width() - 16;
		var b = 1150;
		var f = $j(a[d]).offset().left;
		var c = $j(a[d]).find(".second .inner ul").width();
		var h = 0;
		if ($j("body").hasClass("boxed")) {
			h = b - (f - (g - b) / 2) + 24
		} else {
			h = g - f + 24
		}
		var e;
		if ($j(a[d]).find("li.sub").length > 0) {
			e = h - c
		}
		if (h < c || e < c) {
			$j(a[d]).find(".second").addClass("right");
			$j(a[d]).find(".second .inner ul").addClass("right")
		}
	})
}
function initDropDownMenu() {
	var a = $j(".drop_down > ul > li");
	a.each(function (e) {
		if ($j(a[e]).find(".second").length > 0) {
			if ($j(a[e]).hasClass("wide")) {
				var h = $j(this).find(".inner > ul");
				var b = parseInt(h.css("padding-left").slice(0, -2)) + parseInt(h.css("padding-right").slice(0, -2));
				if (!$j(this).hasClass("left_position") && !$j(this).hasClass("right_position")) {
					$j(this).find(".second").css("left", 0)
				}
				var g = 0;
				$j(this).find(".second > .inner > ul > li").each(function () {
					var i = $j(this).height();
					if (i > g) {
						g = i
					}
				});
				$j(this).find(".second > .inner > ul > li").height(g);
				var c;
				if ($j(this).find(".second > .inner > ul > li").length > 4) {
					c = 4
				} else {
					c = $j(this).find(".second > .inner > ul > li").length
				}
				var j = c * $j(this).find(".second > .inner > ul > li").outerWidth();
				$j(this).find(".second > .inner > ul").width(j);
				if (!$j(this).hasClass("left_position") && !$j(this).hasClass("right_position")) {
					var f = ($j(window).width() - 2 * ($j(window).width() - $j(this).find(".second").offset().left)) / 2 + (j + b) / 2;
					$j(this).find(".second").css("left", -f)
				}
			}
			if (!menu_dropdown_height_set) {
				$j(a[e]).data("original_height", $j(a[e]).find(".second").height() + "px");
				$j(a[e]).find(".second").height(0)
			}
			if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
				$j(a[e]).on("touchstart mouseenter", function () {
					$j(a[e]).find(".second").css({
						height: $j(a[e]).data("original_height"),
						overflow: "visible",
						visibility: "visible",
						opacity: "1"
					})
				}).on("mouseleave", function () {
					$j(a[e]).find(".second").css({
						height: "0px",
						overflow: "hidden",
						visivility: "hidden",
						opacity: "0"
					})
				})
			} else {
				var d = {
					interval: 0,
					over: function () {
						setTimeout(function () {
							$j(a[e]).find(".second").addClass("drop_down_start");
							$j(a[e]).find(".second").stop().css({
								height: $j(a[e]).data("original_height")
							})
						}, 150)
					},
					timeout: 150,
					out: function () {
						$j(a[e]).find(".second").stop().css({
							height: "0px"
						});
						$j(a[e]).find(".second").removeClass("drop_down_start")
					}
				};
				$j(a[e]).hoverIntent(d)
			}
		}
	});
	$j(".drop_down ul li.wide ul li a").on("click", function () {
		var b = $j(this);
		setTimeout(function () {
			b.mouseleave()
		}, 500)
	});
	menu_dropdown_height_set = true
}
function initVerticalMenuToggle() {
	if ($j(".no-touch .vertical_menu").hasClass("vm_click_event")) {
		var a = $j(".no-touch .vertical_menu_toggle > ul > li > a");
		var b = $j(".no-touch .vertical_menu_toggle ul li ul li a");
		a.each(function (d) {
			if ($j(a[d]).parent().hasClass("has_sub")) {
				var c = $j(a[d]).find(".inner > ul > li").length;
				$j(a[d]).on("click", function (f) {
					f.preventDefault();
					if (!$j(this).parent().hasClass("open") && !$j(this).parent().hasClass("current-menu-ancestor")) {
						$j(".no-touch .vertical_menu_toggle > ul > li").removeClass("open current-menu-ancestor");
						$j(".no-touch .vertical_menu_toggle > ul > li").find(".second").slideUp("fast");
						$j(this).parent().addClass("open");
						$j(this).parent().find(".second").slideDown("slow", function () {
							$j(".vertical_menu_area.with_scroll").getNiceScroll().resize()
						})
					} else {
						$j(this).parent().removeClass("open");
						$j(this).parent().find(".second").slideUp("fast", function () {
							$j(this).parent().removeClass("current-menu-ancestor");
							$j(".vertical_menu_area.with_scroll").getNiceScroll().resize()
						})
					}
					return false
				})
			}
		});
		b.each(function (c) {
			if ($j(b[c]).parent().hasClass("menu-item-has-children")) {
				var d = $j(b[c]).find("ul > li").length;
				$j(b[c]).on("click", function (f) {
					f.preventDefault();
					if (!$j(this).parent().hasClass("open") && !$j(this).parent().hasClass("current_page_parent")) {
						$j(".no-touch .vertical_menu_toggle ul li ul li").removeClass("open current_page_parent");
						$j(".no-touch .vertical_menu_toggle ul li ul li").find("ul").slideUp("fast");
						$j(this).parent().addClass("open");
						$j(this).parent().find("ul").slideDown("slow", function () {
							$j(".vertical_menu_area.with_scroll").getNiceScroll().resize()
						})
					} else {
						$j(this).parent().removeClass("open");
						$j(this).parent().find("ul").slideUp("fast", function () {
							$j(this).parent().removeClass("current_page_parent");
							$j(".vertical_menu_area.with_scroll").getNiceScroll().resize()
						})
					}
					return false
				})
			}
		})
	} else {
		var a = $j(".no-touch .vertical_menu_toggle > ul > li");
		var b = $j(".no-touch .vertical_menu_toggle ul li ul li");
		a.each(function (d) {
			if ($j(a[d]).hasClass("has_sub")) {
				var c = $j(a[d]).find(".inner > ul > li").length;
				$j(a[d]).hoverIntent({
					over: function () {
						$j(a[d]).addClass("open");
						$j(a[d]).find(".second").slideDown(c * 40, "easeInOutSine", function () {
							$j(".vertical_menu_area.with_scroll").getNiceScroll().resize()
						})
					},
					out: function () {
						$j(a[d]).removeClass("open");
						$j(a[d]).find(".second").slideUp(c * 40, "easeInOutSine")
					},
					timeout: 1000
				})
			}
		});
		b.each(function (c) {
			if ($j(b[c]).hasClass("menu-item-has-children")) {
				var d = $j(b[c]).find("ul > li").length;
				$j(b[c]).hoverIntent({
					over: function () {
						$j(b[c]).addClass("open");
						$j(b[c]).find("ul").slideDown(d * 40, "easeInOutSine", function () {
							$j(".vertical_menu_area.with_scroll").getNiceScroll().resize()
						})
					},
					out: function () {
						$j(b[c]).removeClass("open");
						$j(b[c]).find("ul").slideUp(d * 40, "easeInOutSine")
					},
					timeout: 1000
				})
			}
		})
	}
}
function initVerticalMobileMenu() {
	$j(".touch .vertical_menu_toggle > ul > li.has_sub > a").on("tap click", function (a) {
		a.stopPropagation();
		a.preventDefault();
		if ($j(this).next("div.second").is(":visible")) {
			$j(this).parents(".touch .vertical_menu_toggle > ul > li.has_sub").removeClass("open");
			$j(this).next("div.second").slideUp(200)
		} else {
			$j(this).parents(".touch .vertical_menu_toggle > ul > li.has_sub").addClass("open");
			$j(this).next("div.second").slideDown(200)
		}
	});
	$j(".touch .vertical_menu_toggle ul li ul li.sub > a").on("tap click", function (a) {
		a.stopPropagation();
		a.preventDefault();
		if ($j(this).next("ul").is(":visible")) {
			$j(this).parents(".touch .vertical_menu_toggle ul li ul li").removeClass("open");
			$j(this).next("ul").slideUp(200)
		} else {
			$j(this).parents(".touch .vertical_menu_toggle ul li ul li").addClass("open");
			$j(this).next("ul").slideDown(200)
		}
	})
}
function initListAnimation() {
	if ($j(".animate_list").length > 0 && $j(".no_animation_on_touch").length === 0) {
		$j(".animate_list").each(function () {
			$j(this).appear(function () {
				$j(this).find("li").each(function (a) {
					var b = $j(this);
					setTimeout(function () {
						b.animate({
							opacity: 1,
							top: 0
						}, 1500)
					}, 100 * a)
				})
			}, {
				accX: 0,
				accY: -150
			})
		})
	}
}
function initTitleAreaAnimation() {
	if ($j(".title_outer.animate_title_area").length) {
		var a = $j(".title_outer").data("height");
		if ($j(".title_outer").hasClass("with_image")) {
			a = $j(".image.responsive").height()
		}
		if ($scroll < $j(".title").height()) {
			$j(".title_outer").animate({
				height: a,
				opacity: 1
			}, 500, function () {
				$j(this).css({
					overflow: "visible"
				});
				initPortfolioSingleInfo();
				if ($j("nav.content_menu").length > 0) {
					content_menu_position = $j("nav.content_menu").offset().top;
				}
			})
		}
	}
}
function initCheckSafariBrowser() {
	if (navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("Chrome") === -1) {
		$j("body").addClass("safari_browser")
	}
}
function initCheckFirefoxMacBrowser() {
	var a = navigator.userAgent.toLowerCase();
	var b = navigator.appVersion.toLowerCase();
	if (a.indexOf("firefox") > -1 && b.indexOf("mac") > -1) {
		$j("body").addClass("firefox_mac_browser")
	}
}
var sticky_animate;
var default_header_style;
var current_scroll;
(function (a) {
	a.fn.countTo = function (c) {
		c = a.extend({}, a.fn.countTo.defaults, c || {});
		var b = Math.ceil(c.speed / c.refreshInterval),
			d = (c.to - c.from) / b;
		return a(this).each(function () {
			function g() {
				h += d;
				e++;
				a(f).html(h.toFixed(c.decimals));
				if (typeof c.onUpdate === "function") {
					c.onUpdate.call(f, h)
				}
				if (e >= b) {
					clearInterval(j);
					h = c.to;
					if (typeof c.onComplete === "function") {
						c.onComplete.call(f, h)
					}
				}
			}
			var f = this,
				e = 0,
				h = c.from,
				j = setInterval(g, c.refreshInterval)
		})
	};
	a.fn.countTo.defaults = {
		from: 0,
		to: 100,
		speed: 1000,
		refreshInterval: 100,
		decimals: 0,
		onUpdate: null,
		onComplete: null
	}
})(jQuery);
var $scrollHeight;
$j.fn.preload = function () {
	this.each(function () {
		$j("<img/>")[0].src = this
	})
};
var timeOuts = [];
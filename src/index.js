import "./scss/style.scss";
// import mavThumb from './images/mav-thumb-img-2.jpg';
import jQuery from "./js/lib/jquery";
import waypoint from "./js/lib/jquery.waypoints";
import bootstrap from "./js/lib/bootstrap";
// import main from "./js/main";

(function ($) {
  $.fn.wobble = function () {
    $(this).addClass("animated wobble");
    console.log(this);
  };
  $.fn.extend({
    animate: function (animationName) {
      var animationEnd =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      $(this)
        .addClass("animated " + animationName)
        .one(animationEnd, function () {
          $(this).removeClass("animated " + animationName);
        });
    },
  });

  // Initialize Scroll Spy
  // $("body").scrollspy({ target: "#scrollSpy" });

  // $(".nav-wrap ul li a[href^='#']").on("click", function (e) {
  // 	// prevent default anchor click behavior
  // 	e.preventDefault();

  // 	// store hash
  // 	var hash = this.hash;

  // 	// animate
  // 	document.querySelector(hash).scrollIntoView({
  // 		behavior: "smooth",
  // 	});
  // });

  $(document).ready(function () {
    // Fix ScrollSpy Wrong Menu Item Selected
    // setTimeout(function () {
    // 	scrollTo(function () {}, 0);
    // 	$(window).scrollspy("refresh");
    // }, 0);

    document
      .querySelector(
        window.location.hash.length ? window.location.hash : "#home"
      )
      .scrollIntoView({
        behavior: "smooth",
      });

    var skillSection = $("#skills");

    var wp2 = skillSection.waypoint({
      handler: function (direction) {
        if (direction == "down") {
          $(".desc-wrap", skillSection)
            .addClass("animated slideInLeft")
            .removeClass("opacity-hide");
          $(".icon-wrap", skillSection)
            .addClass("animated slideInRight")
            .removeClass("opacity-hide");
        }
      },
      continuous: true,
      // offset: 'bottom-in-view'
      offset: "40%",
    });

    // var aboutSection = $('#about');

    // var wp1 = aboutSection.waypoint({
    // 	handler: function (direction) {
    // 		if (direction == 'down') {
    // 			$('.desc-wrap', aboutSection)
    // 				.addClass('animated fadeInLeft')
    // 				.removeClass('hide');
    // 			$('.icon-wrap', aboutSection)
    // 				.addClass('animated rollIn')
    // 				.removeClass('hide');
    // 		}
    // 	},
    // 	continuous: true,
    // 	//offset: 'bottom-in-view'
    // 	// offset: function () {
    // 	// 	return -this.element.clientHeight + 200;
    // 	// },
    // 	offset: '-40%',
    // });

    var contactSection = $("#contact");

    contactSection.waypoint({
      handler: function (direction) {
        if (direction == "down") {
          $(".desc-wrap", contactSection)
            .addClass("animated fadeInLeft")
            .removeClass("hide");
          $(".icon-wrap", contactSection)
            .addClass("animated fadeInRight")
            .removeClass("hide");
        }
      },
      continuous: false,
      offset: "-40%",
    });

    $.fn.mavSlide = function (opt) {
      if (!opt) {
        opt = {};
      }
      var configOptions = {
        interval: opt.interval || 5000,
        slideInEffect: opt.slideInEffect || "slideInLeft",
        slideOutEffect: opt.slideOutEffect || "slideOutRight",
      };

      var elClone = $(this).html();
      var slides_len = $(".slide", $(this)).length - 1;
      var _this = $(this);
      setTimeout(function () {
        var t = setInterval(function slideIt() {
          if (slides_len == 0) {
            $(".slide", _this)
              .eq(slides_len)
              .addClass("out animated " + configOptions.slideOutEffect);
            $(".slide", _this)
              .eq($(".slide", _this).length - 1)
              .show()
              .removeClass("hidden")
              .addClass("in animated " + configOptions.slideInEffect);

            /*** Fixes slider animation on tab change ***/
            setTimeout(function () {
              $(_this).html(elClone);
              slides_len = $(".slide", _this).length - 1;
              slideIt();
            }, configOptions.interval);
          } else {
            $(".slide", _this)
              .eq(slides_len)
              .addClass("out animated " + configOptions.slideOutEffect);
            $(".slide", _this)
              .eq(slides_len - 1)
              .show()
              .removeClass("hidden")
              .addClass("in animated " + configOptions.slideInEffect);
          }

          $(".slide.out", _this).one(
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            function (e) {
              $(this).hide().addClass("hidden");
              $(this).removeClass(
                "out animated " + configOptions.slideOutEffect
              );
            }
          );
          $(".slide.in", _this).one(
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            function (e) {
              $(this).removeClass("in animated " + configOptions.slideInEffect);
            }
          );

          if (slides_len >= 1) {
            slides_len--;
          } else {
            slides_len = $(".slide", _this).length - 1;
          }
        }, configOptions.interval);
      });
    };

    /**** Initialize Slider ****/
    $(".slider").mavSlide({
      interval: 4000,
      slideInEffect: "rubberBand",
      slideOutEffect: "fadeOutUp",
    });
    $(".skill-slider").mavSlide({
      interval: 2500,
      slideInEffect: "zoomIn",
      slideOutEffect: "zoomOut",
    });
  });
})(window.jQuery);

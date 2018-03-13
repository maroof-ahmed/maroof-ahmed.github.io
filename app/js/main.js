(function($) {
    $.fn.wobble = function() {
        $(this).addClass('animated wobble');
        console.log(this);
    }
    $.fn.extend({
        animate: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    $(document).ready(function() {

        var aboutSection = $('#about');
        var wp1 = aboutSection.waypoint({
            handler: function(direction) {
                if (direction == 'down') {
                    $('.desc-wrap', aboutSection).addClass('animated fadeInLeft');
                    $('.icon-wrap', aboutSection).addClass('animated fadeInRight');
                }
            },
            offset: 'bottom-in-view'
        });

        var skillSection = $('#skills');
        var wp2 = skillSection.waypoint({
            handler: function(direction) {
                if (direction == 'down') {
                    $('.desc-wrap', skillSection).addClass('animated lightSpeedIn');
                    $('.icon-wrap', skillSection).addClass('animated lightSpeedIn');
                }
            },
            offset: 'bottom-in-view'
        });

        /*
    var wp2 = aboutSection.waypoint({
		handler: function(direction){
            if(direction == 'down') {
                console.log(direction);
            }
        },
        context: $('.icon-wrap')
    });
    */
        /*
        (function Slider() {
            var slides_len = $('.slide').length - 1;
            setTimeout(function() {
                var t = setInterval(function() {

                if(slides_len == 0) {
                    $('.slide').eq(slides_len).addClass('animated slideOutRight out');
                    $('.slide').eq($('.slide').length - 1).show().removeClass('hidden').addClass('animated slideInLeft in');
                } else {
                    $('.slide').eq(slides_len).addClass('animated slideOutRight out');
                    $('.slide').eq(slides_len - 1).show().removeClass('hidden').addClass('animated slideInLeft in');
                }

                $('.slide.out').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
                    $(this).hide().addClass('hidden');
                    $(this).removeClass('animated slideOutRight out');
                });
                $('.slide.in').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
                    $(this).removeClass('animated slideInLeft in');
                });

                if(slides_len >= 1) {
                    slides_len--;
                } else {
                    slides_len = $('.slide').length - 1;
                    //console.log(slides_len)
                }
            }, 4000);

            });
        })();
        */

        $.fn.mavSlide = function(opt) {
            if (!opt) { opt = {}; }
            var configOptions = {
                interval: opt.interval || 5000,
                slideInEffect: opt.slideInEffect || 'slideInLeft',
                slideOutEffect: opt.slideOutEffect || 'slideOutRight',
            }

            var elClone = $(this).html();
            var slides_len = $('.slide', $(this)).length - 1;
            var _this = $(this);
            setTimeout(function() {
                var t = setInterval(function slideIt() {

                    if (slides_len == 0) {
                        $('.slide', _this).eq(slides_len).addClass('out animated ' + configOptions.slideOutEffect);
                        $('.slide', _this).eq($('.slide', _this).length - 1).show().removeClass('hidden').addClass('in animated ' + configOptions.slideInEffect);

                        /*** Fixes slider animation on tab change ***/
                        setTimeout(function() {
                            $(_this).html(elClone);
                            slides_len = $('.slide', _this).length - 1;
                            slideIt();
                        }, configOptions.interval);

                    } else {
                        $('.slide', _this).eq(slides_len).addClass('out animated ' + configOptions.slideOutEffect);
                        $('.slide', _this).eq(slides_len - 1).show().removeClass('hidden').addClass('in animated ' + configOptions.slideInEffect);
                    }

                    $('.slide.out', _this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
                        $(this).hide().addClass('hidden');
                        $(this).removeClass('out animated ' + configOptions.slideOutEffect);
                    });
                    $('.slide.in', _this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
                        $(this).removeClass('in animated ' + configOptions.slideInEffect);
                    });

                    if (slides_len >= 1) {
                        slides_len--;
                    } else {
                        slides_len = $('.slide', _this).length - 1;
                    }
                }, configOptions.interval);

            });
        }

        /**** Initialize Slider ****/
        $('.slider').mavSlide({
            interval: 4000,
            slideInEffect: 'rubberBand',
            slideOutEffect: 'fadeOutUp'
        });
        $('.skill-slider').mavSlide({
            interval: 2500,
            slideInEffect: 'zoomIn',
            slideOutEffect: 'zoomOut'
        });

        
        $('header.content-wrap').clown();

    });

})(window.jQuery);
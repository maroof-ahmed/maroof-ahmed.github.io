/**
 * $('.el').clown();
 * $('.el').clown({
 * live: false
 * });
 */

// Change Background w.r.t Time
$.fn.clown = function(opts, t, force_bg) {

    // Set Default Options
    var opts = opts || {};
    var defaultOpts = {
        live: opts.live || false,
        clownClass: opts.clownClass || $(this).attr('data-clownClass'),
        date: opts.date || testDate(),
        time: opts.time || testTime()
    }
    this.options = defaultOpts;

    // Set Date to test the change
    function testDate() {
        var today = new Date();
        var year = today.getYear();
        var month = today.getMonth();
        var day = today.getDate();
        var hour = today.getHours();
        var minute = today.getMinutes();
        var second = today.getSeconds();
        if (hour == 24 && minute == 59 && second >= 55) {
            day += 1;
        }
        return {
            year: year,
            month: month,
            day: day
        }
    }

    // Set Time to test the change
    function testTime() {
        var today = new Date();
        var hour = today.getHours();
        var minute = today.getMinutes();
        var second = today.getSeconds();
        if (minute == 59 && second >= 55) {
            minute = 0;
            second = 0;
        }
        return {
            hours: hour,
            minutes: minute,
            seconds: second + 5
        }
    }

    $(window).on('load', function() {
        this.currentDate = new Date();
        console.log(this);
    });




    /*
        var allbgcss = ['transition-bg', 'mountains-bg', 'skyline-bg', 'sky-bg', 'seasky-bg', '.night-bg'];
        var thishour = agilo.dt.thishour;
        var is_change_needed = false;

        //var first_part = thishour >=0 && thishour < 8;
        //var second_part = thishour >=8 && thishour < 16;
        //var third_part = thishour >=16 && thishour < 24;

        var first_part = thishour >= 8 && thishour < 12;
        var second_part = thishour >= 12 && thishour < 16;
        var third_part = thishour >= 16 && thishour <= 20;
        var fourth_part = thishour >= 20 && thishour <= 24;

        if (first_part) {
            bgcss = ['mountains-bg'];
        } else if (second_part) {
            bgcss = ['skyline-bg'];
        } else if (third_part) {
            bgcss = ['seasky-bg'];
        } else if (fourth_part) {
            bgcss = ['sky-bg'];
        } else {
            bgcss = ['night-bg'];
            //bgcss = allbgcss;
        }

        if (force_bg >= 0 && force_bg < allbgcss.length) {
            bgcss = [allbgcss[force_bg]];
        }

        var curr_bg_classes = $('body').attr('class').split(' ');

        for (var i = 0; i < allbgcss.length; i++) {
            //console.log($(bgcss).eq(i));
            var bgclass = $(allbgcss).eq(i)[0];

            for (var j = 0; j < curr_bg_classes.length; j++) {
                var currclass = $(curr_bg_classes).eq(j)[0];
                if (bgclass == currclass) {
                    var matchedclass = currclass;
                    if (matchedclass != bgcss[0]) {
                        is_change_needed = true;
                        break;
                    }
                    //console.log(matchedclass);
                }
            }
        }
        //var index_matchedclass = bgcss.indexOf(matchedclass);   
        //bgcss.splice(index_matchedclass, 1);

        if (is_change_needed) {
            if (t != true) {
                $('body').fadeOut(200).addClass(bgcss[0]).fadeIn(200).removeClass(matchedclass);
            } else {
                //$('body').addClass(bgcss[0], 1).removeClass(matchedclass, 1);
                //$('body').addClass(bgcss[0], 1).removeClass(matchedclass);
                /*
                $('.transition-bg').css({
                    'background-image': "url('./Images/sea-sky.jpg')",
                    'background-repeat' : 'no-repeat',
                    'width' : '100%',
                    'height' : '100%',
                    'background-attachment' : 'fixed',
                    'background-size' : 'cover'
                    });
                */

    /*
            setTimeout(function() {
                $('body').addClass(bgcss[0], 1).removeClass(matchedclass);
            }, 4000);
        }
        //console.log(bgcss[0]);
        return bgcss[0];
    }

*/

    /*
        // Update Date
        this.update_date = function() {
            agilo.dt = new Date();
            agilo.dt.thishour = agilo.dt.getHours();
            agilo.dt.thisminute = agilo.dt.getMinutes();
        };


        this.live = function() {
            $(window).on('load', function() {
                setInterval(this.update_date, 3000); // 3 seconds
                setInterval(this.clown, 3000); // 3 seconds
            });
        }
    */
}
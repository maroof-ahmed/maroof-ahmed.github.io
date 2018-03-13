var gulp = require('gulp');
//var postcss = require('gulp-postcss');
//var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
// Prevent pipe breaking caused by errors from gulp plugins (like Compass)
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

//var mqpacker = require('css-mqpacker');
//var csswring = require('csswring');

/*
gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']}),
        mqpacker,
        csswring
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});
*/

gulp.task('sass', function () {
  var input = './sass/*.scss';
  var output = './styles';
    
  var sassOptions = {
     errLogToConsole: true,
     outputStyle: 'compact'
  };
    
  var autoprefixerOptions = {
     browsers: ['last 3 versions', '> 5%', 'Firefox ESR']
  };

  return gulp
    // Find all `.scss` files from the `stylesheets/` folder
    .src(input)
    // Using gulp Plumber, prevent pipe breaking caused by errors from gulp plugins
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err, '-- Error --');
            //If you use gulp-plumber in combination with gulp.watch, make sure you call this.emit('end') in gulp-plumber's handleError callback
            this.emit('end');
        }
    }))
    // Init SourceMaps for Sass Files
    .pipe(sourcemaps.init())
  
    // Run Sass on those files
    //.pipe(sass())
  
    // Using gulp-compass
    .pipe(compass({
      config_file: './config.rb',
      css: './styles',
      sass: './sass'
    }))
    // Using gulp-sass, Run Sass on those files and enable errors
    //.pipe(sass(sassOptions).on('error', sass.logError))
  
    // Write the sourcemaps inside the css file. Add a string path to write to another path
    .pipe(sourcemaps.write())
  
    // Using gulp Autoprefixer
    .pipe(autoprefixer(autoprefixerOptions))
  
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(output))
    // Auto Inject in Browsers
    .pipe(browserSync.stream());
});

/*
gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');
   
    var input = './sass';
    var output = './styles';
    
    return gulp.src(input)
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(output));
});
*/

gulp.task('watch', function() {
    
  var inputCss = './sass/*.scss';
  var inputHtml = '/Subscription/Login/Login/*.cshtml';
    
    browserSync.init({
        port: "2673",
        //host: "localhost",
        //proxy: "http://localhost"
        //socket: {
          //  domain: 'localhost:3000'
        //}
    });
    
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
      .watch(inputCss, ['sass'], browserSync.reload)
    // When there is a change, log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

//gulp.task('browser-sync', function() {  
//});

gulp.task('default', function() {
    gulp.start('sass');
    gulp.start('watch');
});

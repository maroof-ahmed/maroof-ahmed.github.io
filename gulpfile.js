var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');

// Basic Gulp task syntax
/* gulp.task('taskname', function() {
  
}) */

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        // Using gulp Plumber, prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err, '-- Error --');
                //If you use gulp-plumber in combination with gulp.watch, make sure you call this.emit('end') in gulp-plumber's handleError callback
                this.emit('end');
            }
        }))
        // Init SourceMaps for Sass Files
        .pipe(sourcemaps.init())
        .pipe(sass()) // Passes it through a gulp-sass
        // Using gulp Autoprefixer
        .pipe(autoprefixer({
            browsers: ['last 3 versions', '> 5%', 'Firefox ESR']
        }))
        // Write the sourcemaps inside the css file. Add a string path to write to another path
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css')) // Outputs it in the css folder
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

// Watchers
gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('docs'));
});

// Optimizing Images
gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            //progressive: true,
            interlaced: true,
        })))
        .pipe(gulp.dest('docs/images'))
});

// Copying fonts
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('docs/fonts'))
});

// Cleaning
gulp.task('clean', function() {
    return del.sync('docs').then(function(cb) {
        return cache.clearAll(cb);
    });
});

gulp.task('clean:dist', function() {
    return del.sync(['docs/**/*', '!docs/images', '!docs/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});

gulp.task('build', function(callback) {
    runSequence(
        'clean:dist', ['sass', 'useref', 'images', 'fonts'],
        callback
    )
});
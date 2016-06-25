var gulp = require('gulp'),
    babel = require("gulp-babel"),
    minify = require('gulp-minify'),
    rename = require("gulp-rename"),
    watch = require('gulp-watch');


gulp.task("js", function () {
    gulp.src("resources/javascript/app.js")
        .pipe(babel())
        .pipe(gulp.dest("app/js"));
});

gulp.task("js-libs", function () {
    gulp.src("resources/javascript/lib/**/*").pipe(gulp.dest('app/js/lib'));
});

gulp.task("css", function () {
    gulp.src(['resources/css/**/*']).pipe(gulp.dest('app/css'));
});

gulp.task("img", function () {
    gulp.src(['resources/img/**/*']).pipe(gulp.dest('app/img'));
});

gulp.task("watch", function () {
    gulp.watch('resources/javascript/app.js', function(event) {
        gulp.run('js');
    });
});

gulp.task("init", function () {
    gulp.run('js-libs');
    gulp.run('js');
    gulp.run('css');
    gulp.run('img');
});

gulp.task("prod", function () {
    gulp.src("resources/javascript/app.js")
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(minify({
            noSource: true
        }))
        .pipe(rename('app.js'))
        .pipe(gulp.dest("app/js"));

    gulp.run('css');
    gulp.run('img');
});



var gulp = require("gulp"),
    babel = require("gulp-babel"),
    minify = require("gulp-minify"),
    minifycss = require("gulp-minify-css"),
    rename = require("gulp-rename"),
    watch = require("gulp-watch"),
    fileinclude = require("gulp-file-include");


gulp.task("js", function () {
    gulp.src("resources/javascript/app/build.js")
        .pipe(fileinclude())
        .pipe(babel())
        .pipe(rename("app.js"))
        .pipe(gulp.dest("app/js"));
});

gulp.task("js-libs", function () {
    gulp.src("resources/javascript/lib/**/*")
        .pipe(gulp.dest("app/js/lib"));
});

gulp.task("css", function () {
    gulp.src("resources/css/**/*")
        .pipe(gulp.dest("app/css"));
});

gulp.task("img", function () {
    gulp.src("resources/img/**/*")
        .pipe(gulp.dest("app/img"));
});

gulp.task("watch", function () {
    gulp.watch("resources/javascript/app/**/*", function(event) {
        gulp.run("js");
        gulp.run("css");
    });
});

gulp.task("default", function () {
    gulp.run("js-libs");
    gulp.run("js");
    gulp.run("css");
    gulp.run("img");
});

gulp.task("prod", function () {
    gulp.src("resources/javascript/app/build.js")
        .pipe(fileinclude())
        .pipe(babel())
        .pipe(minify({
            noSource: true
        }))
        .pipe(rename("app.js"))
        .pipe(gulp.dest("app/js"));

    gulp.src("resources/css/**/*")
        .pipe(minifycss({
            noSource: true
        }))
        .pipe(rename("style.css"))
        .pipe(gulp.dest("app/css"));

    gulp.run("js-libs");
    gulp.run("img");
});



var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
//var watch = require('gulp-watch');
var tsProject = ts.createProject('./tsconfig.json');
var binpath = "bin";

gulp.task('sass', function() {
    gulp.src('*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            console.log(f.base);
            return f.base + '/' + binpath;
        }))
});

gulp.task('compile-ts', function() {
    return tsProject.src() // instead of gulp.src(...) 
               .pipe(tsProject())
               .js
               .pipe(gulp.dest(binpath));
});

gulp.task('default', ['compile-ts', 'sass']);
// , function() {
//     gulp.watch('*.scss', ['sass']);
//         return gulp.watch(['./src/app.ts'], ['compile-ts']);
// });
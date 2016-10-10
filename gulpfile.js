var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var tsProject = ts.createProject('./tsconfig.json');

var bindirectory = "bin";
var slash = '\\'; // assume this will need swapped if not on windows 
var rootpath = slash + 'draw';
var rootreplacepath = slash + 'draw' + slash + bindirectory;

gulp.task('sass', function() {
    gulp.src(['**.scss', 'app/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            var startrootindex = f.base.lastIndexOf(rootpath);
            var target = f.base.substr(0, startrootindex) + rootreplacepath + f.base.substr(startrootindex + rootpath.length);
            return target;
        }));
});

gulp.task('compile-ts', function() {
    return tsProject.src() // instead of gulp.src(...) 
               .pipe(tsProject())
               .js
               .pipe(gulp.dest(bindirectory));
});

/**
function(f) {
            var startrootindex = f.base.lastIndexOf(rootpath);
            var target = f.base.substr(0, startrootindex) + rootreplacepath + f.base.substr(startrootindex + rootpath.length);
            return target;
        }
 */

gulp.task('component.views', function(){
    return gulp.src('**/*.html')
        .pipe(gulp.dest(function(f) {
            var startrootindex = f.base.lastIndexOf(rootpath);
            var target = f.base.substr(0, startrootindex) + rootreplacepath + f.base.substr(startrootindex + rootpath.length);
            return target;
        }));
});

gulp.task('default', ['compile-ts', 'sass', 'component.views']);

//var watch = require('gulp-watch');
// the watch implementation is so aweful. cpu goes mad and your computer heats up. so annoying so fuck it
// , function() {
//     gulp.watch('*.scss', ['sass']);
//         return gulp.watch(['./src/app.ts'], ['compile-ts']);
// });
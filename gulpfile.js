var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var scssPath = [
    'node_modules/foundation-sites/scss'
];

gulp.task('scss', function() {
    return gulp.src('scss/app.scss')
        .pipe(plugins.sass({
            includePaths: scssPath,
            outputStyle: 'compressed'
        })
        .on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['scss']);

gulp.task('watch', ['scss'], function() {
    gulp.watch(['scss/**/*.scss'], ['scss']);
});

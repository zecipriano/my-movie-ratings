const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const { src, dest, watch, series } = require('gulp');

function scss() {
    let sassOptions = {
        includePaths: ['node_modules/foundation-sites/scss'],
        outputStyle: 'compressed'
    };

    return src('scss/app.scss')
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('css'));
};

function scssWatch() {
    watch(['scss/**/*.scss'], ['scss']);
};

exports.default = scss;
exports.watch = series(scss, scssWatch);

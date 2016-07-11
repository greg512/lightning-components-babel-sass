var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var AURA_SRC_DIR = 'src/aura';
var AURA_DEV_DIR = 'aura-dev';


gulp.task('copy-source', copySource);

gulp.task('copy-dev', copyDev);

gulp.task('watch-dev', watchDev);


/*
* @Description  Copy all files to the dev directory.  Will not override existing files.
                Files with .css extension are changed to .scss.
*/
function copySource() {
    //copy everything but xml and css files
    gulp.src(AURA_SRC_DIR + '/*/!(*.css|*.xml)')
        .pipe(gulp.dest(AURA_DEV_DIR, {overwrite: false}));
    //copy all css files, change extension to .scss
    return gulp.src(AURA_SRC_DIR + '/*/**.css')
        .pipe(rename(function(path) {
            path.extname = '.scss';
        }))
        .pipe(gulp.dest(AURA_DEV_DIR, {overwrite: false}));
}

/*
* @Description  Copy dev files to src directory.  Transpile js files
*               and compile scss files to css.
*/
function copyDev() {
    //Copy everything but js and scss files to src
    gulp.src(AURA_DEV_DIR + '/*/!(*.js|*.scss)')
        .pipe(gulp.dest(AURA_SRC_DIR));

    //Transpile js, move to src
    gulp.src(AURA_DEV_DIR + '/*/**.js')
        .pipe(babel({
            presets: ['es2015-without-strict']
        }))
        .pipe(gulp.dest(AURA_SRC_DIR));

    //Compile SASS
    return gulp.src(AURA_DEV_DIR + '/*/**.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(AURA_SRC_DIR));
}


function watchDev() {
    var watcher = gulp.watch(AURA_DEV_DIR);
    watcher.on('change', fileChangehandler);
}

/*
* @Description  Takes a file path, determines file extension, and routes the method to the right function.
* @param    {String}    filePath    A path to a file ('aura-dev/lightningCmp/lightningCmpController.js')
*/
function fileChangehandler(filePath) {
    var fileExt = getFileExtension(filePath);
    switch(fileExt) {
        case 'js':
        transpile(filePath);
        break;

        case 'scss':
        compileSASS(filePath);
        break;

        default:
        moveToSrc(filePath);

    }
}

function transpile(filePath) {
    var DEST_PATH = convertDevPathToSrcPath(getPath(filePath));
    return gulp.src(filePath)
        .pipe(babel({
            presets: ['es2015-without-strict']
        }))
        .pipe(gulp.dest(DEST_PATH))
}

function compileSASS(filePath) {
    var DEST_PATH = convertDevPathToSrcPath(getPath(filePath));
    return gulp.src(filePath)
        .pipe(sass().on('error', sass.logError))

        .pipe(gulp.dest(DEST_PATH));
}

function moveToSrc(filePath) {
    var DEST_PATH = convertDevPathToSrcPath(getPath(filePath));
    return gulp.src(filePath)
        .pipe(gulp.dest(DEST_PATH));
}

function convertDevPathToSrcPath(filePath) {
    var DEV_PATH = AURA_DEV_DIR;
    var SRC_PATH = 'src/aura';
    return filePath.replace(DEV_PATH, SRC_PATH);
}

/*
* @Description  Return file path without file name and extension
*/
function getPath(filePath) {
    var splitFilePath = filePath.split('/');
    splitFilePath.pop();
    return splitFilePath.reduce(function(prevVal, curVal, i) {
        var separator = i !== 0 ? '/' : '';
        return prevVal + separator + curVal;
    }, '');
}

/*
* @Description  Return file name
*/
function getFileName(filePath) {
    return filePath.split('/').pop();
}

/*
* @Description  Return file extension
*/
function getFileExtension(filePath) {
    return filePath.split('.').pop();
}

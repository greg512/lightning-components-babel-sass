var gulp = require('gulp');
var babel = require('gulp-babel');

var AURA_SRC_DIR = 'src/aura/*/**.*';
var AURA_DEV_DIR = 'aura-dev';


gulp.task('copy-source', copySource);

gulp.task('watch-dev', watchDev);





function copySource() {
    return gulp.src(AURA_SRC_DIR)
    .pipe(gulp.dest(AURA_DEV_DIR, {overwrite: false}));

}


function watchDev() {
    var watcher = gulp.watch(AURA_DEV_DIR);
    watcher.on('change', watchDevChangeHandler);

    function watchDevChangeHandler(filePath) {
        var fileExt = getFileExtension(filePath);
        switch(fileExt) {
            case 'js':
            transpile(filePath);
            break;

            case 'css':
            console.log('do sass');
            break;

            default:
            moveToSrc(filePath);

        }
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

function getPath(filePath) {
    var splitFilePath = filePath.split('/');
    splitFilePath.pop();
    return splitFilePath.reduce(function(prevVal, curVal, i) {
        var separator = i !== 0 ? '/' : '';
        return prevVal + separator + curVal;
    }, '');
}

function getFileName(filePath) {
    return filePath.split('/').pop();
}

function getFileExtension(filePath) {
    return filePath.split('.').pop();
}

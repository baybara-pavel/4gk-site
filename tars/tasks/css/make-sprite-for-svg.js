var gulp = require('gulp');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var svgspritesheet = require('gulp-svg-spritesheet');

/**
 * Make sprite for svg and less for this sprite
 * Return pipe with less for sprite
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    return gulp.task('css:make-sprite-for-svg', function (cb) {
        if (tarsConfig.useSVG) {
            return gulp.src('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/minified-svg/*.svg')
                .pipe(svgspritesheet({
                    cssPathSvg: '',
                    templateSrc: './markup/' + tarsConfig.fs.staticFolderName + '/less/sprite-generator-templates/less.svg-sprite.mustache',
                    templateDest: './markup/' + tarsConfig.fs.staticFolderName + '/less/sprites-less/svg-sprite.less'
                }))
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while making fallback for svg.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/svg-sprite/sprite.svg'))
                .pipe(
                    notifier('Less for svg-sprite is ready')
                );
        } else {
            gutil.log('!SVG is not used!');
            cb(null);
        }
    });
};
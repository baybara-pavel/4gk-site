var gulp = require('gulp');
var chokidar = require('chokidar');
var tarsConfig = require('../../../tars-config');
var watcherLog = require('../../helpers/watcher-log');

/**
 * Watcher for images of plugins
 * @param  {Object} watchOptions
 */
module.exports = function (watchOptions) {
    return chokidar.watch('markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/plugins/**/*.*', {
        ignored: '',
        persistent: true,
        ignoreInitial: true
    }).on('all', function (event, path) {
        watcherLog(event, path);
        gulp.start('images:move-plugins-img');
    });
};
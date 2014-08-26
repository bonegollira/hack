
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
    "files": "app/index.html, app/js/*.js, app/css/*.css",
    "server": {
      "baseDir": "app",
      "routes": {
        "/bower_components": "bower_components"
      }
    },
    "port": 8080,
    "browser": "safari"
}

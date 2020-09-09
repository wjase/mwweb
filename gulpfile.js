"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const merge = require("merge-stream");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./docs"
    },
    port: 3000
  });
  done();
}

var pubRoot = './docs/vendor';

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del([pubRoot]);
}


// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest(pubRoot+'/bootstrap'));
  // MarkdownIt
    var markdown = gulp.src('./node_modules/markdown-it/dist/**/*')
    .pipe(gulp.dest(pubRoot+'/markdown-it'));
  // Axios
    var axios = gulp.src('./node_modules/axios/dist/**/*')
    .pipe(gulp.dest(pubRoot+'/axios'));
    var handlebars = gulp.src('./node_modules/handlebars/dist/**/*')
    .pipe(gulp.dest(pubRoot+'/handlebars'));
    var yaml = gulp.src('./node_modules/js-yaml/dist/**/*')
    .pipe(gulp.dest(pubRoot+'/js-yaml'));
    var imagesloaded = gulp.src('./node_modules/imagesloaded/imagesloaded.pkgd.min.js')
    .pipe(gulp.dest(pubRoot+'/imagesloaded'));
    
  // Vanilla Router
    var router = gulp.src('./node_modules/vanilla-router/dist/**/*')
    .pipe(gulp.dest(pubRoot+'/vanilla-router'));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest(pubRoot+'/jquery'));
  return merge(bootstrap, jquery, markdown, axios, router, yaml,handlebars,imagesloaded);
}

// Watch files
function watchFiles() {
  gulp.watch("./**/*.css", browserSyncReload);
  gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;

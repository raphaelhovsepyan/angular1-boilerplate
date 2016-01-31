// require plugins and tools
var gulp = require("gulp");
var browserify = require("gulp-browserify");
var sass = require("gulp-sass");
var less = require("gulp-less");
var rimraf = require("gulp-rimraf");
var connect = require("gulp-connect");
var config = require("./config.json");

// prevent buildscript stoping on error
function errHandler(err) {
	console.log(err.toString());
	return this.emit('end');
}

// require all necessary libs in one file
gulp.task('lib', function(){
	gulp.src('src/libs.js')
	.pipe(browserify())
	.on('error', errHandler)
	.pipe(gulp.dest('dist'))
});

// angular application task with browserify
gulp.task('app', function(){
	gulp.src('src/app/app.js')
	.pipe(browserify())
	.on('error', errHandler)
	.pipe(gulp.dest('dist/app'))
	.pipe(connect.reload());
});

// copy views to dist
gulp.task('views', function(){
	gulp.src('src/app/views/**/*.html')
	.on('error', errHandler)
	.pipe(gulp.dest('dist/app/views'))
	.pipe(connect.reload());
});

// build styles
gulp.task('style', function(){
	switch(config['style-preprocessor']) {
		case "sass" : 
			gulp.src('src/assets/styles/sass/app.scss')
			.pipe(sass())
			.on('error', errHandler)
			.pipe(gulp.dest('dist/assets/styles'))
			.pipe(connect.reload());
			break;
		case "less" : 
			gulp.src('src/assets/styles/less/app.less')
			.pipe(less())
			.on('error', errHandler)
			.pipe(gulp.dest('dist/assets/styles'))
			.pipe(connect.reload());
			break;
		default :
			gulp.src('src/assets/styles/sass/app.scss')
			.pipe(sass())
			.on('error', errHandler)
			.pipe(gulp.dest('dist/assets/styles'))
			.pipe(connect.reload());

	}
	
});

// index.html build
gulp.task('index', function(){
	gulp.src('src/app/index.html')
	.on('error', errHandler)
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
});

// task for clear dist
gulp.task('clean', function(){
	gulp.src('dist')
	.pipe(rimraf());
});

// watch file changes
gulp.task('watch', function(){
	gulp.watch('src/**/*.js', ['app']);
	gulp.watch('src/app/index.html', ['index']);
	gulp.watch('src/app/views/**/*.html', ['views']);
	switch(config['style-preprocessor']) {
		case "sass" : 
			gulp.watch(['src/assets/styles/sass/*.scss', 'src/assets/styles/sass/**/*.scss'], ['style']);
			break;
		case "less" : 
			gulp.watch(['src/assets/styles/less/*.less', 'src/assets/styles/less/**/*.less'], ['style']);
			break;
		default :
			gulp.watch(['src/assets/styles/sass/*.scss', 'src/assets/styles/sass/**/*.scss'], ['style']);

	}
});

// http-server
gulp.task('serve', function(){
	connect.server({
		root: 'dist',
		port: config['http-server-port'] || 8080,
		livereload: true
	});
});

// production task, without watch and http-server
gulp.task('production', ['lib', 'app', 'views', 'index', 'style']);

// default task (watch file changes, http-server, live-reload)
gulp.task('default', ['production', 'watch', 'serve']);
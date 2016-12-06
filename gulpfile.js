'use strict';

var fs = require('graceful-fs'),
	runSequence = require('run-sequence'),
	shell = require('gulp-shell'),
	replace = require('gulp-replace'),
	path = require('path'),
	gulp = require('gulp'),
	_ = require('lodash'),
	del = require('del');

// clean the project of cloned apps and tmp folders
gulp.task('clean', function(done) {
	return del([
		'demo-app',
		'starter-app',
		'test'
	], done);
});
gulp.task('clean_assets', function(done) {
	return del(['assets'], done);
});
gulp.task('remove_template_old', function(done) {
	return del([
		'templates/demo-app', 
		'templates/starter-app'
	], done);
});

// Git clone the template repos and put them inside
gulp.task('clone_demo', shell.task([
	'cd templates && git clone https://github.com/projectSHAI/GOAT-stack demo-app'
]));
gulp.task('clone_starter', shell.task([
	'cd templates && git clone https://github.com/projectSHAI/GOAT-stack starter-app',
	'cd templates/starter-app && git checkout helloGOAT'
]));

// Delete the .git folder inside clones and delete existing templates
gulp.task('clean_clones', function(done) {
	return del([
		'templates/demo-app/.git',
		'templates/demo-app/app/assets',
		'templates/starter-app/.git',
		'templates/starter-app/app/assets',
	], done);
});

// Move assets to corresponding folders
gulp.task('move_assets', function(done) {
	return runSequence(
		'clean_assets',
		'move_assets_demo',
		'move_assets_starter',
		done
	);
});
gulp.task('move_assets_demo', function() {
	return gulp.src('templates/demo-app/app/assets/**')
		.pipe(gulp.dest('./assets/demo-app'));
});
gulp.task('move_assets_starter', function() {
	return gulp.src('templates/starter-app/app/assets/**')
		.pipe(gulp.dest('./assets/starter-app'));
});

// Replace specific lines for ejs templating
gulp.task('ejs_replace', function(done) {
	return runSequence(
		'demo_replace_module', 
		'demo_replace_store',
		'demo_replace_routes',
		'demo_replace_default_env',
		'demo_replace_socketio',
		'starter_replace_module', 
		'starter_replace_store',
		'starter_replace_routes',
		'starter_replace_default_env',
		'starter_replace_socketio',
		done
	);
});

// Replace tasks for demo-app
gulp.task('demo_replace_module', function() {
	return gulp.src('templates/demo-app/app/app.module.ts')
		.pipe(replace("// DO NOT REMOVE: template app.module imports", "<%- newComponentImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template declarations", "<%= newComponents.join(',\\n\\t') %>"))
		.pipe(gulp.dest('templates/demo-app/app'));
});
gulp.task('demo_replace_store', function() {
	return gulp.src('templates/demo-app/app/store/index.ts')
		.pipe(replace("// DO NOT REMOVE: template store imports", "<%- newStoreImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template store attributes", "<%= newStoreAttrs.join('\\n\\t') %>"))
		.pipe(replace("// DO NOT REMOVE: template reducers", "<%= newStoreReducers.join(',\\n\\t') %>"))
		.pipe(gulp.dest('templates/demo-app/app/store'));
});
gulp.task('demo_replace_routes', function() {
	return gulp.src('templates/demo-app/server/routes.ts')
		.pipe(replace("// DO NOT REMOVE: template route imports", "<%- routerImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template routes", "<%- expressRouters.join('\\n\\t') %>"))
		.pipe(gulp.dest('templates/demo-app/server'));
});
gulp.task('demo_replace_default_env', function() {
	return gulp.src('templates/demo-app/config/env/default/default.ts')
		.pipe(replace("title: 'GOAT-stack'", "title: '<%= appname %>'"))
		.pipe(replace("description: 'The Greatest of All Time Stack!'", "description: '<%= appdescription %>'"))
		.pipe(replace("keywords: 'redux, node, mongo, express, angular2, ng2, jasmine, karma, protractor'", 
			"keywords: '<%= appkeywords %>'"))
		.pipe(gulp.dest('templates/demo-app/config/env/default'));
});
gulp.task('demo_replace_socketio', function() {
	return gulp.src('templates/demo-app/config/lib/socketio.ts')
		.pipe(replace("// DO NOT REMOVE: template socket imports", "<%- socketImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template sockets", "<%= socketRegisters.join('\\n\\t') %>"))
		.pipe(gulp.dest('templates/demo-app/config/lib'));
});

// Replace tasks for starter-app
gulp.task('starter_replace_module', function() {
	return gulp.src('templates/starter-app/app/app.module.ts')
		.pipe(replace("// DO NOT REMOVE: template app.module imports", "<%- newComponentImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template declarations", "<%= newComponents.join(',\\n\\t') %>"))
		.pipe(gulp.dest('templates/starter-app/app'));
});
gulp.task('starter_replace_store', function() {
	return gulp.src('templates/starter-app/app/store/index.ts')
		.pipe(replace("// DO NOT REMOVE: template store imports", "<%- newStoreImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template store attributes", "<%= newStoreAttrs.join('\\n\\t') %>"))
		.pipe(replace("// DO NOT REMOVE: template reducers", "<%= newStoreReducers.join(',\\n\\t') %>"))
		.pipe(gulp.dest('templates/starter-app/app/store'));
});
gulp.task('starter_replace_routes', function() {
	return gulp.src('templates/starter-app/server/routes.ts')
		.pipe(replace("// DO NOT REMOVE: template route imports", "<%- routerImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template routes", "<%- expressRouters.join('\\n\\t') %>"))
		.pipe(gulp.dest('templates/starter-app/server'));
});
gulp.task('starter_replace_default_env', function() {
	return gulp.src('templates/starter-app/config/env/default/default.ts')
		.pipe(replace("title: 'GOAT-stack'", "title: '<%= appname %>'"))
		.pipe(replace("description: 'The Greatest of All Time Stack!'", "description: '<%= appdescription %>'"))
		.pipe(replace("keywords: 'redux, node, mongo, express, angular2, ng2, jasmine, karma, protractor'", 
			"keywords: '<%= appkeywords %>'"))
		.pipe(gulp.dest('templates/starter-app/config/env/default'));
});
gulp.task('starter_replace_socketio', function() {
	return gulp.src('templates/starter-app/config/lib/socketio.ts')
		.pipe(replace("// DO NOT REMOVE: template socket imports", "<%- socketImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template sockets", "<%= socketRegisters.join('\\n\\t') %>"))
		.pipe(gulp.dest('templates/starter-app/config/lib'));
});

gulp.task('update', function(done) {
	return runSequence(
		'remove_template_old',
		'clone_demo',
		'clone_starter',
		'move_assets',
		'clean_clones',
		'ejs_replace',
		done
	);
});
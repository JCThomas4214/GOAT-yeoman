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
		'generators/app/templates/demo-app/**',
		'generators/app/templates/starter-app/**',
		'test'
	], done);
});

gulp.task('remove_template_old', function(done) {
	return del([
		'generators/app/templates/demo-app/**', 
		'generators/app/templates/starter-app/**',
		'generators/app/templates/dbless-app/**',		
	], done);
});

// Git clone the template repos and put them inside
gulp.task('clone_demo', shell.task([
	'cd generators/app/templates && git clone https://github.com/projectSHAI/GOAT-stack demo-app'
]));
gulp.task('clone_starter', shell.task([
	'cd generators/app/templates && git clone https://github.com/projectSHAI/GOAT-stack starter-app',
	'cd generators/app/templates/starter-app && git checkout helloGOAT'
]));
gulp.task('clone_dbless', shell.task([
	'cd generators/app/templates && git clone https://github.com/projectSHAI/GOAT-stack dbless-app',
	'cd generators/app/templates/dbless-app && git checkout DBlessGOAT'
]));

// Delete the .git folder inside clones and delete existing templates
gulp.task('clean_clones', function(done) {
	return del([
		'generators/app/templates/demo-app/.git',
		'generators/app/templates/starter-app/.git',
		'generators/app/templates/dbless-app/.git',
	], done);
});

// Replace specific lines for ejs templating
gulp.task('ejs_replace', function(done) {
	return runSequence(
		'demo_replace_module', 
		'demo_replace_store',
		'demo_replace_routes',
		'demo_replace_html',
		'demo_replace_appE2e',
		'demo_replace_default_env',
		'demo_replace_socketio',
		'starter_replace_module', 
		'starter_replace_store',
		'starter_replace_routes',
		'starter_replace_html',
		'starter_replace_appE2e',
		'starter_replace_default_env',
		'starter_replace_socketio',
		'dbless_replace_module',
		'dbless_replace_store',
		'dbless_replace_html',
		'dbless_replace_default_env',
		'dbless_replace_appE2e',
		done
	);
});

// Replace tasks for demo-app
gulp.task('demo_replace_module', function() {
	return gulp.src('generators/app/templates/demo-app/client/main.module.ts')
		.pipe(replace("// DO NOT REMOVE: template main.module imports", "<%- newComponentImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template declarations", "<%= newComponents.join(',\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/demo-app/client'));
});
gulp.task('demo_replace_store', function() {
	return gulp.src('generators/app/templates/demo-app/client/store/index.ts')
		.pipe(replace("// DO NOT REMOVE: template store imports", "<%- newStoreImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template store attributes", "<%= newStoreAttrs.join('\\n\\t') %>"))
		.pipe(replace("// DO NOT REMOVE: template reducers", "<%= newStoreReducers.join(',\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/demo-app/client/store'));
});
gulp.task('demo_replace_routes', function() {
	return gulp.src('generators/app/templates/demo-app/server/routes.ts')
		.pipe(replace("// DO NOT REMOVE: template route imports", "<%- routerImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template routes", "<%- expressRouters.join('\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/demo-app/server'));
});
gulp.task('demo_replace_html', function() {
	return gulp.src('generators/app/templates/demo-app/client/index.html')
		.pipe(replace("GOAT-stack", "<%= appname %>"))
		.pipe(replace("The Greatest of All Time Stack!", "<%= appdescription %>"))
		.pipe(replace("redux, node, mongo, express, angular2, ng2, jasmine, karma, protractor", 
			"<%= appkeywords %>"))
		.pipe(replace("<!-- <script></script> -->", "<%- analytics %>"))
		.pipe(gulp.dest('generators/app/templates/demo-app/client'));
});
gulp.task('demo_replace_appE2e', function() {
	return gulp.src('generators/app/templates/demo-app/e2e/app.e2e-spec.js')
		.pipe(replace("GOAT-stack", "<%= appname %>"))
		.pipe(replace("The Greatest of All Time Stack!", "<%= appdescription %>"))
		.pipe(replace("redux, node, mongo, express, angular2, ng2, jasmine, karma, protractor", 
			"<%= appkeywords %>"))
		.pipe(gulp.dest('generators/app/templates/demo-app/e2e'));
});
gulp.task('demo_replace_default_env', function() {
	return gulp.src('generators/app/templates/demo-app/config/env/default.ts')
		.pipe(replace("https_secure: false", "https_secure: <%= protocol %>"))
		.pipe(replace("show_console_detail: true", "show_console_detail: false"))
		.pipe(gulp.dest('generators/app/templates/demo-app/config/env'));
});
gulp.task('demo_replace_socketio', function() {
	return gulp.src('generators/app/templates/demo-app/server/socketio.ts')
		.pipe(replace("// DO NOT REMOVE: template socket imports", "<%- socketImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template sockets", "<%= socketRegisters.join('\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/demo-app/server'));
});

// Replace tasks for starter-app
gulp.task('starter_replace_module', function() {
	return gulp.src('generators/app/templates/starter-app/client/main.module.ts')
		.pipe(replace("// DO NOT REMOVE: template main.module imports", "<%- newComponentImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template declarations", "<%= newComponents.join(',\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/starter-app/client'));
});
gulp.task('starter_replace_store', function() {
	return gulp.src('generators/app/templates/starter-app/client/store/index.ts')
		.pipe(replace("// DO NOT REMOVE: template store imports", "<%- newStoreImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template store attributes", "<%= newStoreAttrs.join('\\n\\t') %>"))
		.pipe(replace("// DO NOT REMOVE: template reducers", "<%= newStoreReducers.join(',\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/starter-app/client/store'));
});
gulp.task('starter_replace_routes', function() {
	return gulp.src('generators/app/templates/starter-app/server/routes.ts')
		.pipe(replace("// DO NOT REMOVE: template route imports", "<%- routerImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template routes", "<%- expressRouters.join('\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/starter-app/server'));
});
gulp.task('starter_replace_html', function() {
	return gulp.src('generators/app/templates/starter-app/client/index.html')
		.pipe(replace("GOAT-stack", "<%= appname %>"))
		.pipe(replace("The Greatest of All Time Stack!", "<%= appdescription %>"))
		.pipe(replace("redux, node, mongo, express, angular2, ng2, jasmine, karma, protractor", 
			"<%= appkeywords %>"))
		.pipe(replace("<!-- <script></script> -->", "<%- analytics %>"))
		.pipe(gulp.dest('generators/app/templates/starter-app/client'));
});
gulp.task('starter_replace_appE2e', function() {
	return gulp.src('generators/app/templates/starter-app/e2e/app.e2e-spec.js')
		.pipe(replace("GOAT-stack", "<%= appname %>"))
		.pipe(replace("The Greatest of All Time Stack!", "<%= appdescription %>"))
		.pipe(replace("redux, node, mongo, express, angular2, ng2, jasmine, karma, protractor", 
			"<%= appkeywords %>"))
		.pipe(gulp.dest('generators/app/templates/starter-app/e2e'));
});
gulp.task('starter_replace_default_env', function() {
	return gulp.src('generators/app/templates/starter-app/config/env/default.ts')
		.pipe(replace("https_secure: false", "https_secure: <%= protocol %>"))
		.pipe(replace("show_console_detail: true", "show_console_detail: false"))
		.pipe(gulp.dest('generators/app/templates/starter-app/config/env'));
});
gulp.task('starter_replace_socketio', function() {
	return gulp.src('generators/app/templates/starter-app/server/socketio.ts')
		.pipe(replace("// DO NOT REMOVE: template socket imports", "<%- socketImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template sockets", "<%= socketRegisters.join('\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/starter-app/server'));
});

// Replace tasks for dbless-app
gulp.task('dbless_replace_module', function() {
	return gulp.src('generators/app/templates/dbless-app/client/main.module.ts')
		.pipe(replace("// DO NOT REMOVE: template main.module imports", "<%- newComponentImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template declarations", "<%= newComponents.join(',\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/dbless-app/client'));
});
gulp.task('dbless_replace_store', function() {
	return gulp.src('generators/app/templates/dbless-app/client/store/index.ts')
		.pipe(replace("// DO NOT REMOVE: template store imports", "<%- newStoreImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template store attributes", "<%= newStoreAttrs.join('\\n\\t') %>"))
		.pipe(replace("// DO NOT REMOVE: template reducers", "<%= newStoreReducers.join(',\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/dbless-app/client/store'));
});
gulp.task('dbless_replace_html', function() {
	return gulp.src('generators/app/templates/dbless-app/client/index.html')
		.pipe(replace("GOAT-stack", "<%= appname %>"))
		.pipe(replace("The Greatest of All Time Stack!", "<%= appdescription %>"))
		.pipe(replace("redux, node, mongo, express, angular2, ng2, jasmine, karma, protractor", 
			"<%= appkeywords %>"))
		.pipe(replace("<!-- <script></script> -->", "<%- analytics %>"))
		.pipe(gulp.dest('generators/app/templates/dbless-app/client'));
});
gulp.task('dbless_replace_default_env', function() {
	return gulp.src('generators/app/templates/dbless-app/config/env/default.ts')
		.pipe(replace("show_console_detail: true", "show_console_detail: false"))
		.pipe(gulp.dest('generators/app/templates/dbless-app/config/env'));
});
gulp.task('dbless_replace_appE2e', function() {
	return gulp.src('generators/app/templates/dbless-app/e2e/app.e2e-spec.js')
		.pipe(replace("GOAT-stack", "<%= appname %>"))
		.pipe(replace("The Greatest of All Time Stack!", "<%= appdescription %>"))
		.pipe(replace("redux, node, mongo, express, angular2, ng2, jasmine, karma, protractor", 
			"<%= appkeywords %>"))
		.pipe(gulp.dest('generators/app/templates/dbless-app/e2e'));
});

gulp.task('update', function(done) {
	return runSequence(
		'remove_template_old',
		'clone_demo',
		'clone_starter',
		'clone_dbless',
		'clean_clones',
		'ejs_replace',
		done
	);
});
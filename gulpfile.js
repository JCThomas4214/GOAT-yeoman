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
		'generators/app/templates/mongo-db/**',		
		'generators/app/templates/cassandra-db/**',		
		'generators/app/templates/postgres-db/**',		
		'generators/app/templates/mysql-db/**',		
		'generators/app/templates/mssql-db/**',		
		'generators/app/templates/maria-db/**',		
		'generators/app/templates/sqlite-db/**',		
	], done);
});

// Git clone the template repos and put them inside
gulp.task('clone_demo', shell.task([
	'cd generators/app/templates && git clone https://github.com/projectSHAI/GOATstack demo-app'
]));
gulp.task('clone_starter', shell.task([
	'cd generators/app/templates && git clone https://github.com/projectSHAI/GOATstack starter-app',
	'cd generators/app/templates/starter-app && git checkout helloGOAT'
]));
gulp.task('clone_dbless', shell.task([
	'cd generators/app/templates && git clone https://github.com/projectSHAI/GOATstack dbless-app',
	'cd generators/app/templates/dbless-app && git checkout dblessGOAT'
]));

gulp.task('format_starter', function(done) {
	// format starter_app to remove server and separate database templates
	return runSequence(
		'move_mongo',
		'move_cassandra',
		'move_postgres',
		'move_mysql',
		'move_mssql',
		'move_sqlite',
		'move_maria',
		done
	);
});

gulp.task('move_mongo', function() {
	return gulp.src('generators/app/templates/starter-app/server/mongo-db/**/**/*.ts')
		.pipe(gulp.dest('generators/app/templates/mongo-db'));
});
gulp.task('move_cassandra', function() {
	return gulp.src('generators/app/templates/starter-app/server/cass-db/**/**/*.ts')
		.pipe(gulp.dest('generators/app/templates/cassandra-db'));
});
gulp.task('move_postgres', function() {
	return gulp.src('generators/app/templates/starter-app/server/sql-db/**/**/*.ts')
		.pipe(replace('config.sql', 'config.postgres'))		
		.pipe(replace('sequelizeConnect', 'postgresConnect'))		
		.pipe(replace('sequelizeDisconnect', 'postgresDisconnect'))
		.pipe(gulp.dest('generators/app/templates/postgres-db'));
});
gulp.task('move_mysql', function() {
	return gulp.src('generators/app/templates/starter-app/server/sql-db/**/**/*.ts')
		.pipe(replace('config.sql', 'config.mysql'))
		.pipe(replace('sequelizeConnect', 'mysqlConnect'))		
		.pipe(replace('sequelizeDisconnect', 'mysqlDisconnect'))
		.pipe(gulp.dest('generators/app/templates/mysql-db'));
});
gulp.task('move_mssql', function() {
	return gulp.src('generators/app/templates/starter-app/server/sql-db/**/**/*.ts')
		.pipe(replace('config.sql', 'config.mssql'))
		.pipe(replace('sequelizeConnect', 'mssqlConnect'))		
		.pipe(replace('sequelizeDisconnect', 'mssqlDisconnect'))
		.pipe(gulp.dest('generators/app/templates/mssql-db'));
});
gulp.task('move_sqlite', function() {
	return gulp.src('generators/app/templates/starter-app/server/sql-db/**/**/*.ts')
		.pipe(replace('config.sql', 'config.sqlite'))
		.pipe(replace('sequelizeConnect', 'sqliteConnect'))		
		.pipe(replace('sequelizeDisconnect', 'sqliteDisconnect'))
		.pipe(gulp.dest('generators/app/templates/sqlite-db'));
});
gulp.task('move_maria', function() {
	return gulp.src('generators/app/templates/starter-app/server/maria-db/**/**/*.ts')
		.pipe(replace('config.sql', 'config.maria'))
		.pipe(replace('sequelizeConnect', 'mariaConnect'))		
		.pipe(replace('sequelizeDisconnect', 'mariaDisconnect'))
		.pipe(gulp.dest('generators/app/templates/maria-db'));
});



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
		'demo_replace_store',
		'demo_replace_routes',
		'demo_replace_html',
		'demo_replace_appE2e',
		'demo_replace_default_env',
		'demo_replace_socketio',
		'starter_replace_store',
		'starter_replace_routes',
		'starter_replace_html',
		'starter_replace_appE2e',
		'starter_replace_default_env',
		'starter_replace_socketio',
		'dbless_replace_store',
		'dbless_replace_html',
		'dbless_replace_appE2e',
		done
	);
});

// Replace tasks for demo-app
gulp.task('demo_replace_store', function() {
	return gulp.src('generators/app/templates/demo-app/client/redux/store/index.ts')
		.pipe(replace("// DO NOT REMOVE: template store imports", "<%- newStoreImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template store attributes", "<%= newStoreAttrs.join('\\n\\t') %>"))
		.pipe(replace("// DO NOT REMOVE: template reducers", "<%= newStoreReducers.join(',\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/demo-app/client/redux/store'));
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
		.pipe(gulp.dest('generators/app/templates/demo-app/config/env'));
});
gulp.task('demo_replace_socketio', function() {
	return gulp.src('generators/app/templates/demo-app/server/socketio.ts')
		.pipe(replace("// DO NOT REMOVE: template socket imports", "<%- socketImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template sockets", "<%= socketRegisters.join('\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/demo-app/server'));
});

// Replace tasks for starter-app
gulp.task('starter_replace_store', function() {
	return gulp.src('generators/app/templates/starter-app/client/redux/store/index.ts')
		.pipe(replace("// DO NOT REMOVE: template store imports", "<%- newStoreImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template store attributes", "<%= newStoreAttrs.join('\\n\\t') %>"))
		.pipe(replace("// DO NOT REMOVE: template reducers", "<%= newStoreReducers.join(',\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/starter-app/client/redux/store'));
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
		.pipe(gulp.dest('generators/app/templates/starter-app/config/env'));
});
gulp.task('starter_replace_socketio', function() {
	return gulp.src('generators/app/templates/starter-app/server/socketio.ts')
		.pipe(replace("// DO NOT REMOVE: template socket imports", "<%- socketImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template sockets", "<%= socketRegisters.join('\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/starter-app/server'));
});

// Replace tasks for dbless-app
gulp.task('dbless_replace_store', function() {
	return gulp.src('generators/app/templates/dbless-app/client/redux/store/index.ts')
		.pipe(replace("// DO NOT REMOVE: template store imports", "<%- newStoreImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template store attributes", "<%= newStoreAttrs.join('\\n\\t') %>"))
		.pipe(replace("// DO NOT REMOVE: template reducers", "<%= newStoreReducers.join(',\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/dbless-app/client/redux/store'));
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
		'format_starter',
		'clean_clones',
		'ejs_replace',
		done
	);
});
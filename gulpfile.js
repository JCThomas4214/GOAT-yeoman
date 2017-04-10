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
gulp.task('clone_starter', shell.task([
	'cd generators/app/templates && git clone https://github.com/projectSHAI/GOATstack starter-app',
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
		'delete_starter_extra',
		'fix_package',
		done
	);
});

gulp.task('move_mongo', function() {
	return gulp.src('generators/app/templates/starter-app/server/mongo-db/**/**/*.ts')
		.pipe(gulp.dest('generators/app/templates/mongo-db'));
});
gulp.task('move_cassandra', function() {
	return gulp.src('generators/app/templates/starter-app/server/cassandra-db/**/**/*.ts')
		.pipe(gulp.dest('generators/app/templates/cassandra-db'));
});
gulp.task('move_postgres', function() {
	return gulp.src('generators/app/templates/starter-app/server/sql-db/**/**/*.ts')
		.pipe(replace('sql-db', 'postgres-db'))
		.pipe(replace('config.sql', 'config.postgres'))		
		.pipe(replace('sequelizeConnect', 'postgresConnect'))		
		.pipe(replace('sequelizeDisconnect', 'postgresDisconnect'))
		.pipe(replace('sqlSeed(env?: string)', 'postgresSeed(env?: string)'))
		.pipe(gulp.dest('generators/app/templates/postgres-db'));
});
gulp.task('move_mysql', function() {
	return gulp.src('generators/app/templates/starter-app/server/sql-db/**/**/*.ts')
		.pipe(replace('sql-db', 'mysql-db'))
		.pipe(replace('config.sql', 'config.mysql'))
		.pipe(replace('sequelizeConnect', 'mysqlConnect'))		
		.pipe(replace('sequelizeDisconnect', 'mysqlDisconnect'))
		.pipe(replace('sqlSeed(env?: string)', 'mysqlSeed(env?: string)'))
		.pipe(gulp.dest('generators/app/templates/mysql-db'));
});
gulp.task('move_mssql', function() {
	return gulp.src('generators/app/templates/starter-app/server/sql-db/**/**/*.ts')
		.pipe(replace('sql-db', 'mssql-db'))
		.pipe(replace('config.sql', 'config.mssql'))
		.pipe(replace('sequelizeConnect', 'mssqlConnect'))		
		.pipe(replace('sequelizeDisconnect', 'mssqlDisconnect'))
		.pipe(replace('sqlSeed(env?: string)', 'mssqlSeed(env?: string)'))
		.pipe(gulp.dest('generators/app/templates/mssql-db'));
});
gulp.task('move_sqlite', function() {
	return gulp.src('generators/app/templates/starter-app/server/sql-db/**/**/*.ts')
		.pipe(replace('sql-db', 'sqlite-db'))
		.pipe(replace('config.sql', 'config.sqlite'))
		.pipe(replace('sequelizeConnect', 'sqliteConnect'))		
		.pipe(replace('sequelizeDisconnect', 'sqliteDisconnect'))
		.pipe(replace('sqlSeed(env?: string)', 'sqliteSeed(env?: string)'))
		.pipe(gulp.dest('generators/app/templates/sqlite-db'));
});
gulp.task('move_maria', function() {
	return gulp.src('generators/app/templates/starter-app/server/sql-db/**/**/*.ts')
		.pipe(replace('sql-db', 'maria-db'))
		.pipe(replace('config.sql', 'config.maria'))
		.pipe(replace('sequelizeConnect', 'mariaConnect'))
		.pipe(replace('sequelizeDisconnect', 'mariaDisconnect'))
		.pipe(replace('sqlSeed(env?: string)', 'mariaSeed(env?: string)'))
		.pipe(gulp.dest('generators/app/templates/maria-db'));
});
gulp.task('delete_starter_extra', function(done) {
	return del([		
		'generators/app/templates/starter-app/server/**',
		'generators/app/templates/starter-app/config/**',
	]);
});
gulp.task('fix_package', function() {
	var pack = require('./generators/app/templates/starter-app/package.json');

	delete pack.dependencies.mongoose;
	delete pack.dependencies.mongodb;
	delete pack.dependencies['connect-mongo'];
	delete pack.dependencies.sequelize;
	delete pack.dependencies.cassmask;
	delete pack.dependencies.pg;
	delete pack.dependencies['pg-hstore'];
	delete pack.dependencies.mysql;
	delete pack.dependencies.seqlite3;
	delete pack.dependencies.tedious;

	delete pack.dependencies['@types/mongoose'];
	delete pack.dependencies['@types/mongodb'];
	delete pack.dependencies['@types/sequelize'];

	var json = JSON.stringify(pack, null, 2);

	fs.writeFile('generators/app/templates/starter-app/package.json', json);
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
		'starter_replace_store',
		'starter_replace_html',
		'starter_replace_appE2e',
		'dbless_copy_readme',
		'dbless_replace_store',
		'dbless_replace_server',
		'dbless_replace_html',
		'dbless_replace_appE2e',
		done
	);
});

// Replace tasks for starter-app
gulp.task('starter_replace_store', function() {
	return gulp.src('generators/app/templates/starter-app/client/redux/store/index.ts')
		.pipe(replace("// DO NOT REMOVE: template store imports", "<%- newStoreImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template store attributes", "<%= newStoreAttrs.join('\\n\\t') %>"))
		.pipe(replace("// DO NOT REMOVE: template reducers", "<%= newStoreReducers.join(',\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/starter-app/client/redux/store'));
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

// Replace tasks for dbless-app
gulp.task('dbless_copy_readme', function() {
	return gulp.src('generators/app/templates/starter-app/README.md')
		.pipe(gulp.dest('generators/app/templates/dbless-app'));
});
gulp.task('dbless_replace_store', function() {
	return gulp.src('generators/app/templates/dbless-app/client/redux/store/index.ts')
		.pipe(replace("// DO NOT REMOVE: template store imports", "<%- newStoreImports.join('\\n') %>"))
		.pipe(replace("// DO NOT REMOVE: template store attributes", "<%= newStoreAttrs.join('\\n\\t') %>"))
		.pipe(replace("// DO NOT REMOVE: template reducers", "<%= newStoreReducers.join(',\\n\\t') %>"))
		.pipe(gulp.dest('generators/app/templates/dbless-app/client/redux/store'));
});
gulp.task('dbless_replace_server', function() {
	return gulp.src('generators/app/templates/dbless-app/server/server.ts')
		.pipe(replace("// if (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {", "if (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {"))
		.pipe(replace("//   require('./server-render').serverSideRendering(app);", "  require('./server-render').serverSideRendering(app);"))
		.pipe(replace("// }", "}"))
		.pipe(gulp.dest('generators/app/templates/dbless-app/server'));
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
		'clone_starter',
		'clone_dbless',
		'format_starter',
		'clean_clones',
		'ejs_replace',
		done
	);
});
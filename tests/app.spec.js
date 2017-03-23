var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('goatstack:app', function() {

	describe('goatstack:app => MongoDB', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/app'))
				.inDir(path.join(__dirname, '../temp'))
				.withPrompts({
					databases: ['MongoDB'],
					appname: 'testApp',
					appdescription: 'This is a test App',
					appkeywords: 'testing, app',
					protocol: 'http',
					analyticschoice: false
				})
				.on('end', () => done());
		});

		it('should generate the app with correct server files', () => {
			assert.file([
				'../temp/server/mongo-db/api/user/user.controller.ts',
				'../temp/server/mongo-db/api/user/user.integration.ts',
				'../temp/server/mongo-db/api/user/user.model.ts',
				'../temp/server/mongo-db/api/user/user.router.ts',
				'../temp/server/mongo-db/api/user/user.spec.ts',
				'../temp/server/mongo-db/auth/local/local.router.ts',
				'../temp/server/mongo-db/auth/local/local.passport.ts',
				'../temp/server/mongo-db/auth/auth.router.ts',
				'../temp/server/mongo-db/auth/auth.service.ts',
				'../temp/server/mongo-db/index.ts',
				'../temp/server/mongo-db/seed.ts',
				'../temp/server/db-connect.ts',
				'../temp/server/express.ts',
				'../temp/server/server.ts',
				'../temp/server/socketio.ts',
				'../temp/server/routes.ts'
			]);
		});

		it('should generate the correct server file content', () => {
			assert.fileContent('../temp/server/db-connect.ts', /import \{ mongoConnect\, mongoDisconnect \} from \'\.\/mongo-db\'/);
			assert.fileContent('../temp/server/db-connect.ts', /mongoConnect/);
			assert.fileContent('../temp/server/db-connect.ts', /mongoDisconnect/);

			assert.fileContent('../temp/server/routes.ts', /import \{userRoutes\} from \'\.\/mongo-db\/api\/user\/user\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /import \{authRoutes\} from \'\.\/mongo-db\/auth\/auth\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /\'\/api\/users\'\, userRoutes/);
			assert.fileContent('../temp/server/routes.ts', /\'\/auth\'\, authRoutes/);
		});

		it('should generate the correct config files', () => {
			assert.file([
				'../temp/config/env/default.ts',
				'../temp/config/env/development.ts',
				'../temp/config/env/production.ts',
				'../temp/config/env/test.ts',
				'../temp/config/other/generate-ssl-certs.sh',
				'../temp/config/other/tslint.json',
				'../temp/config/test-libs/karma-test-shim.js',
				'../temp/config/test-libs/karma.config.js',
				'../temp/config/test-libs/protractor.config.js',
				'../temp/config/test-libs/server.test.js',
				'../temp/config/webpack/webpack.client.js',
				'../temp/config/webpack/webpack.common.js',
				'../temp/config/webpack/webpack.server.js',
				'../temp/config/helpers.js',
				'../temp/config/index.ts',
				'../temp/config/scripts.js',
			]);
		});

		it('should generate the correct config file content', () => {
			assert.fileContent('../temp/config/env/development.ts', /mongo/);
			assert.fileContent('../temp/config/env/production.ts', /mongo/);
			assert.fileContent('../temp/config/env/test.ts', /mongo/);
		});

	});

	describe('goatstack:app => Apache-Cassandra', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/app'))
				.inDir(path.join(__dirname, '../temp'))
				.withPrompts({
					databases: ['Apache Cassandra'],
					appname: 'testApp',
					appdescription: 'This is a test App',
					appkeywords: 'testing, app',
					protocol: 'http',
					analyticschoice: false
				})
				.on('end', () => done());
		});

		it('should generate the app with correct server files', () => {
			assert.file([
				'../temp/server/cassandra-db/api/user/user.controller.ts',
				'../temp/server/cassandra-db/api/user/user.integration.ts',
				'../temp/server/cassandra-db/api/user/user.model.ts',
				'../temp/server/cassandra-db/api/user/user.router.ts',
				'../temp/server/cassandra-db/api/user/user.spec.ts',
				'../temp/server/cassandra-db/auth/local/local.router.ts',
				'../temp/server/cassandra-db/auth/local/local.passport.ts',
				'../temp/server/cassandra-db/auth/auth.router.ts',
				'../temp/server/cassandra-db/auth/auth.service.ts',
				'../temp/server/cassandra-db/index.ts',
				'../temp/server/cassandra-db/seed.ts',
				'../temp/server/db-connect.ts',
				'../temp/server/express.ts',
				'../temp/server/server.ts',
				'../temp/server/socketio.ts',
				'../temp/server/routes.ts'
			]);
		});

		it('should generate the correct server file content', () => {
			assert.fileContent('../temp/server/db-connect.ts', /import \{ cassandraConnect\, cassandraDisconnect \} from \'\.\/cassandra-db\'/);
			assert.fileContent('../temp/server/db-connect.ts', /cassandraConnect/);
			assert.fileContent('../temp/server/db-connect.ts', /cassandraDisconnect/);

			assert.fileContent('../temp/server/routes.ts', /import \{userRoutes\} from \'\.\/cassandra-db\/api\/user\/user\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /import \{authRoutes\} from \'\.\/cassandra-db\/auth\/auth\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /\'\/api\/users\'\, userRoutes/);
			assert.fileContent('../temp/server/routes.ts', /\'\/auth\'\, authRoutes/);
		});

		it('should generate the correct config files', () => {
			assert.file([
				'../temp/config/env/default.ts',
				'../temp/config/env/development.ts',
				'../temp/config/env/production.ts',
				'../temp/config/env/test.ts',
				'../temp/config/other/generate-ssl-certs.sh',
				'../temp/config/other/tslint.json',
				'../temp/config/test-libs/karma-test-shim.js',
				'../temp/config/test-libs/karma.config.js',
				'../temp/config/test-libs/protractor.config.js',
				'../temp/config/test-libs/server.test.js',
				'../temp/config/webpack/webpack.client.js',
				'../temp/config/webpack/webpack.common.js',
				'../temp/config/webpack/webpack.server.js',
				'../temp/config/helpers.js',
				'../temp/config/index.ts',
				'../temp/config/scripts.js',
			]);
		});

		it('should generate the correct config file content', () => {
			assert.fileContent('../temp/config/env/development.ts', /cassandra/);
			assert.fileContent('../temp/config/env/production.ts', /cassandra/);
			assert.fileContent('../temp/config/env/test.ts', /cassandra/);
		});

	});

	describe('goatstack:app => PostgresSQL', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/app'))
				.inDir(path.join(__dirname, '../temp'))
				.withPrompts({
					databases: ['PostgresSQL'],
					appname: 'testApp',
					appdescription: 'This is a test App',
					appkeywords: 'testing, app',
					protocol: 'http',
					analyticschoice: false
				})
				.on('end', () => done());
		});

		it('should generate the app with correct server files', () => {
			assert.file([
				'../temp/server/postgres-db/api/user/user.controller.ts',
				'../temp/server/postgres-db/api/user/user.integration.ts',
				'../temp/server/postgres-db/api/user/user.model.ts',
				'../temp/server/postgres-db/api/user/user.router.ts',
				'../temp/server/postgres-db/api/user/user.spec.ts',
				'../temp/server/postgres-db/auth/local/local.router.ts',
				'../temp/server/postgres-db/auth/local/local.passport.ts',
				'../temp/server/postgres-db/auth/auth.router.ts',
				'../temp/server/postgres-db/auth/auth.service.ts',
				'../temp/server/postgres-db/index.ts',
				'../temp/server/postgres-db/seed.ts',
				'../temp/server/db-connect.ts',
				'../temp/server/express.ts',
				'../temp/server/server.ts',
				'../temp/server/socketio.ts',
				'../temp/server/routes.ts'
			]);
		});

		it('should generate the correct server file content', () => {
			assert.fileContent('../temp/server/db-connect.ts', /import \{ postgresConnect\, postgresDisconnect \} from \'\.\/postgres-db\'/);
			assert.fileContent('../temp/server/db-connect.ts', /postgresConnect/);
			assert.fileContent('../temp/server/db-connect.ts', /postgresDisconnect/);

			assert.fileContent('../temp/server/routes.ts', /import \{userRoutes\} from \'\.\/postgres-db\/api\/user\/user\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /import \{authRoutes\} from \'\.\/postgres-db\/auth\/auth\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /\'\/api\/users\'\, userRoutes/);
			assert.fileContent('../temp/server/routes.ts', /\'\/auth\'\, authRoutes/);
		});

		it('should generate the correct config files', () => {
			assert.file([
				'../temp/config/env/default.ts',
				'../temp/config/env/development.ts',
				'../temp/config/env/production.ts',
				'../temp/config/env/test.ts',
				'../temp/config/other/generate-ssl-certs.sh',
				'../temp/config/other/tslint.json',
				'../temp/config/test-libs/karma-test-shim.js',
				'../temp/config/test-libs/karma.config.js',
				'../temp/config/test-libs/protractor.config.js',
				'../temp/config/test-libs/server.test.js',
				'../temp/config/webpack/webpack.client.js',
				'../temp/config/webpack/webpack.common.js',
				'../temp/config/webpack/webpack.server.js',
				'../temp/config/helpers.js',
				'../temp/config/index.ts',
				'../temp/config/scripts.js',
			]);
		});

		it('should generate the correct config file content', () => {
			assert.fileContent('../temp/config/env/development.ts', /postgres/);
			assert.fileContent('../temp/config/env/production.ts', /postgres/);
			assert.fileContent('../temp/config/env/test.ts', /postgres/);
		});

	});

	describe('goatstack:app => MySQL', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/app'))
				.inDir(path.join(__dirname, '../temp'))
				.withPrompts({
					databases: ['MySQL'],
					appname: 'testApp',
					appdescription: 'This is a test App',
					appkeywords: 'testing, app',
					protocol: 'http',
					analyticschoice: false
				})
				.on('end', () => done());
		});

		it('should generate the app with correct server files', () => {
			assert.file([
				'../temp/server/mysql-db/api/user/user.controller.ts',
				'../temp/server/mysql-db/api/user/user.integration.ts',
				'../temp/server/mysql-db/api/user/user.model.ts',
				'../temp/server/mysql-db/api/user/user.router.ts',
				'../temp/server/mysql-db/api/user/user.spec.ts',
				'../temp/server/mysql-db/auth/local/local.router.ts',
				'../temp/server/mysql-db/auth/local/local.passport.ts',
				'../temp/server/mysql-db/auth/auth.router.ts',
				'../temp/server/mysql-db/auth/auth.service.ts',
				'../temp/server/mysql-db/index.ts',
				'../temp/server/mysql-db/seed.ts',
				'../temp/server/db-connect.ts',
				'../temp/server/express.ts',
				'../temp/server/server.ts',
				'../temp/server/socketio.ts',
				'../temp/server/routes.ts'
			]);
		});

		it('should generate the correct server file content', () => {
			assert.fileContent('../temp/server/db-connect.ts', /import \{ mysqlConnect\, mysqlDisconnect \} from \'\.\/mysql-db\'/);
			assert.fileContent('../temp/server/db-connect.ts', /mysqlConnect/);
			assert.fileContent('../temp/server/db-connect.ts', /mysqlDisconnect/);

			assert.fileContent('../temp/server/routes.ts', /import \{userRoutes\} from \'\.\/mysql-db\/api\/user\/user\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /import \{authRoutes\} from \'\.\/mysql-db\/auth\/auth\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /\'\/api\/users\'\, userRoutes/);
			assert.fileContent('../temp/server/routes.ts', /\'\/auth\'\, authRoutes/);
		});

		it('should generate the correct config files', () => {
			assert.file([
				'../temp/config/env/default.ts',
				'../temp/config/env/development.ts',
				'../temp/config/env/production.ts',
				'../temp/config/env/test.ts',
				'../temp/config/other/generate-ssl-certs.sh',
				'../temp/config/other/tslint.json',
				'../temp/config/test-libs/karma-test-shim.js',
				'../temp/config/test-libs/karma.config.js',
				'../temp/config/test-libs/protractor.config.js',
				'../temp/config/test-libs/server.test.js',
				'../temp/config/webpack/webpack.client.js',
				'../temp/config/webpack/webpack.common.js',
				'../temp/config/webpack/webpack.server.js',
				'../temp/config/helpers.js',
				'../temp/config/index.ts',
				'../temp/config/scripts.js',
			]);
		});

		it('should generate the correct config file content', () => {
			assert.fileContent('../temp/config/env/development.ts', /mysql/);
			assert.fileContent('../temp/config/env/production.ts', /mysql/);
			assert.fileContent('../temp/config/env/test.ts', /mysql/);
		});

	});

	describe('goatstack:app => MariaDB', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/app'))
				.inDir(path.join(__dirname, '../temp'))
				.withPrompts({
					databases: ['MariaDB'],
					appname: 'testApp',
					appdescription: 'This is a test App',
					appkeywords: 'testing, app',
					protocol: 'http',
					analyticschoice: false
				})
				.on('end', () => done());
		});

		it('should generate the app with correct server files', () => {
			assert.file([
				'../temp/server/maria-db/api/user/user.controller.ts',
				'../temp/server/maria-db/api/user/user.integration.ts',
				'../temp/server/maria-db/api/user/user.model.ts',
				'../temp/server/maria-db/api/user/user.router.ts',
				'../temp/server/maria-db/api/user/user.spec.ts',
				'../temp/server/maria-db/auth/local/local.router.ts',
				'../temp/server/maria-db/auth/local/local.passport.ts',
				'../temp/server/maria-db/auth/auth.router.ts',
				'../temp/server/maria-db/auth/auth.service.ts',
				'../temp/server/maria-db/index.ts',
				'../temp/server/maria-db/seed.ts',
				'../temp/server/db-connect.ts',
				'../temp/server/express.ts',
				'../temp/server/server.ts',
				'../temp/server/socketio.ts',
				'../temp/server/routes.ts'
			]);
		});

		it('should generate the correct server file content', () => {
			assert.fileContent('../temp/server/db-connect.ts', /import \{ mariaConnect\, mariaDisconnect \} from \'\.\/maria-db\'/);
			assert.fileContent('../temp/server/db-connect.ts', /mariaConnect/);
			assert.fileContent('../temp/server/db-connect.ts', /mariaDisconnect/);

			assert.fileContent('../temp/server/routes.ts', /import \{userRoutes\} from \'\.\/maria-db\/api\/user\/user\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /import \{authRoutes\} from \'\.\/maria-db\/auth\/auth\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /\'\/api\/users\'\, userRoutes/);
			assert.fileContent('../temp/server/routes.ts', /\'\/auth\'\, authRoutes/);
		});

		it('should generate the correct config files', () => {
			assert.file([
				'../temp/config/env/default.ts',
				'../temp/config/env/development.ts',
				'../temp/config/env/production.ts',
				'../temp/config/env/test.ts',
				'../temp/config/other/generate-ssl-certs.sh',
				'../temp/config/other/tslint.json',
				'../temp/config/test-libs/karma-test-shim.js',
				'../temp/config/test-libs/karma.config.js',
				'../temp/config/test-libs/protractor.config.js',
				'../temp/config/test-libs/server.test.js',
				'../temp/config/webpack/webpack.client.js',
				'../temp/config/webpack/webpack.common.js',
				'../temp/config/webpack/webpack.server.js',
				'../temp/config/helpers.js',
				'../temp/config/index.ts',
				'../temp/config/scripts.js',
			]);
		});

		it('should generate the correct config file content', () => {
			assert.fileContent('../temp/config/env/development.ts', /maria/);
			assert.fileContent('../temp/config/env/production.ts', /maria/);
			assert.fileContent('../temp/config/env/test.ts', /maria/);
		});

	});

	describe('goatstack:app => SQLite', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/app'))
				.inDir(path.join(__dirname, '../temp'))
				.withPrompts({
					databases: ['SQLite'],
					appname: 'testApp',
					appdescription: 'This is a test App',
					appkeywords: 'testing, app',
					protocol: 'http',
					analyticschoice: false
				})
				.on('end', () => done());
		});

		it('should generate the app with correct server files', () => {
			assert.file([
				'../temp/server/sqlite-db/api/user/user.controller.ts',
				'../temp/server/sqlite-db/api/user/user.integration.ts',
				'../temp/server/sqlite-db/api/user/user.model.ts',
				'../temp/server/sqlite-db/api/user/user.router.ts',
				'../temp/server/sqlite-db/api/user/user.spec.ts',
				'../temp/server/sqlite-db/auth/local/local.router.ts',
				'../temp/server/sqlite-db/auth/local/local.passport.ts',
				'../temp/server/sqlite-db/auth/auth.router.ts',
				'../temp/server/sqlite-db/auth/auth.service.ts',
				'../temp/server/sqlite-db/index.ts',
				'../temp/server/sqlite-db/seed.ts',
				'../temp/server/db-connect.ts',
				'../temp/server/express.ts',
				'../temp/server/server.ts',
				'../temp/server/socketio.ts',
				'../temp/server/routes.ts'
			]);
		});

		it('should generate the correct server file content', () => {
			assert.fileContent('../temp/server/db-connect.ts', /import \{ sqliteConnect\, sqliteDisconnect \} from \'\.\/sqlite-db\'/);
			assert.fileContent('../temp/server/db-connect.ts', /sqliteConnect/);
			assert.fileContent('../temp/server/db-connect.ts', /sqliteDisconnect/);

			assert.fileContent('../temp/server/routes.ts', /import \{userRoutes\} from \'\.\/sqlite-db\/api\/user\/user\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /import \{authRoutes\} from \'\.\/sqlite-db\/auth\/auth\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /\'\/api\/users\'\, userRoutes/);
			assert.fileContent('../temp/server/routes.ts', /\'\/auth\'\, authRoutes/);
		});

		it('should generate the correct config files', () => {
			assert.file([
				'../temp/config/env/default.ts',
				'../temp/config/env/development.ts',
				'../temp/config/env/production.ts',
				'../temp/config/env/test.ts',
				'../temp/config/other/generate-ssl-certs.sh',
				'../temp/config/other/tslint.json',
				'../temp/config/test-libs/karma-test-shim.js',
				'../temp/config/test-libs/karma.config.js',
				'../temp/config/test-libs/protractor.config.js',
				'../temp/config/test-libs/server.test.js',
				'../temp/config/webpack/webpack.client.js',
				'../temp/config/webpack/webpack.common.js',
				'../temp/config/webpack/webpack.server.js',
				'../temp/config/helpers.js',
				'../temp/config/index.ts',
				'../temp/config/scripts.js',
			]);
		});

		it('should generate the correct config file content', () => {
			assert.fileContent('../temp/config/env/development.ts', /sqlite/);
			assert.fileContent('../temp/config/env/production.ts', /sqlite/);
			assert.fileContent('../temp/config/env/test.ts', /sqlite/);
		});

	});

	describe('goatstack:app => MSSQL', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/app'))
				.inDir(path.join(__dirname, '../temp'))
				.withPrompts({
					databases: ['MSSQL'],
					appname: 'testApp',
					appdescription: 'This is a test App',
					appkeywords: 'testing, app',
					protocol: 'http',
					analyticschoice: false
				})
				.on('end', () => done());
		});

		it('should generate the app with correct server files', () => {
			assert.file([
				'../temp/server/mssql-db/api/user/user.controller.ts',
				'../temp/server/mssql-db/api/user/user.integration.ts',
				'../temp/server/mssql-db/api/user/user.model.ts',
				'../temp/server/mssql-db/api/user/user.router.ts',
				'../temp/server/mssql-db/api/user/user.spec.ts',
				'../temp/server/mssql-db/auth/local/local.router.ts',
				'../temp/server/mssql-db/auth/local/local.passport.ts',
				'../temp/server/mssql-db/auth/auth.router.ts',
				'../temp/server/mssql-db/auth/auth.service.ts',
				'../temp/server/mssql-db/index.ts',
				'../temp/server/mssql-db/seed.ts',
				'../temp/server/db-connect.ts',
				'../temp/server/express.ts',
				'../temp/server/server.ts',
				'../temp/server/socketio.ts',
				'../temp/server/routes.ts'
			]);
		});

		it('should generate the correct server file content', () => {
			assert.fileContent('../temp/server/db-connect.ts', /import \{ mssqlConnect\, mssqlDisconnect \} from \'\.\/mssql-db\'/);
			assert.fileContent('../temp/server/db-connect.ts', /mssqlConnect/);
			assert.fileContent('../temp/server/db-connect.ts', /mssqlDisconnect/);

			assert.fileContent('../temp/server/routes.ts', /import \{userRoutes\} from \'\.\/mssql-db\/api\/user\/user\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /import \{authRoutes\} from \'\.\/mssql-db\/auth\/auth\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /\'\/api\/users\'\, userRoutes/);
			assert.fileContent('../temp/server/routes.ts', /\'\/auth\'\, authRoutes/);
		});

		it('should generate the correct config files', () => {
			assert.file([
				'../temp/config/env/default.ts',
				'../temp/config/env/development.ts',
				'../temp/config/env/production.ts',
				'../temp/config/env/test.ts',
				'../temp/config/other/generate-ssl-certs.sh',
				'../temp/config/other/tslint.json',
				'../temp/config/test-libs/karma-test-shim.js',
				'../temp/config/test-libs/karma.config.js',
				'../temp/config/test-libs/protractor.config.js',
				'../temp/config/test-libs/server.test.js',
				'../temp/config/webpack/webpack.client.js',
				'../temp/config/webpack/webpack.common.js',
				'../temp/config/webpack/webpack.server.js',
				'../temp/config/helpers.js',
				'../temp/config/index.ts',
				'../temp/config/scripts.js',
			]);
		});

		it('should generate the correct config file content', () => {
			assert.fileContent('../temp/config/env/development.ts', /mssql/);
			assert.fileContent('../temp/config/env/production.ts', /mssql/);
			assert.fileContent('../temp/config/env/test.ts', /mssql/);
		});

	});

	describe('goatstack:app => MongoDB, Apache-Cassandra, PostgresSQL', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/app'))
				.inDir(path.join(__dirname, '../temp'))
				.withPrompts({
					databases: ['MongoDB', 'Apache Cassandra', 'PostgresSQL'],
					defaultDb: 'MongoDB',
					appname: 'testApp',
					appdescription: 'This is a test App',
					appkeywords: 'testing, app',
					protocol: 'http',
					analyticschoice: false
				})
				.on('end', () => done());
		});

		it('should generate the app with correct server files', () => {
			assert.file([
				'../temp/server/mongo-db/api/user/user.controller.ts',
				'../temp/server/mongo-db/api/user/user.integration.ts',
				'../temp/server/mongo-db/api/user/user.model.ts',
				'../temp/server/mongo-db/api/user/user.router.ts',
				'../temp/server/mongo-db/api/user/user.spec.ts',
				'../temp/server/mongo-db/auth/local/local.router.ts',
				'../temp/server/mongo-db/auth/local/local.passport.ts',
				'../temp/server/mongo-db/auth/auth.router.ts',
				'../temp/server/mongo-db/auth/auth.service.ts',
				'../temp/server/mongo-db/index.ts',
				'../temp/server/mongo-db/seed.ts',
				'../temp/server/cassandra-db/index.ts',
				'../temp/server/cassandra-db/seed.ts',
				'../temp/server/postgres-db/index.ts',
				'../temp/server/postgres-db/seed.ts',
				'../temp/server/db-connect.ts',
				'../temp/server/express.ts',
				'../temp/server/server.ts',
				'../temp/server/socketio.ts',
				'../temp/server/routes.ts'
			]);
		});

		it('should generate the correct server file content', () => {
			assert.fileContent('../temp/server/db-connect.ts', /import \{ mongoConnect\, mongoDisconnect \} from \'\.\/mongo-db\'/);
			assert.fileContent('../temp/server/db-connect.ts', /mongoConnect/);
			assert.fileContent('../temp/server/db-connect.ts', /mongoDisconnect/);
			assert.fileContent('../temp/server/db-connect.ts', /import \{ cassandraConnect\, cassandraDisconnect \} from \'\.\/cassandra-db\'/);
			assert.fileContent('../temp/server/db-connect.ts', /cassandraConnect/);
			assert.fileContent('../temp/server/db-connect.ts', /cassandraDisconnect/);
			assert.fileContent('../temp/server/db-connect.ts', /import \{ postgresConnect\, postgresDisconnect \} from \'\.\/postgres-db\'/);
			assert.fileContent('../temp/server/db-connect.ts', /postgresConnect/);
			assert.fileContent('../temp/server/db-connect.ts', /postgresDisconnect/);

			assert.fileContent('../temp/server/routes.ts', /import \{userRoutes\} from \'\.\/mongo-db\/api\/user\/user\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /import \{authRoutes\} from \'\.\/mongo-db\/auth\/auth\.router\'/);
			assert.fileContent('../temp/server/routes.ts', /\'\/api\/users\'\, userRoutes/);
			assert.fileContent('../temp/server/routes.ts', /\'\/auth\'\, authRoutes/);
		});

		it('should generate the correct config files', () => {
			assert.file([
				'../temp/config/env/default.ts',
				'../temp/config/env/development.ts',
				'../temp/config/env/production.ts',
				'../temp/config/env/test.ts',
				'../temp/config/other/generate-ssl-certs.sh',
				'../temp/config/other/tslint.json',
				'../temp/config/test-libs/karma-test-shim.js',
				'../temp/config/test-libs/karma.config.js',
				'../temp/config/test-libs/protractor.config.js',
				'../temp/config/test-libs/server.test.js',
				'../temp/config/webpack/webpack.client.js',
				'../temp/config/webpack/webpack.common.js',
				'../temp/config/webpack/webpack.server.js',
				'../temp/config/helpers.js',
				'../temp/config/index.ts',
				'../temp/config/scripts.js',
			]);
		});

		it('should generate the correct config file content', () => {
			assert.fileContent('../temp/config/env/development.ts', /mongo/);
			assert.fileContent('../temp/config/env/production.ts', /mongo/);
			assert.fileContent('../temp/config/env/test.ts', /mongo/);
			assert.fileContent('../temp/config/env/development.ts', /cassandra/);
			assert.fileContent('../temp/config/env/production.ts', /cassandra/);
			assert.fileContent('../temp/config/env/test.ts', /cassandra/);
			assert.fileContent('../temp/config/env/development.ts', /postgres/);
			assert.fileContent('../temp/config/env/production.ts', /postgres/);
			assert.fileContent('../temp/config/env/test.ts', /postgres/);
		});

	});

});
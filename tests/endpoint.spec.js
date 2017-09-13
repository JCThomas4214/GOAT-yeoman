var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('goatstack:endpoint', function() {

	describe('goatstack:endpoint => with auth & socketio', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/endpoint'))
				.cd(path.join(__dirname, '../temp'))
				.withPrompts({
					modelname: 'testOne',
					authselect: [],
					socketchoice: false
				})
				.on('end', done);
		});

		it('should generate the necessary endpoint files', () => {
			assert.file([
				'../temp/server/mongo-db/api/test-one/test-one.controller.ts',
				'../temp/server/mongo-db/api/test-one/test-one.model.ts',
				'../temp/server/mongo-db/api/test-one/test-one.router.ts',
				'../temp/server/mongo-db/api/test-one/test-one.integration.ts',
				'../temp/server/mongo-db/api/test-one/test-one.spec.ts',
			]);
		});

		it('should augment the server routes file', () => {
			assert.fileContent('../temp/server/routes.ts', /import {testOneRoutes} from '\.\/mongo-db\/api\/test-one\/test-one\.router\'/);
		});

		it('should not have generated auth middleware in endpoint router', () => {
			assert.noFileContent('../temp/server/mongo-db/api/test-one/test-one.router.ts', /import * as auth from '..\/..\/auth\/auth\.service'/);
			assert.noFileContent('../temp/server/mongo-db/api/test-one/test-one.router.ts', /auth.isAuthenticated()/);
		});

		it('should not have generated auth proxy in the spec file', () => {
			assert.noFileContent('../temp/server/mongo-db/api/test-one/test-one.spec.ts', /authServiceStub/);
			assert.fileContent('../temp/server/mongo-db/api/test-one/test-one.spec.ts', /routerStub\.post\.withArgs\(\'\/\', \'testOneCtrl\.create\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-one/test-one.spec.ts', /routerStub\.get\.withArgs\(\'\/\', \'testOneCtrl\.index\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-one/test-one.spec.ts', /routerStub\.delete\.withArgs\(\'\/:id\', \'testOneCtrl\.destroy\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-one/test-one.spec.ts', /routerStub\.get\.withArgs\(\'\/:id\', \'testOneCtrl\.show\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-one/test-one.spec.ts', /routerStub\.put\.withArgs\(\'\/:id\', \'testOneCtrl\.upsert\'/);
		});

	});

	describe('goatstack:endpoint => with auth index', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/endpoint'))
				.cd(path.join(__dirname, '../temp'))
				.withPrompts({
					modelname: 'testTwo',
					authselect: ['GET controller.index'],
					socketchoice: false
				})
				.on('end', done);
		});

		it('should generate the necessary endpoint files', () => {
			assert.file([
				'../temp/server/mongo-db/api/test-two/test-two.controller.ts',
				'../temp/server/mongo-db/api/test-two/test-two.model.ts',
				'../temp/server/mongo-db/api/test-two/test-two.router.ts',
				'../temp/server/mongo-db/api/test-two/test-two.integration.ts',
				'../temp/server/mongo-db/api/test-two/test-two.spec.ts',
			]);
		});

		it('should augment the server routes file', () => {
			assert.fileContent('../temp/server/routes.ts', /import {testTwoRoutes} from '\.\/mongo-db\/api\/test-two\/test-two\.router\'/);
		});

		it('should have generated auth middleware in endpoint router', () => {
			assert.fileContent('../temp/server/mongo-db/api/test-two/test-two.router.ts', /import \* as auth from \'\.\.\/\.\.\/auth\/auth\.service\'/);

			assert.fileContent('../temp/server/mongo-db/api/test-two/test-two.router.ts', /router\.get\('\/', auth\.isAuthenticated\(\), controller\.index\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-two/test-two.router.ts', /router\.get\('\/:id',  controller\.show\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-two/test-two.router.ts', /router\.post\('\/',  controller\.create\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-two/test-two.router.ts', /router\.put\('\/:id',  controller\.upsert\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-two/test-two.router.ts', /router\.delete\('\/:id',  controller\.destroy\)/);
		});

		it('should have generated auth proxy in the spec file', () => {
			assert.fileContent('../temp/server/mongo-db/api/test-two/test-two.spec.ts', /routerStub\.post\.withArgs\(\'\/\', \'testTwoCtrl\.create\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-two/test-two.spec.ts', /routerStub\.get\.withArgs\(\'\/\', \'authService\.isAuthenticated\', \'testTwoCtrl\.index\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-two/test-two.spec.ts', /routerStub\.delete\.withArgs\(\'\/:id\', \'testTwoCtrl\.destroy\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-two/test-two.spec.ts', /routerStub\.get\.withArgs\(\'\/:id\', \'testTwoCtrl\.show\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-two/test-two.spec.ts', /routerStub\.put\.withArgs\(\'\/:id\', \'testTwoCtrl\.upsert\'/);
		});

	});

	describe('goatstack:endpoint => with auth index, show', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/endpoint'))
				.cd(path.join(__dirname, '../temp'))
				.withPrompts({
					modelname: 'testThree',
					authselect: ['GET controller.index', 'GET controller.show'],
					socketchoice: false
				})
				.on('end', done);
		});

		it('should generate the necessary endpoint files', () => {
			assert.file([
				'../temp/server/mongo-db/api/test-three/test-three.controller.ts',
				'../temp/server/mongo-db/api/test-three/test-three.model.ts',
				'../temp/server/mongo-db/api/test-three/test-three.router.ts',
				'../temp/server/mongo-db/api/test-three/test-three.integration.ts',
				'../temp/server/mongo-db/api/test-three/test-three.spec.ts',
			]);
		});

		it('should augment the server routes file', () => {
			assert.fileContent('../temp/server/routes.ts', /import {testThreeRoutes} from '\.\/mongo-db\/api\/test-three\/test-three\.router\'/);
		});

		it('should have generated auth middleware in endpoint router', () => {
			assert.fileContent('../temp/server/mongo-db/api/test-three/test-three.router.ts', /import \* as auth from \'\.\.\/\.\.\/auth\/auth\.service\'/);

			assert.fileContent('../temp/server/mongo-db/api/test-three/test-three.router.ts', /router\.get\('\/', auth\.isAuthenticated\(\), controller\.index\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-three/test-three.router.ts', /router\.get\('\/:id', auth\.isAuthenticated\(\), controller\.show\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-three/test-three.router.ts', /router\.post\('\/',  controller\.create\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-three/test-three.router.ts', /router\.put\('\/:id',  controller\.upsert\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-three/test-three.router.ts', /router\.delete\('\/:id',  controller\.destroy\)/);
		});

		it('should have generated auth proxy in the spec file', () => {
			assert.fileContent('../temp/server/mongo-db/api/test-three/test-three.spec.ts', /routerStub\.post\.withArgs\(\'\/\', \'testThreeCtrl\.create\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-three/test-three.spec.ts', /routerStub\.get\.withArgs\(\'\/\', \'authService\.isAuthenticated\', \'testThreeCtrl\.index\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-three/test-three.spec.ts', /routerStub\.delete\.withArgs\(\'\/:id\', \'testThreeCtrl\.destroy\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-three/test-three.spec.ts', /routerStub\.get\.withArgs\(\'\/:id\', \'authService\.isAuthenticated\', \'testThreeCtrl\.show\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-three/test-three.spec.ts', /routerStub\.put\.withArgs\(\'\/:id\', \'testThreeCtrl\.upsert\'/);
		});

	});

	describe('goatstack:endpoint => with auth index, show, create', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/endpoint'))
				.cd(path.join(__dirname, '../temp'))
				.withPrompts({
					modelname: 'testFour',
					authselect: ['GET controller.index', 'GET controller.show', 'POST controller.create'],
					socketchoice: false
				})
				.on('end', done);
		});

		it('should generate the necessary endpoint files', () => {
			assert.file([
				'../temp/server/mongo-db/api/test-four/test-four.controller.ts',
				'../temp/server/mongo-db/api/test-four/test-four.model.ts',
				'../temp/server/mongo-db/api/test-four/test-four.router.ts',
				'../temp/server/mongo-db/api/test-four/test-four.integration.ts',
				'../temp/server/mongo-db/api/test-four/test-four.spec.ts',
			]);
		});

		it('should augment the server routes file', () => {
			assert.fileContent('../temp/server/routes.ts', /import {testFourRoutes} from '\.\/mongo-db\/api\/test-four\/test-four\.router\'/);
		});

		it('should have generated auth middleware in endpoint router', () => {
			assert.fileContent('../temp/server/mongo-db/api/test-four/test-four.router.ts', /import \* as auth from \'\.\.\/\.\.\/auth\/auth\.service\'/);

			assert.fileContent('../temp/server/mongo-db/api/test-four/test-four.router.ts', /router\.get\('\/', auth\.isAuthenticated\(\), controller\.index\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-four/test-four.router.ts', /router\.get\('\/:id', auth\.isAuthenticated\(\), controller\.show\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-four/test-four.router.ts', /router\.post\('\/', auth\.isAuthenticated\(\), controller\.create\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-four/test-four.router.ts', /router\.put\('\/:id',  controller\.upsert\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-four/test-four.router.ts', /router\.delete\('\/:id',  controller\.destroy\)/);
		});

		it('should have generated auth proxy in the spec file', () => {
			assert.fileContent('../temp/server/mongo-db/api/test-four/test-four.spec.ts', /routerStub\.post\.withArgs\(\'\/\', \'authService\.isAuthenticated\', \'testFourCtrl\.create\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-four/test-four.spec.ts', /routerStub\.get\.withArgs\(\'\/\', \'authService\.isAuthenticated\', \'testFourCtrl\.index\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-four/test-four.spec.ts', /routerStub\.delete\.withArgs\(\'\/:id\', \'testFourCtrl\.destroy\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-four/test-four.spec.ts', /routerStub\.get\.withArgs\(\'\/:id\', \'authService\.isAuthenticated\', \'testFourCtrl\.show\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-four/test-four.spec.ts', /routerStub\.put\.withArgs\(\'\/:id\', \'testFourCtrl\.upsert\'/);
		});

	});

	describe('goatstack:endpoint => with auth index, show, create, upsert', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/endpoint'))
				.cd(path.join(__dirname, '../temp'))
				.withPrompts({
					modelname: 'testFive',
					authselect: ['GET controller.index', 'GET controller.show', 'POST controller.create', 'PUT controller.upsert'],
					socketchoice: false
				})
				.on('end', done);
		});

		it('should generate the necessary endpoint files', () => {
			assert.file([
				'../temp/server/mongo-db/api/test-five/test-five.controller.ts',
				'../temp/server/mongo-db/api/test-five/test-five.model.ts',
				'../temp/server/mongo-db/api/test-five/test-five.router.ts',
				'../temp/server/mongo-db/api/test-five/test-five.integration.ts',
				'../temp/server/mongo-db/api/test-five/test-five.spec.ts',
			]);
		});

		it('should augment the server routes file', () => {
			assert.fileContent('../temp/server/routes.ts', /import {testFiveRoutes} from '\.\/mongo-db\/api\/test-five\/test-five\.router\'/);
		});

		it('should have generated auth middleware in endpoint router', () => {
			assert.fileContent('../temp/server/mongo-db/api/test-five/test-five.router.ts', /import \* as auth from \'\.\.\/\.\.\/auth\/auth\.service\'/);

			assert.fileContent('../temp/server/mongo-db/api/test-five/test-five.router.ts', /router\.get\('\/', auth\.isAuthenticated\(\), controller\.index\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-five/test-five.router.ts', /router\.get\('\/:id', auth\.isAuthenticated\(\), controller\.show\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-five/test-five.router.ts', /router\.post\('\/', auth\.isAuthenticated\(\), controller\.create\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-five/test-five.router.ts', /router\.put\('\/:id', auth\.isAuthenticated\(\), controller\.upsert\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-five/test-five.router.ts', /router\.delete\('\/:id',  controller\.destroy\)/);
		});

		it('should have generated auth proxy in the spec file', () => {
			assert.fileContent('../temp/server/mongo-db/api/test-five/test-five.spec.ts', /routerStub\.post\.withArgs\(\'\/\', \'authService\.isAuthenticated\', \'testFiveCtrl\.create\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-five/test-five.spec.ts', /routerStub\.get\.withArgs\(\'\/\', \'authService\.isAuthenticated\', \'testFiveCtrl\.index\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-five/test-five.spec.ts', /routerStub\.delete\.withArgs\(\'\/:id\', \'testFiveCtrl\.destroy\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-five/test-five.spec.ts', /routerStub\.get\.withArgs\(\'\/:id\', \'authService\.isAuthenticated\', \'testFiveCtrl\.show\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-five/test-five.spec.ts', /routerStub\.put\.withArgs\(\'\/:id\', \'authService\.isAuthenticated\', \'testFiveCtrl\.upsert\'/);
		});

	});

	describe('goatstack:endpoint => with auth index, show, create, upsert, destroy', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/endpoint'))
				.cd(path.join(__dirname, '../temp'))
				.withPrompts({
					modelname: 'testSix',
					authselect: ['GET controller.index', 'GET controller.show', 'POST controller.create', 'PUT controller.upsert', 'DELETE controller.destroy'],
					socketchoice: false
				})
				.on('end', done);
		});

		it('should generate the necessary endpoint files', () => {
			assert.file([
				'../temp/server/mongo-db/api/test-six/test-six.controller.ts',
				'../temp/server/mongo-db/api/test-six/test-six.model.ts',
				'../temp/server/mongo-db/api/test-six/test-six.router.ts',
				'../temp/server/mongo-db/api/test-six/test-six.integration.ts',
				'../temp/server/mongo-db/api/test-six/test-six.spec.ts',
			]);
		});

		it('should augment the server routes file', () => {
			assert.fileContent('../temp/server/routes.ts', /import {testSixRoutes} from '\.\/mongo-db\/api\/test-six\/test-six\.router\'/);
		});

		it('should have generated auth middleware in endpoint router', () => {
			assert.fileContent('../temp/server/mongo-db/api/test-six/test-six.router.ts', /import \* as auth from \'\.\.\/\.\.\/auth\/auth\.service\'/);

			assert.fileContent('../temp/server/mongo-db/api/test-six/test-six.router.ts', /router\.get\('\/', auth\.isAuthenticated\(\), controller\.index\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-six/test-six.router.ts', /router\.get\('\/:id', auth\.isAuthenticated\(\), controller\.show\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-six/test-six.router.ts', /router\.post\('\/', auth\.isAuthenticated\(\), controller\.create\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-six/test-six.router.ts', /router\.put\('\/:id', auth\.isAuthenticated\(\), controller\.upsert\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-six/test-six.router.ts', /router\.delete\('\/:id', auth\.isAuthenticated\(\), controller\.destroy\)/);
		});

		it('should have generated auth proxy in the spec file', () => {
			assert.fileContent('../temp/server/mongo-db/api/test-six/test-six.spec.ts', /routerStub\.post\.withArgs\(\'\/\', \'authService\.isAuthenticated\', \'testSixCtrl\.create\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-six/test-six.spec.ts', /routerStub\.get\.withArgs\(\'\/\', \'authService\.isAuthenticated\', \'testSixCtrl\.index\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-six/test-six.spec.ts', /routerStub\.delete\.withArgs\(\'\/:id\', \'authService\.isAuthenticated\', \'testSixCtrl\.destroy\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-six/test-six.spec.ts', /routerStub\.get\.withArgs\(\'\/:id\', \'authService\.isAuthenticated\', \'testSixCtrl\.show\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-six/test-six.spec.ts', /routerStub\.put\.withArgs\(\'\/:id\', \'authService\.isAuthenticated\', \'testSixCtrl\.upsert\'/);
		});

	});

	describe('goatstack:endpoint => with auth index, show, create, upsert, destroy => socketio', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/endpoint'))
				.cd(path.join(__dirname, '../temp'))
				.withPrompts({
					modelname: 'testSeven',
					authselect: ['GET controller.index', 'GET controller.show', 'POST controller.create', 'PUT controller.upsert', 'DELETE controller.destroy'],
					socketchoice: true
				})
				.on('end', done);
		});

		it('should generate the necessary endpoint files', () => {
			assert.file([
				'../temp/server/mongo-db/api/test-seven/test-seven.controller.ts',
				'../temp/server/mongo-db/api/test-seven/test-seven.model.ts',
				'../temp/server/mongo-db/api/test-seven/test-seven.router.ts',
				'../temp/server/mongo-db/api/test-seven/test-seven.integration.ts',
				'../temp/server/mongo-db/api/test-seven/test-seven.spec.ts',
			]);
		});

		it('should have generated socketio files', () => {
			assert.file([
				'../temp/server/mongo-db/api/test-seven/test-seven.events.ts',
				'../temp/server/mongo-db/api/test-seven/test-seven.socket.ts',
			]);
		});

		it('should augment the server routes file', () => {
			assert.fileContent('../temp/server/routes.ts', /import {testSevenRoutes} from '\.\/mongo-db\/api\/test-seven\/test-seven\.router\'/);
		});

		it('should have generated auth middleware in endpoint router', () => {
			assert.fileContent('../temp/server/mongo-db/api/test-seven/test-seven.router.ts', /import \* as auth from \'\.\.\/\.\.\/auth\/auth\.service\'/);

			assert.fileContent('../temp/server/mongo-db/api/test-seven/test-seven.router.ts', /router\.get\('\/', auth\.isAuthenticated\(\), controller\.index\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-seven/test-seven.router.ts', /router\.get\('\/:id', auth\.isAuthenticated\(\), controller\.show\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-seven/test-seven.router.ts', /router\.post\('\/', auth\.isAuthenticated\(\), controller\.create\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-seven/test-seven.router.ts', /router\.put\('\/:id', auth\.isAuthenticated\(\), controller\.upsert\)/);
			assert.fileContent('../temp/server/mongo-db/api/test-seven/test-seven.router.ts', /router\.delete\('\/:id', auth\.isAuthenticated\(\), controller\.destroy\)/);
		});

		it('should have generated auth proxy in the spec file', () => {
			assert.fileContent('../temp/server/mongo-db/api/test-seven/test-seven.spec.ts', /routerStub\.post\.withArgs\(\'\/\', \'authService\.isAuthenticated\', \'testSevenCtrl\.create\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-seven/test-seven.spec.ts', /routerStub\.get\.withArgs\(\'\/\', \'authService\.isAuthenticated\', \'testSevenCtrl\.index\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-seven/test-seven.spec.ts', /routerStub\.delete\.withArgs\(\'\/:id\', \'authService\.isAuthenticated\', \'testSevenCtrl\.destroy\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-seven/test-seven.spec.ts', /routerStub\.get\.withArgs\(\'\/:id\', \'authService\.isAuthenticated\', \'testSevenCtrl\.show\'/);
			assert.fileContent('../temp/server/mongo-db/api/test-seven/test-seven.spec.ts', /routerStub\.put\.withArgs\(\'\/:id\', \'authService\.isAuthenticated\', \'testSevenCtrl\.upsert\'/);
		});

	});

	describe('goatstack:endpoint => Apache Cassandra', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/endpoint'))
				.cd(path.join(__dirname, '../temp'))
				.withPrompts({
					database: 'Apache Cassandra',
					modelname: 'testEight',
					authselect: [],
					socketchoice: false
				})
				.on('end', done);
		});

		it('should generate the necessary endpoint files', () => {
			assert.file([
				'../temp/server/cassandra-db/api/test-eight/test-eight.controller.ts',
				'../temp/server/cassandra-db/api/test-eight/test-eight.model.ts',
				'../temp/server/cassandra-db/api/test-eight/test-eight.router.ts',
				'../temp/server/cassandra-db/api/test-eight/test-eight.integration.ts',
				'../temp/server/cassandra-db/api/test-eight/test-eight.spec.ts',
			]);
		});

		it('should augment the server routes file', () => {
			assert.fileContent('../temp/server/routes.ts', /import {testEightRoutes} from '\.\/cassandra-db\/api\/test-eight\/test-eight\.router\'/);
		});

		it('should not have generated auth middleware in endpoint router', () => {
			assert.noFileContent('../temp/server/cassandra-db/api/test-eight/test-eight.router.ts', /import * as auth from '..\/..\/auth\/auth\.service'/);
			assert.noFileContent('../temp/server/cassandra-db/api/test-eight/test-eight.router.ts', /auth.isAuthenticated()/);
		});

		it('should not have generated auth proxy in the spec file', () => {
			assert.noFileContent('../temp/server/cassandra-db/api/test-eight/test-eight.spec.ts', /authServiceStub/);
			assert.fileContent('../temp/server/cassandra-db/api/test-eight/test-eight.spec.ts', /routerStub\.post\.withArgs\(\'\/\', \'testEightCtrl\.create\'/);
			assert.fileContent('../temp/server/cassandra-db/api/test-eight/test-eight.spec.ts', /routerStub\.get\.withArgs\(\'\/\', \'testEightCtrl\.index\'/);
			assert.fileContent('../temp/server/cassandra-db/api/test-eight/test-eight.spec.ts', /routerStub\.delete\.withArgs\(\'\/:timeid\', \'testEightCtrl\.destroy\'/);
			assert.fileContent('../temp/server/cassandra-db/api/test-eight/test-eight.spec.ts', /routerStub\.get\.withArgs\(\'\/:timeid\', \'testEightCtrl\.show\'/);
			assert.fileContent('../temp/server/cassandra-db/api/test-eight/test-eight.spec.ts', /routerStub\.put\.withArgs\(\'\/:timeid\', \'testEightCtrl\.upsert\'/);
		});

	});		

	describe('goatstack:endpoint => PostgresSQL', function() {

		beforeAll(done => {
			return helpers.run(path.join(__dirname, '../generators/endpoint'))
				.cd(path.join(__dirname, '../temp'))
				.withPrompts({
					database: 'PostgresSQL',
					modelname: 'testNine',
					authselect: [],
					socketchoice: false
				})
				.on('end', done);
		});

		it('should generate the necessary endpoint files', () => {
			assert.file([
				'../temp/server/postgres-db/api/test-nine/test-nine.controller.ts',
				'../temp/server/postgres-db/api/test-nine/test-nine.model.ts',
				'../temp/server/postgres-db/api/test-nine/test-nine.router.ts',
				'../temp/server/postgres-db/api/test-nine/test-nine.integration.ts',
				'../temp/server/postgres-db/api/test-nine/test-nine.spec.ts',
			]);
		});

		it('should augment the server routes file', () => {
			assert.fileContent('../temp/server/routes.ts', /import {testNineRoutes} from '\.\/postgres-db\/api\/test-nine\/test-nine\.router\'/);
		});

		it('should not have generated auth middleware in endpoint router', () => {
			assert.noFileContent('../temp/server/postgres-db/api/test-nine/test-nine.router.ts', /import * as auth from '..\/..\/auth\/auth\.service'/);
			assert.noFileContent('../temp/server/postgres-db/api/test-nine/test-nine.router.ts', /auth.isAuthenticated()/);
		});

		it('should not have generated auth proxy in the spec file', () => {
			assert.noFileContent('../temp/server/postgres-db/api/test-nine/test-nine.spec.ts', /authServiceStub/);
			assert.fileContent('../temp/server/postgres-db/api/test-nine/test-nine.spec.ts', /routerStub\.post\.withArgs\(\'\/\', \'testNineCtrl\.create\'/);
			assert.fileContent('../temp/server/postgres-db/api/test-nine/test-nine.spec.ts', /routerStub\.get\.withArgs\(\'\/\', \'testNineCtrl\.index\'/);
			assert.fileContent('../temp/server/postgres-db/api/test-nine/test-nine.spec.ts', /routerStub\.delete\.withArgs\(\'\/:id\', \'testNineCtrl\.destroy\'/);
			assert.fileContent('../temp/server/postgres-db/api/test-nine/test-nine.spec.ts', /routerStub\.get\.withArgs\(\'\/:id\', \'testNineCtrl\.show\'/);
			assert.fileContent('../temp/server/postgres-db/api/test-nine/test-nine.spec.ts', /routerStub\.put\.withArgs\(\'\/:id\', \'testNineCtrl\.upsert\'/);
		});

	});

});
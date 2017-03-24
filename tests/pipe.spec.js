var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('goatstack:pipe', function() {

	it('should generate an the correct pipeOne files', done => {
		return helpers.run(path.join(__dirname, '../generators/pipe'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-one',
				confirmsub: false,
				pipename: 'pipeOne'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-one/pipes/pipe-one.pipe.ts',
				]);

				done();
			});
	});	

	it('should generate an the correct pipeTwo files', done => {
		return helpers.run(path.join(__dirname, '../generators/pipe'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-two',
				confirmsub: true,
				submodulename: 'subtestmoduletwo',
				pipename: 'pipeTwo'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-two/subtestmoduletwo/pipes/pipe-two.pipe.ts',
				]);

				done();
			});
	});	

});
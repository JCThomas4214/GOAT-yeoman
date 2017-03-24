var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('goatstack:directive', function() {

	it('should generate an the correct directiveOne files', done => {
		return helpers.run(path.join(__dirname, '../generators/directive'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-one',
				confirmsub: false,
				directivename: 'directiveOne'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-one/directives/directive-one.directive.ts',
				]);

				done();
			});
	});	

	it('should generate an the correct directiveTwo files', done => {
		return helpers.run(path.join(__dirname, '../generators/directive'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-two',
				confirmsub: true,
				submodulename: 'subtestmoduletwo',
				directivename: 'directiveTwo'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-two/subtestmoduletwo/directives/directive-two.directive.ts',
				]);

				done();
			});
	});	

});
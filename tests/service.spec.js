var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('goatstack:service', function() {

	it('should generate an the correct serviceOne files', done => {
		return helpers.run(path.join(__dirname, '../generators/service'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-one',
				confirmsub: false,
				servicename: 'serviceOne'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-one/services/service-one/service-one.service.ts',
				]);

				done();
			});
	});	

	it('should generate an the correct serviceTwo files', done => {
		return helpers.run(path.join(__dirname, '../generators/service'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-two',
				confirmsub: true,
				submodulename: 'subtestmoduletwo',
				servicename: 'serviceTwo'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-two/subtestmoduletwo/services/service-two/service-two.service.ts',
				]);

				done();
			});
	});	

});
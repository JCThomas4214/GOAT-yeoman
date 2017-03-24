var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('goatstack:actions', function() {

	it('should generate an the correct actionsOne files', done => {
		return helpers.run(path.join(__dirname, '../generators/actions'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				actionsname: 'actions-one',
			})
			.on('end', () => {

				assert.file([
					'client/redux/actions/actions-one/actions-one.actions.ts',
					'client/redux/actions/actions-one/actions-one.actions.spec.ts',
				]);

				done();
			});
	});

	it('should have generated the actionsTwo files with the correct content', () => {
		assert.fileContent('client/redux/actions/actions-one/actions-one.actions.ts', /ActionsOneActions/);
	});

	it('should generate an the correct actionsTwo files', done => {
		return helpers.run(path.join(__dirname, '../generators/actions'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				actionsname: 'actions-two',
			})
			.on('end', () => {

				assert.file([
					'client/redux/actions/actions-two/actions-two.actions.ts',
					'client/redux/actions/actions-two/actions-two.actions.spec.ts',
				]);

				done();
			});
	});

	it('should have generated the actionsOne files with the correct content', () => {
		assert.fileContent('client/redux/actions/actions-two/actions-two.actions.ts', /ActionsTwoActions/);
	});

});
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('goatstack:submodule', function() {

	it('should generate the correct moduleOne submodule files', done => {
		return helpers.run(path.join(__dirname, '../generators/submodule'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-one',
				submodulename: 'subtestmoduleone'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-one/subtestmoduleone/subtestmoduleone.module.ts',
					'client/modules/module-one/subtestmoduleone/subtestmoduleone-routing.module.ts',
					'client/modules/module-one/subtestmoduleone/subtestmoduleone.component.ts',
					'client/modules/module-one/subtestmoduleone/subtestmoduleone.component.html',
					'client/modules/module-one/subtestmoduleone/subtestmoduleone.component.scss',
				]);

				done();
			});
	});

	it('should generate the correct moduleTwo submodule files', done => {
		return helpers.run(path.join(__dirname, '../generators/submodule'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-two',
				submodulename: 'subtestmoduletwo'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-two/subtestmoduletwo/subtestmoduletwo.module.ts',
					'client/modules/module-two/subtestmoduletwo/subtestmoduletwo-routing.module.ts',
					'client/modules/module-two/subtestmoduletwo/subtestmoduletwo.component.ts',
					'client/modules/module-two/subtestmoduletwo/subtestmoduletwo.component.html',
					'client/modules/module-two/subtestmoduletwo/subtestmoduletwo.component.scss',
				]);

				done();
			});
	});

	it('should generate the correct moduleThree submodule files', done => {
		return helpers.run(path.join(__dirname, '../generators/submodule'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-three',
				submodulename: 'subtestmodulethree'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-three/subtestmodulethree/subtestmodulethree.module.ts',
					'client/modules/module-three/subtestmodulethree/subtestmodulethree-routing.module.ts',
					'client/modules/module-three/subtestmodulethree/subtestmodulethree.component.ts',
					'client/modules/module-three/subtestmodulethree/subtestmodulethree.component.html',
					'client/modules/module-three/subtestmodulethree/subtestmodulethree.component.scss',
				]);

				done();
			});
	});

	it('should generate the correct moduleTwo submodule files', done => {
		return helpers.run(path.join(__dirname, '../generators/submodule'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-four',
				submodulename: 'subtestmodulefour'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-four/subtestmodulefour/subtestmodulefour.module.ts',
					'client/modules/module-four/subtestmodulefour/subtestmodulefour-routing.module.ts',
					'client/modules/module-four/subtestmodulefour/subtestmodulefour.component.ts',
					'client/modules/module-four/subtestmodulefour/subtestmodulefour.component.html',
					'client/modules/module-four/subtestmodulefour/subtestmodulefour.component.scss',
				]);

				done();
			});
	});

});
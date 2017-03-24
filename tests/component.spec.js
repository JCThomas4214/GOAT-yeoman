var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('goatstack:component', function() {

	it('should have generated an the correct componentOne files', done => {
		return helpers.run(path.join(__dirname, '../generators/component'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-one',
				confirmsub: false,
				componentname: 'componentOne'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-one/components/component-one/component-one.component.ts',
					'client/modules/module-one/components/component-one/component-one.component.html',
					'client/modules/module-one/components/component-one/component-one.component.scss',
				]);

				done();
			});
	});

	it('should have generated the correct file content', () => {
		assert.fileContent('../temp/client/modules/module-one/components/component-one/component-one.component.ts', /ComponentOneComponent/);		
		assert.fileContent('../temp/client/modules/module-one/components/component-one/component-one.component.ts', /component-one.component\.css/);		
		assert.fileContent('../temp/client/modules/module-one/components/component-one/component-one.component.ts', /component-one.component\.html/);		
		assert.fileContent('../temp/client/modules/module-one/components/component-one/component-one.component.ts', /selector: 'component-one'/);

		assert.fileContent('../temp/client/modules/module-one/components/component-one/component-one.component.html', /class="component-one"/);

		assert.fileContent('../temp/client/modules/module-one/components/component-one/component-one.component.scss', /\.component-one/);
	});

	it('should have generated an the correct componentTwo files', done => {
		return helpers.run(path.join(__dirname, '../generators/component'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-two',
				confirmsub: false,
				componentname: 'componentTwo'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-two/components/component-two/component-two.component.ts',
					'client/modules/module-two/components/component-two/component-two.component.html',
					'client/modules/module-two/components/component-two/component-two.component.scss',
				]);

				done();
			});
	});

	it('should have generated the correct file content', () => {
		assert.fileContent('../temp/client/modules/module-two/components/component-two/component-two.component.ts', /ComponentTwoComponent/);		
		assert.fileContent('../temp/client/modules/module-two/components/component-two/component-two.component.ts', /component-two.component\.css/);		
		assert.fileContent('../temp/client/modules/module-two/components/component-two/component-two.component.ts', /component-two.component\.html/);		
		assert.fileContent('../temp/client/modules/module-two/components/component-two/component-two.component.ts', /selector: 'component-two'/);

		assert.fileContent('../temp/client/modules/module-two/components/component-two/component-two.component.html', /class="component-two"/);

		assert.fileContent('../temp/client/modules/module-two/components/component-two/component-two.component.scss', /\.component-two/);
	});

	it('should have generated an the correct componentTwo files', done => {
		return helpers.run(path.join(__dirname, '../generators/component'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-three',
				confirmsub: true,
				submodulename: 'subtestmodulethree',
				componentname: 'componentThree'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-three/subtestmodulethree/components/component-three/component-three.component.ts',
					'client/modules/module-three/subtestmodulethree/components/component-three/component-three.component.html',
					'client/modules/module-three/subtestmodulethree/components/component-three/component-three.component.scss',
				]);

				done();
			});
	});

	it('should have generated the correct file content', () => {
		assert.fileContent('../temp/client/modules/module-three/subtestmodulethree/components/component-three/component-three.component.ts', /ComponentThreeComponent/);		
		assert.fileContent('../temp/client/modules/module-three/subtestmodulethree/components/component-three/component-three.component.ts', /component-three.component\.css/);		
		assert.fileContent('../temp/client/modules/module-three/subtestmodulethree/components/component-three/component-three.component.ts', /component-three.component\.html/);		
		assert.fileContent('../temp/client/modules/module-three/subtestmodulethree/components/component-three/component-three.component.ts', /selector: 'component-three'/);

		assert.fileContent('../temp/client/modules/module-three/subtestmodulethree/components/component-three/component-three.component.html', /class="component-three"/);

		assert.fileContent('../temp/client/modules/module-three/subtestmodulethree/components/component-three/component-three.component.scss', /\.component-three/);
	});

	it('should have generated an the correct componentFour files', done => {
		return helpers.run(path.join(__dirname, '../generators/component'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				modulename: 'module-four',
				confirmsub: true,
				submodulename: 'subtestmodulefour',
				componentname: 'componentFour'
			})
			.on('end', () => {

				assert.file([
					'client/modules/module-four/subtestmodulefour/components/component-four/component-four.component.ts',
					'client/modules/module-four/subtestmodulefour/components/component-four/component-four.component.html',
					'client/modules/module-four/subtestmodulefour/components/component-four/component-four.component.scss',
				]);

				done();
			});
	});

	it('should have generated the correct file content', () => {
		assert.fileContent('../temp/client/modules/module-four/subtestmodulefour/components/component-four/component-four.component.ts', /ComponentFourComponent/);		
		assert.fileContent('../temp/client/modules/module-four/subtestmodulefour/components/component-four/component-four.component.ts', /component-four.component\.css/);		
		assert.fileContent('../temp/client/modules/module-four/subtestmodulefour/components/component-four/component-four.component.ts', /component-four.component\.html/);		
		assert.fileContent('../temp/client/modules/module-four/subtestmodulefour/components/component-four/component-four.component.ts', /selector: 'component-four'/);

		assert.fileContent('../temp/client/modules/module-four/subtestmodulefour/components/component-four/component-four.component.html', /class="component-four"/);

		assert.fileContent('../temp/client/modules/module-four/subtestmodulefour/components/component-four/component-four.component.scss', /\.component-four/);
	});

});
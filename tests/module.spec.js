var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('goatstack:module', function() {

	it('should generate the moduleOne files', done => {
		return helpers.run(path.join(__dirname, '../generators/module'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({ modulename: 'moduleOne'	})
			.on('end', () => {

				assert.file([
					'client/modules/module-one/module-one-routing.module.ts',
					'client/modules/module-one/module-one.module.ts',
					'client/modules/module-one/module-one.component.ts',
					'client/modules/module-one/module-one.component.html',
					'client/modules/module-one/module-one.component.scss',
				]);

				done();
			});
	});

	it('should generate the moduleTwo files', done => {
		return helpers.run(path.join(__dirname, '../generators/module'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({ modulename: 'moduleTwo' })
			.on('end', () => {

				assert.file([
					'client/modules/module-two/module-two-routing.module.ts',
					'client/modules/module-two/module-two.module.ts',
					'client/modules/module-two/module-two.component.ts',
					'client/modules/module-two/module-two.component.html',
					'client/modules/module-two/module-two.component.scss',
				]);

				done();
			});
	});

	it('should generate the moduleThree files', done => {
		return helpers.run(path.join(__dirname, '../generators/module'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({ modulename: 'moduleThree' })
			.on('end', () => {

				assert.file([
					'client/modules/module-three/module-three-routing.module.ts',
					'client/modules/module-three/module-three.module.ts',
					'client/modules/module-three/module-three.component.ts',
					'client/modules/module-three/module-three.component.html',
					'client/modules/module-three/module-three.component.scss',
				]);

				done();
			});
	});

	it('should generate the moduleFour files', done => {
		return helpers.run(path.join(__dirname, '../generators/module'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({ modulename: 'moduleFour' })
			.on('end', () => {

				assert.file([
					'client/modules/module-four/module-four-routing.module.ts',
					'client/modules/module-four/module-four.module.ts',
					'client/modules/module-four/module-four.component.ts',
					'client/modules/module-four/module-four.component.html',
					'client/modules/module-four/module-four.component.scss',
				]);

				done();
			});
	});

	it('should have generated moduleOne with the correct content', () => {
		assert.fileContent('../temp/client/modules/module-one/module-one.module.ts', /import { ModuleOneRoutingModule }            from '\.\/module-one-routing\.module'/);
		assert.fileContent('../temp/client/modules/module-one/module-one.module.ts', /import { ModuleOneComponent }                from '\.\/module-one\.component'/);

		assert.fileContent('../temp/client/modules/module-one/module-one.component.ts', /ModuleOneComponent/);		
		assert.fileContent('../temp/client/modules/module-one/module-one.component.ts', /module-one.component\.css/);		
		assert.fileContent('../temp/client/modules/module-one/module-one.component.ts', /module-one.component\.html/);		
		assert.fileContent('../temp/client/modules/module-one/module-one.component.ts', /selector: 'module-one'/);

		assert.fileContent('../temp/client/modules/module-one/module-one-routing.module.ts', /ModuleOneRoutingModule/);	
		assert.fileContent('../temp/client/modules/module-one/module-one-routing.module.ts', /import { ModuleOneComponent }    from '\.\/module-one\.component'/);	
	
		assert.fileContent('../temp/client/modules/module-one/module-one.component.html', /class="module-one"/);

		assert.fileContent('../temp/client/modules/module-one/module-one.component.scss', /\.module-one/);

	});

	it('should have generated moduleTwo with the correct content', () => {
		assert.fileContent('../temp/client/modules/module-two/module-two.module.ts', /import { ModuleTwoRoutingModule }            from '\.\/module-two-routing\.module'/);
		assert.fileContent('../temp/client/modules/module-two/module-two.module.ts', /import { ModuleTwoComponent }                from '\.\/module-two\.component'/);

		assert.fileContent('../temp/client/modules/module-two/module-two.component.ts', /ModuleTwoComponent/);		
		assert.fileContent('../temp/client/modules/module-two/module-two.component.ts', /module-two.component\.css/);		
		assert.fileContent('../temp/client/modules/module-two/module-two.component.ts', /module-two.component\.html/);		
		assert.fileContent('../temp/client/modules/module-two/module-two.component.ts', /selector: 'module-two'/);

		assert.fileContent('../temp/client/modules/module-two/module-two-routing.module.ts', /ModuleTwoRoutingModule/);	
		assert.fileContent('../temp/client/modules/module-two/module-two-routing.module.ts', /import { ModuleTwoComponent }    from '\.\/module-two\.component'/);	
	
		assert.fileContent('../temp/client/modules/module-two/module-two.component.html', /class="module-two"/);

		assert.fileContent('../temp/client/modules/module-two/module-two.component.scss', /\.module-two/);

	});

	it('should have generated moduleThree with the correct content', () => {
		assert.fileContent('../temp/client/modules/module-three/module-three.module.ts', /import { ModuleThreeRoutingModule }            from '\.\/module-three-routing\.module'/);
		assert.fileContent('../temp/client/modules/module-three/module-three.module.ts', /import { ModuleThreeComponent }                from '\.\/module-three\.component'/);

		assert.fileContent('../temp/client/modules/module-three/module-three.component.ts', /ModuleThreeComponent/);		
		assert.fileContent('../temp/client/modules/module-three/module-three.component.ts', /module-three.component\.css/);		
		assert.fileContent('../temp/client/modules/module-three/module-three.component.ts', /module-three.component\.html/);		
		assert.fileContent('../temp/client/modules/module-three/module-three.component.ts', /selector: 'module-three'/);

		assert.fileContent('../temp/client/modules/module-three/module-three-routing.module.ts', /ModuleThreeRoutingModule/);	
		assert.fileContent('../temp/client/modules/module-three/module-three-routing.module.ts', /import { ModuleThreeComponent }    from '\.\/module-three\.component'/);	
	
		assert.fileContent('../temp/client/modules/module-three/module-three.component.html', /class="module-three"/);

		assert.fileContent('../temp/client/modules/module-three/module-three.component.scss', /\.module-three/);

	});

	it('should have generated moduleFour with the correct content', () => {
		assert.fileContent('../temp/client/modules/module-four/module-four.module.ts', /import { ModuleFourRoutingModule }            from '\.\/module-four-routing\.module'/);
		assert.fileContent('../temp/client/modules/module-four/module-four.module.ts', /import { ModuleFourComponent }                from '\.\/module-four\.component'/);

		assert.fileContent('../temp/client/modules/module-four/module-four.component.ts', /ModuleFourComponent/);		
		assert.fileContent('../temp/client/modules/module-four/module-four.component.ts', /module-four.component\.css/);		
		assert.fileContent('../temp/client/modules/module-four/module-four.component.ts', /module-four.component\.html/);		
		assert.fileContent('../temp/client/modules/module-four/module-four.component.ts', /selector: 'module-four'/);

		assert.fileContent('../temp/client/modules/module-four/module-four-routing.module.ts', /ModuleFourRoutingModule/);	
		assert.fileContent('../temp/client/modules/module-four/module-four-routing.module.ts', /import { ModuleFourComponent }    from '\.\/module-four\.component'/);	
	
		assert.fileContent('../temp/client/modules/module-four/module-four.component.html', /class="module-four"/);

		assert.fileContent('../temp/client/modules/module-four/module-four.component.scss', /\.module-four/);

	});
});
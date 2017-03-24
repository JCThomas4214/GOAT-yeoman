var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('goatstack:store-item', function() {

	it('should have generated the correct itemOne store-item files', done => {
		return helpers.run(path.join(__dirname, '../generators/store-item'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				storename: 'itemOne',
				storetype: 'Map'
			})
			.on('end', () => {

				assert.file([
					'client/redux/store/item-one/item-one.reducer.ts',
					'client/redux/store/item-one/item-one.initial-state.ts',
					'client/redux/store/item-one/item-one.transformers.ts',
					'client/redux/store/item-one/item-one.types.ts',
					'client/redux/store/item-one/index.ts',
					'client/redux/store/item-one/item-one.reducer.spec.ts',
				]);

				done();
			});
	});

	it('should augmented the store.ts file', () => {
		assert.fileContent('client/redux/store/index.ts', /import \* as itemOne from \'\.\/item-one\/index\'/);
		assert.fileContent('client/redux/store/index.ts', /itemOne\?: itemOne\.IItemOne/);
		assert.fileContent('client/redux/store/index.ts', /itemOne: itemOne\.itemOneReducer/);
	});

	it('should have generated the correct itemOne actions files', () => {
		assert.file([
			'client/redux/actions/item-one/item-one.actions.ts',
			'client/redux/actions/item-one/item-one.actions.spec.ts',
		]);
	});

	it('should have generated the itemOne files with the correct content', () => {
		assert.fileContent('client/redux/store/item-one/item-one.types.ts', /import { Map } from 'immutable'/);
		assert.fileContent('client/redux/store/item-one/item-one.types.ts', /Map<IItemOneItem, IItemOneItem>/);

		assert.fileContent('client/redux/store/item-one/item-one.transformers.ts', /import { Map } from 'immutable'/);		
		assert.fileContent('client/redux/store/item-one/item-one.transformers.ts', /Map<IItemOneItem, IItemOneItem>\(plain \? plain : {}\)/);		

		assert.fileContent('client/redux/actions/item-one/item-one.actions.ts', /ItemOneActions/);
	});

	it('should have generated the correct itemTwo store-item files', done => {
		return helpers.run(path.join(__dirname, '../generators/store-item'))
			.cd(path.join(__dirname, '../temp'))
			.withPrompts({
				storename: 'itemTwo',
				storetype: 'List'
			})
			.on('end', () => {

				assert.file([
					'client/redux/store/item-two/item-two.reducer.ts',
					'client/redux/store/item-two/item-two.initial-state.ts',
					'client/redux/store/item-two/item-two.transformers.ts',
					'client/redux/store/item-two/item-two.types.ts',
					'client/redux/store/item-two/index.ts',
					'client/redux/store/item-two/item-two.reducer.spec.ts',
				]);

				done();
			});
	});

	it('should augmented the store.ts file', () => {
		assert.fileContent('client/redux/store/index.ts', /import \* as itemTwo from \'\.\/item-two\/index\'/);
		assert.fileContent('client/redux/store/index.ts', /itemTwo\?: itemTwo\.IItemTwo/);
		assert.fileContent('client/redux/store/index.ts', /itemTwo: itemTwo\.itemTwoReducer/);
	});

	it('should have generated the correct itemTwo actions files', () => {
		assert.file([
			'client/redux/actions/item-two/item-two.actions.ts',
			'client/redux/actions/item-two/item-two.actions.spec.ts',
		]);
	});

	it('should have generated the itemTwo files with the correct content', () => {
		assert.fileContent('client/redux/store/item-two/item-two.types.ts', /import { List, Record } from 'immutable'/);
		assert.fileContent('client/redux/store/item-two/item-two.types.ts', /List<IItemTwoItem>/);

		assert.fileContent('client/redux/store/item-two/item-two.transformers.ts', /import { List, Map } from 'immutable'/);		
		assert.fileContent('client/redux/store/item-two/item-two.transformers.ts', /List<IItemTwoItem>\(plain \? plain.map\(ItemTwoRecord\) : \[\]\)/);		

		assert.fileContent('client/redux/actions/item-two/item-two.actions.ts', /ItemTwoActions/);
	});

});
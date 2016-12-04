import { List } from 'immutable';
import { <%= namelower %>Reducer } from './<%= fname %>.reducer';
import { INITIAL_STATE } from './<%= fname %>.initial-state';
import { <%= storename %>Actions } from '../../actions/<%= fname %>/<%= fname %>.actions';

const testList = [{
	example_attr: 'this'
}, {
	example_attr: 'is'
}, {
	example_attr: 'a'
}, {
	example_attr: 'test'
}, {
	example_attr: 'list'
}];

describe('<%= storename %> Reducer', () => {
  let initialState = INITIAL_STATE;

  beforeEach(() => {
    initialState = <%= namelower %>Reducer(undefined, { type: 'TEST_INIT' });
  });

  it('should have an immutable initial state', () => {
    expect(List.isList(initialState)).toBe(true);
  });

  it('should init the list on EXAMPLE_STATE_INIT', () => {
  	const previousState = initialState;
  	const nextState = <%= namelower %>Reducer(previousState, {
  		type: <%= storename %>Actions.EXAMPLE_STATE_INIT,
  		payload: testList
  	});

  	expect(previousState.size).toBe(0);

  	expect(nextState.size).toBe(5);
  });

  it('should insert at index on EXAMPLE_STATE_INSERT', () => {
  	const previousState = <%= namelower %>Reducer(initialState, {
  		type: <%= storename %>Actions.EXAMPLE_STATE_INIT,
  		payload: testList
  	});
  	const nextState = <%= namelower %>Reducer(previousState, {
  		type: <%= storename %>Actions.EXAMPLE_STATE_INSERT,
  		payload: {
  			index: 3,
			item: {
				example_attr: 'awesome'
			}
  		}});

  	expect(previousState.getIn([0, 'example_attr'])).toBe('this');
  	expect(previousState.getIn([1, 'example_attr'])).toBe('is');
  	expect(previousState.getIn([2, 'example_attr'])).toBe('a');
  	expect(previousState.getIn([3, 'example_attr'])).toBe('test');
  	expect(previousState.getIn([4, 'example_attr'])).toBe('list');

  	expect(nextState.getIn([0, 'example_attr'])).toBe('this');
  	expect(nextState.getIn([1, 'example_attr'])).toBe('is');
  	expect(nextState.getIn([2, 'example_attr'])).toBe('a');
  	expect(nextState.getIn([3, 'example_attr'])).toBe('awesome');
  	expect(nextState.getIn([4, 'example_attr'])).toBe('test');
  	expect(nextState.getIn([5, 'example_attr'])).toBe('list');
  });

  it('should erase at index on EXAMPLE_STATE_ERASE', () => {
  	const previousState = <%= namelower %>Reducer(initialState, {
  		type: <%= storename %>Actions.EXAMPLE_STATE_INIT,
  		payload: testList
  	});
  	const nextState = <%= namelower %>Reducer(previousState, {
  		type: <%= storename %>Actions.EXAMPLE_STATE_ERASE,
  		payload: 3
  	});

  	expect(previousState.getIn([0, 'example_attr'])).toBe('this');
  	expect(previousState.getIn([1, 'example_attr'])).toBe('is');
  	expect(previousState.getIn([2, 'example_attr'])).toBe('a');
  	expect(previousState.getIn([3, 'example_attr'])).toBe('test');
  	expect(previousState.getIn([4, 'example_attr'])).toBe('list');

  	expect(nextState.getIn([0, 'example_attr'])).toBe('this');
  	expect(nextState.getIn([1, 'example_attr'])).toBe('is');
  	expect(nextState.getIn([2, 'example_attr'])).toBe('a');
  	expect(nextState.getIn([3, 'example_attr'])).toBe('list');
  });
});

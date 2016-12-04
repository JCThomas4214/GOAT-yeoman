import { Map } from 'immutable';
import { <%= namelower %>Reducer } from './<%= fname %>.reducer';
import { INITIAL_STATE } from './<%= fname %>.initial-state';
import { <%= storename %>Actions } from '../../actions/<%= fname %>/<%= fname %>.actions';

describe('<%= storename %> Reducer', () => {
  let initialState = INITIAL_STATE;

  beforeEach(() => {
    initialState = <%= namelower %>Reducer(undefined, { type: 'TEST_INIT' });
  });

  it('should have an immutable initial state', () => {
    expect(Map.isMap(initialState)).toBe(true);
  });

  it('should set the example_attr on EXAMPLE_STATE_SET', () => {
  	const previousState = initialState;
  	const nextState = <%= namelower %>Reducer(previousState, { 
  		type: <%= storename %>Actions.EXAMPLE_STATE_SET,
  		payload: 'this is an example test set'
  	});

  	expect(previousState.getIn(['example_attr'])).toBe('');

  	expect(nextState.getIn(['example_attr'])).toBe('this is an example test set');
  });

  it('should erase the example_attr on EXAMPLE_STATE_ERASE', () => {
  	const previousState = <%= namelower %>Reducer(initialState, { 
  		type: <%= storename %>Actions.EXAMPLE_STATE_SET,
  		payload: 'this is an example test set'
  	});
  	const nextState = <%= namelower %>Reducer(previousState, { type: <%= storename %>Actions.EXAMPLE_STATE_ERASE });

  	expect(previousState.getIn(['example_attr'])).toBe('this is an example test set');

  	expect(nextState.getIn(['example_attr'])).toBe('');
  });
});

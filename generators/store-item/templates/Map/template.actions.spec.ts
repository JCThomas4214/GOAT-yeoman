import { NgRedux } from '@angular-redux/store';
import { <%= actionsname %>Actions } from './<%= fname %>.actions';

class MockRedux extends NgRedux<any> {
  constructor() {
    super(null);
  }
  dispatch: () => {};
}

describe('<%= actionsname %> Actions Creator', () => {
  let actions: <%= actionsname %>Actions;
  let mockRedux: NgRedux<any>;

  beforeEach(() => {
    mockRedux = new MockRedux();
    actions = new <%= actionsname %>Actions(mockRedux);
  });

  // e.g. test, use as a reference
  
  it('should dispatch EXAMPLE_STATE_SET action', () => {
    const expectedAction = {
      type: <%= actionsname %>Actions.EXAMPLE_STATE_SET,
      payload: 'this is an example test set'
    };

    spyOn(mockRedux, 'dispatch');
    actions.exampleSet('this is an example test set');

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch EXAMPLE_STATE_ERASE action', () => {
    const expectedAction = {
      type: <%= actionsname %>Actions.EXAMPLE_STATE_ERASE
    };

    spyOn(mockRedux, 'dispatch');
    actions.exampleErase();

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
import { NgRedux } from 'ng2-redux';
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
  
  // it('should dispatch EXAMPLE_STATE action', () => {
  //   const expectedAction = {
  //     type: <%= actionsname %>Actions.EXAMPLE_STATE
  //   };

  //   spyOn(mockRedux, 'dispatch');
  //   actions.exampleFunction();

  //   expect(mockRedux.dispatch).toHaveBeenCalled();
  //   expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  // });
});
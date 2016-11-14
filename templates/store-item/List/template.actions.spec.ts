import { NgRedux } from 'ng2-redux';
import { <%= actionsname %>Actions } from './<%= namelower %>.actions';

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
  
  it('should dispatch EXAMPLE_STATE_INIT action', () => {
    const expectedAction = {
      type: <%= actionsname %>Actions.EXAMPLE_STATE_INIT,
      payload: testList
    };

    spyOn(mockRedux, 'dispatch');
    actions.exampleInit(testList);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch EXAMPLE_STATE_INSERT action', () => {
    const expectedAction = {
      type: <%= actionsname %>Actions.EXAMPLE_STATE_INSERT,
      payload: {
        index: 3,
        item: {
          example_attr: 'awesome'
        }
      }
    };

    spyOn(mockRedux, 'dispatch');
    actions.exampleInsert(3, 'awesome');

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch EXAMPLE_STATE_ERASE action', () => {
    const expectedAction = {
      type: <%= actionsname %>Actions.EXAMPLE_STATE_ERASE,
      payload: 3
    };

    spyOn(mockRedux, 'dispatch');
    actions.exampleEraseAt(3);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
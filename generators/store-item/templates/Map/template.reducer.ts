import { <%= storename %>Actions } from '../../actions/<%= fname %>/<%= fname %>.actions';
import { reimmutify<%= storename %> } from './<%= fname %>.transformers';
import { I<%= storename %> } from './<%= fname %>.types';
import { INITIAL_STATE } from './<%= fname %>.initial-state';

// Define the reducer that will initiate state changes for <%= namelower %>
export function <%= namelower %>Reducer(state: I<%= storename %> = INITIAL_STATE, action: any) {
  // will decide what state change is necessary based off the type
  switch (action.type) {
    case <%= storename %>Actions.EXAMPLE_STATE_SET:
      return state
      	.updateIn(['example_attr'], val => action.payload);
    case <%= storename %>Actions.EXAMPLE_STATE_ERASE:
      return state
      	.updateIn(['example_attr'], val => '');
    default:
      return state;
  }
}

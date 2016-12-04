import { Map } from 'immutable';
import { I<%= storename %>, I<%= storename %>Item } from './<%= fname %>.types';

// functions to change the state of the data
// either immutable -> mutable or mutable -> immutable
export function deimmutify<%= storename %>(state: I<%= storename %>): Object {
  return state.toJS();
}

export function reimmutify<%= storename %>(plain): I<%= storename %> {
  return Map<I<%= storename %>Item, I<%= storename %>Item>(plain ? plain : {});
}
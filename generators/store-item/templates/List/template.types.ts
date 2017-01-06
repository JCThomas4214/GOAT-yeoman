import { List, Record } from 'immutable';

export interface I<%= storename %>Item {
	example_attr: string;
}

// Export the type so the reducer and store will understand
export type I<%= storename %> = List<I<%= storename %>Item>;

// List object will need a template record to 
// map when converting a js array
export const <%= storename %>Record = Record({
  // The record should corespond with the interface for this object
  example_attr: ''
});
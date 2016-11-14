import { Map } from 'immutable';

// Define an interface of the object that will be saved
export interface I<%= storename %>Item {
  // The object stucture should be written
  example_attr: string;
}

// Export the type so the reducer and store will understand
export type I<%= storename %> = Map<I<%= storename %>Item, I<%= storename %>Item>;
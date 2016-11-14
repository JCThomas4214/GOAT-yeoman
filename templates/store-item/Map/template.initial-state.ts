import { reimmutify<%= storename %> } from './<%= namelower %>.transformers';

// Define the initial state of <%= namelower %> object
export const INITIAL_STATE = reimmutify<%= storename %>({
  // Based off the interface, specify the initial state of the object
  example_attr: ''
});

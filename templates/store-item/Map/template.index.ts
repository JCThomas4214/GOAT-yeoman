import { <%= namelower %>Reducer } from './<%= fname %>.reducer';
import { I<%= storename %> } from './<%= fname %>.types';
import { deimmutify<%= storename %>, reimmutify<%= storename %> } from './<%= fname %>.transformers';

// This file is for convienience so only one import is required
export {
  <%= namelower %>Reducer,
  I<%= storename %>,
  deimmutify<%= storename %>,
  reimmutify<%= storename %>
};
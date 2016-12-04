import { ErrorHandlerActions } from '../../actions/error/error-handler.actions';
import { reimmutifyError } from './error-handler.transformers';
import { IError } from './error-handler.types';

import { INITIAL_STATE } from './error-handler.initial-state';

// define the reducer for error attribute in store 
export function errorHandlerReducer(state: IError = INITIAL_STATE, action: any) {
  // Depending on the incoming state 'type' execute corresponding state change
  switch(action.type) {
    case ErrorHandlerActions.SHOW_ERROR:
      return state.updateIn(['message'], val => action.payload);
    case ErrorHandlerActions.HIDE_ERROR:
      return state.updateIn(['message'], val => '');
    default:
      return state;
  }
}

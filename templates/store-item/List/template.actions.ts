import { Injectable } from '@angular/core';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/index';


/////////////////////////////////////////////////////////////////////////
/* <%= actionsname %> Actions: used to call dispatches to change the <%= namelower %>
                     object in the store
  
    EXAMPLE_STATE       ->   	Example state to demonstrate the concept and dataflow
*/
/////////////////////////////////////////////////////////////////////////
@Injectable()
export class <%= actionsname %>Actions {

	// This is the template for a Redux Actions
	/*
		There are a few more things to do before this becomes active
		1. finish the funcitonality
		2. test functionality in the spec file
		3. import into component/module providers IMPORTANT!!
	*/

	//NOTE: You should not use http in a actions
	//		we distinguish actions and a service this way
	
	constructor(private ngRedux: NgRedux<IAppState>) { }

	// Put the states here; use as reference and delete
	static EXAMPLE_STATE_INIT: string = 'EXAMPLE_STATE_INIT';
	static EXAMPLE_STATE_INSERT: string = 'EXAMPLE_STATE_INSERT';
	static EXAMPLE_STATE_ERASE: string = 'EXAMPLE_STATE_ERASE';

	// This is your action function
	// use this for dispatching to your reducer
	// e.g. this.ngRedux.dispatch(this.action(<%= actionsname %>Actions.EXAMPLE_STATE))
	private action(type: string, payload?: any) {
		return payload ? { type: type, payload: payload	} : { type: type };
	}

	// continue functionality below...
	exampleInit(list: Array<any>): void {
		this.ngRedux.dispatch(this.action(<%= actionsname %>Actions.EXAMPLE_STATE_INIT, list));
	}	

	exampleInsert(index: number, ex: string): void {
		this.ngRedux.dispatch(this.action(<%= actionsname %>Actions.EXAMPLE_STATE_INSERT, {
			index: index,
			item: {
				example_attr: ex
			}
		}));
	}

	exampleEraseAt(index: number): void {
		this.ngRedux.dispatch(this.action(<%= actionsname %>Actions.EXAMPLE_STATE_ERASE, index));
	}

}

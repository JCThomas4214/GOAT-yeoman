import { Injectable } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/index';


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

	// Put the states here
	// e.g. static EXAMPLE_STATE: string = 'EXAMPLE_STATE'; 

	// This is your action function
	// use this for dispatching to your reducer
	// e.g. this.ngRedux.dispatch(this.action(<%= actionsname %>Actions.EXAMPLE_STATE))
	private action(type: string, payload?: any): Object {
		return payload ? { type: type, payload: payload } : { type: type };
	}

	// continue functionality below...

}
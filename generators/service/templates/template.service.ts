import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class <%= servicename %>Service {
	
	/*
		User services primarily for server interaction with http.
		Keep it separate from actions to make testing simpler.
		- Using a mockService when testing the actions 
	*/

  /*
    Steps after creation
    - remember to do error handling inside of the subscription
    - connect the service to the appropriate actions for redux
  */

	// Private variables that only this service can use
  private <%= namelower %>Url = 'api/<%= namelower %>s';
  
  // Public variables to share
  public results: string[];

  // Inject HttpClient into the service.
	constructor(private http: HttpClient) {}

  // example get query, import <%= servicename %>Service into another file and then subscribe to it as follows:
  // get<%= servicename %>().subscribe(
  //    data => {
  //      // Read the result field from the JSON response.
  //      this.results = data['results'];
  //    },
  //    (err: HandleErrorResponse) => {log however you see fit to handle your errors}
  //  );
  get<%= servicename %>(): Observable<any> {
    return this.http.get(this.<%= namelower %>Url + '/');
      // use dot chains to alter the observable however you wish
      // before subscribing to it in either a component, action, or elsewhere
  }
}
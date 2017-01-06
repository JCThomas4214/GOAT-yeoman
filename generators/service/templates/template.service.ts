import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
    - complete the conditional body.errors error response from the server
    - connect the service to the appropriate actions for redux
  */

	// Private variables that only this service can use
	private <%= namelower %>Url = 'api/<%= namelower %>s';

	constructor(private http: Http) {}

	private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const body = JSON.parse(error._body);
    let errMsg;

    if (body.errors) {
      // Parse out the model error message from backend	
      // e.g. errMsg = body.errors.userName ? body.errors.userName : body.errors.email;
    } else {
      errMsg = body ? body :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    }

    return Observable.throw({
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      message: errMsg.message
    });
  }

  // example funciton
  get<%= servicename %>(): Observable<any> {
    return this.http.get(this.<%= namelower %>Url + '/')
      .map(res => res.json())
      .catch(this.handleError);
  }
}
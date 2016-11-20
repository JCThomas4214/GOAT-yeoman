import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: '<%= namelower %>'
})
export class <%= pipename %>Pipe implements PipeTransform {

	/*
		Steps after creation
		- finish the transform
		- connect the pipe the the correct scope (component, app.module {global})
	*/

	transform(value: any, args: any[]): any {
		if(value) {
			
		} else {
			return '';
		}
	}
}
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: '<%= fname %>',
	templateUrl: '<%= fname %>.component.html',
	styleUrls: ['<%= fname %>.component.css'],
	// changeDetection: ChangeDetectionStrategy.OnPush  
})

// Change detection default will wastefully check if each component in the component tree has changed. 
// It is better to inform the change detection service manually

export class <%= componentname %>Component implements OnInit {
	constructor(		
		// private ref: ChangeDetectorRef
	) {}

	ngOnInit() {
		// This is where contructor code goes
	}
}
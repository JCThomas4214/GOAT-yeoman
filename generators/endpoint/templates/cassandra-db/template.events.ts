/**
 * <%= modelname %> model events
 */
import <%= modelname %>Model from './<%= fname %>.model';

let EventEmitter = require('events').EventEmitter;
let <%= modelname %>Events = new EventEmitter();

// Set max event listeners (0 == unlimited)
<%= modelname %>Events.setMaxListeners(0);

<%= modelname %>Model.post('create', function(next, err) {

	/* 
	 "This" is an Entity object with the properties used to query the database in the first place.
	 If you would like the row that was just inserted you will need to use cassmask to query 
	 your table for the most recently inserted row.
	 This is highly dependant on how you're sorting inside your partitions!

	 <%= modelname %>.findOne({part: '<%= modelname %>'}, {orderBy: 'name asc'}).seam().subscribe(
	 	entity => {
	 		CloudEvents.emit('save:' + entity.id, entity);
	 		CloudEvents.emit('save', entity);

	 		next(entity);
	 	}, error => err(error));
	*/

	<%= modelname %>Events.emit('save', this);

	next(this);

 });

export default <%= modelname %>Events;

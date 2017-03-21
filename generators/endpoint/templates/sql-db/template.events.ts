/**
 * <%= modelname %> model events
 */
import <%= modelname %> from './<%= fname %>.model';

let EventEmitter = require('events').EventEmitter;
let <%= modelname %>Events = new EventEmitter();

// Set max event listeners (0 == unlimited)
<%= modelname %>Events.setMaxListeners(0);

<%= modelname %>.hook('afterCreate', (<%= namelower %>, options) =>{
    <%= modelname %>Events.emit('save', <%= namelower %>);
});

export default <%= modelname %>Events;

/**
 * <%= modelname %> model events
 */
import <%= modelname %> from './<%= fname %>.model';

let EventEmitter = require('events').EventEmitter;
let <%= modelname %>Events = new EventEmitter();

// Set max event listeners (0 == unlimited)
<%= modelname %>Events.setMaxListeners(0);

// // Model events
// let events = {
//   'save': 'save',
//   'remove': 'remove'
// };

// // Register the event emitter to the model events
// for (let e in events) {
//   let event = events[e];
//   <%= modelname %>.schema.post(e, emitEvent(event));
// }

// function emitEvent(event) {
//   return function(doc) {
//     <%= modelname %>Events.emit(event + ':' + doc._id, doc);
//     <%= modelname %>Events.emit(event, doc);
//   };
// }

export default <%= modelname %>Events;

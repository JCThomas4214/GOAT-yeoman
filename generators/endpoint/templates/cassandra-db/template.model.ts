import {cassandra, Schema, uuid, toTimeStamp, now} from 'cassmask';

let <%= modelname %> = new Schema('<%= modelname %>s', {
	created: {
	  type: cassandra.TIMESTAMP,
	  default: toTimeStamp(now())
	},
	name: cassandra.TEXT,
	info: cassandra.TEXT,
	keys: ['name', 'created']
});

export default <%= modelname %>;
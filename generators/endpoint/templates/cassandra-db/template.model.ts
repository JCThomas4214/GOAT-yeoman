import {cassandra, Schema, uuid, toTimeStamp, now} from 'cassmask';

let <%= modelname %> = new Schema('<%= modelname %>s', {
	part: { // used as the partition key to astabliah cluster sorting
	  Type: cassandra.TEXT,
	  Default: '<%= modelname %>'
	},
	created: {
	  Type: cassandra.TIMESTAMP,
	  Default: toTimeStamp(now())
	},
	name: cassandra.TEXT,
	info: cassandra.TEXT,
	keys: ['part', 'name', 'info']
});

export default <%= modelname %>;
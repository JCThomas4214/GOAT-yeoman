import * as cassmask from 'cassmask';
import {uuid, toTimeStamp, now} from 'cassmask';

interface I<%= modelname %>Schema extends cassmask.ISchema {
	part?: cassmask.TEXT;
	created?: cassmask.TIMESTAMP;
	name?: cassmask.TEXT;
	info?: cassmask.TEXT;
}

class <%= modelname %>Schema extends cassmask.Schema {
	part = { // used as the partition key to astabliah cluster sorting
	  type: cassmask.TEXT,
	  default: '<%= modelname %>'
	};
	created = {
	  type: cassmask.TIMESTAMP,
	  default: toTimeStamp(now())
	};
	name = cassmask.TEXT;
	info = cassmask.TEXT;
	keys = ['part', 'name', 'info'];

	constructor() {
		super();
	}
}

export default cassmask.model<I<%= modelname %>Schema>('<%= modelname %>', new <%= modelname %>Schema());
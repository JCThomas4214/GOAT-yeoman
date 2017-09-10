import { client } from '../../../cassandra-db';
import <%= modelname %>Stmts from './<%= fname %>.statements';
const TimeUuid = require('cassandra-driver').types.TimeUuid;

// Define Prepared Statments
const insertRow: string = <%= modelname %>Stmts.insertRow;
const allRows: string = <%= modelname %>Stmts.allRows;
const findRowByKey: string = <%= modelname %>Stmts.findRowByKey;
const updateRowByKey: string = <%= modelname %>Stmts.updateRowByKey;
const deleteRowByKey: string = <%= modelname %>Stmts.deleteRowByKey;

class <%= modelname %>Model {

	private queryOptions: object = { prepared: true };
	//////////
	// CRUD //
	//////////

	// Create
	insertRow(name: string, timeid?): Promise<any> {
		if(!timeid)
			timeid = TimeUuid.now();

		return client.execute(insertRow, [timeid, name], this.queryOptions);
	}

	// Read
	allRows(): Promise<any> {
		return client.execute(allRows, undefined, this.queryOptions);
	}

	findRowByKey(timeid: string): Promise<any> {
		return client.execute(findRowByKey, [timeid], this.queryOptions);
	}

	// Update
	updateRowByKey(name: string,  timeid: string): Promise<any> {
		return client.execute(updateRowByKey, [timeid, name], this.queryOptions);
	}

	// Delete
	deleteRowByKey(timeid: string): Promise<any> {
		return client.execute(deleteRowByKey, [timeid], this.queryOptions);
	}

}

export default new <%= modelname %>Model;
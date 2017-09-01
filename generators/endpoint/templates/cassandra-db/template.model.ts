import { client } from '../../../cassandra-db';
import <%= modelname %>Stmts from './<%= fname %>.statements';
const Uuid = require('cassandra-driver').types.Uuid;

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
	insertRow(name: string): Promise<any> {
		const id: string = String(Uuid.random());

		return client.execute(insertRow, [id, name, Date.now()], this.queryOptions);
	}

	// Read
	allRows(): Promise<any> {
		return client.execute(allRows, undefined, this.queryOptions);
	}

	findRowByKey(id: string): Promise<any> {
		return client.execute(findRowByKey, [id], this.queryOptions);
	}

	// Update
	updateRowByKey(name: string, id: string): Promise<any> {
		return client.execute(updateRowByKey, [name, id], this.queryOptions);
	}

	// Delete
	deleteRowByKey(id: string): Promise<any> {
		return client.execute(deleteRowByKey, [id], this.queryOptions);
	}

}

export default new <%= modelname %>Model;
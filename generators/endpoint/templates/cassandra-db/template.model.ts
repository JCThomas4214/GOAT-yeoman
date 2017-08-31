import { client } from '../../../cassandra-db';
import { truncate<%= modelname %>, insert<%= modelname %>, findById, all<%= modelname %>, update<%= modelname %>, delete<%= modelname %> } from './<%= fname %>.statements';
const Uuid = require('cassandra-driver').types.Uuid;

class <%= modelname %> {

	private queryOptions: object = { prepared: true };
	//////////
	// CRUD //
	//////////

	// Create
	insertRow(name: string): Promise<any> {
		const id: string = String(Uuid.random());

		return client.execute(insert<%= modelname %>, [id, name, Date.now()], this.queryOptions);
	}

	// Read
	allRows(): Promise<any> {
		return client.execute(all<%= modelname %>, undefined, this.queryOptions);
	}

	findById(id: string): Promise<any> {
		return client.execute(findById, [id], this.queryOptions);
	}

	// Update
	updateById(name: string, id: string): Promise<any> {
		return client.execute(update<%= modelname %>, [name, id], this.queryOptions);
	}

	// Delete
	deleteById(id: string): Promise<any> {
		return client.execute(delete<%= modelname %>, [id], this.queryOptions);
	}

}

export default new <%= modelname %>;
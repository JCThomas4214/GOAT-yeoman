import { mongooseConnect, mongooseDisconnect } from './mongo-db';
import { cassandraConnect, cassandraDisconnect } from './cassandra-db';
import { sequelizeConnect, sequelizeDisconnect } from './sql-db';

export function connect() {
  mongooseConnect();
  // cassandraConnect();
  // sequelizeConnect();
}

export function disconnect() {
  mongooseDisconnect();
  // cassandraDisconnect();
  // sequelizeDisconnect();
}

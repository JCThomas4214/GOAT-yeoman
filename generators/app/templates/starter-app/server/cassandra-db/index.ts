import {cassSeed} from './seed';
import { cassandra } from 'cassmask';

import config from '../../config';

// Initialize Express-Cassandra
export function cassandraConnect() {
  
  cassandra.connect(config.cassandra, function (err, result) {
    // seed cassandra
    if (config.seedDB) {
      cassSeed(process.env.NODE_ENV);
    }
  });

};
export function cassandraDisconnect() {
  // client.disconnect(function (err) {
  //   console.log(chalk.bold.yellow('Disconnected from CassandraDB.'));
  //   return;
  // });
};

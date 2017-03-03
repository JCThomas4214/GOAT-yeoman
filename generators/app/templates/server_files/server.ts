import * as express from 'express'
import * as chalk from 'chalk';
import * as fs from 'graceful-fs';
import * as http from 'http';
import * as https from 'https';
import config from '../config';

import socketInit from './socketio';
import expressInit from './express';
import {connect, disconnect} from './db-connect';


const isSecure = config.https_secure && (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV);

// Initialize express
let app = express();

function init(): any {

  connect();

  // Initialize http server
  let server: any = http.createServer(app);

  // If specified in the default assets, https will be used
  if (isSecure) {
    let credentials = {
      key: fs.readFileSync(config.key_loc, 'utf8'),
      cert: fs.readFileSync(config.cert_loc, 'utf8')
    };

    server = https.createServer(credentials, app);
  }

  // Initialize the socketio with the respective server
  let socketio = require('socket.io')(server, {
    // serveClient: process.env.NODE_ENV !== 'production',
    path: '/socket.io-client'
  });

  // Start configure the socketio
  socketInit(socketio);
  // Initialize express features
  expressInit(app);


  // Start the server on port / host
  server.listen(config.port, config.host, () => {
    let host = server.address().address;
    let port = server.address().port;

    if (process.env.NODE_ENV !== 'test') {
          console.log(
            chalk.bold.cyan(`\n\tEnvironment:\t\t\t ${ process.env.NODE_ENV || 'production' }\n`));

          <% if (mongo) %>console.log(
            chalk.bold.cyan(`\tMongoDB:`) +
            chalk.bold.gray(`\n\t - URI:\t\t\t\t ${ config.mongo.uri }\n`));<% } %>

          <% if (cassandra) %>console.log(
            chalk.bold.cyan(`\tCassandra:`) +
            chalk.bold.gray(`\n\t - ContactPoints:\t\t ${ config.cassandra.contactPoints.join(', ') }`) +
            chalk.bold.gray(`\n\t - Port:\t\t\t ${ config.cassandra.protocolOptions.port }`) +
            chalk.bold.gray(`\n\t - Consistency:\t\t\t ${ config.cassandra.queryOptions.consistency }\n`));

          <% if (postgres) %>console.log(
            chalk.bold.cyan(`\tPostgres:`) +
            chalk.bold.cyan(`\n\t - URI:\t\t postgres://${config.postgres.username}:${config.postgres.password}@localhost:5432/${config.postgres.database}`));<% } %>

          <% if (mysql) %>console.log(
            chalk.bold.cyan(`\tPostgres:`) +
            chalk.bold.cyan(`\n\t - URI:\t\t mysql://${config.mysql.username}:${config.mysql.password}@localhost:5432/${config.mysql.database}`));<% } %>

          <% if (mssql) %>console.log(
            chalk.bold.cyan(`\tPostgres:`) +
            chalk.bold.cyan(`\n\t - URI:\t\t mssql://${config.mssql.username}:${config.mssql.password}@localhost:5432/${config.mssql.database}`));<% } %>

          <% if (sqlite) %>console.log(
            chalk.bold.cyan(`\tPostgres:`) +
            chalk.bold.cyan(`\n\t - URI:\t\t sqlite://${config.sqlite.username}:${config.sqlite.password}@localhost:5432/${config.sqlite.database}`));<% } %>

          <% if (maria) %>console.log(
            chalk.bold.cyan(`\tPostgres:`) +
            chalk.bold.cyan(`\n\t - URI:\t\t maria://${config.maria.username}:${config.maria.password}@localhost:5432/${config.maria.database}`));<% } %>

          if (!process.env.NODE_ENV)
            console.log(
              chalk.bold.magenta(`\t${isSecure ? 'HTTPS': 'HTTP'} Server`) +
              chalk.bold.gray(`\n\tServer Address:\t\t\t ${isSecure ? 'https': 'http'}://localhost:${ port }\n`));
          else
            console.log(
              chalk.bold.magenta(`\tWebPack DevServer:`) +
              chalk.bold.gray(`\n\tServer Address:\t\t\t ${isSecure ? 'https': 'http'}://localhost:1701\n`));
        }
  });

  return app;
};

init();

// export express app for testing
export default app;

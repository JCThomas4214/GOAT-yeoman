import * as express from 'express'
import * as chalk from 'chalk';
import * as fs from 'graceful-fs';
import * as http from 'http';
import * as https from 'https';
import config from '../config';

import socketInit from './socketio';
import expressInit from './express';
<% if (mongo) { %>
import mongoSeed from './mongo-db/seed';<% } %><% if (cassandra) { %>
import cassandraSeed from './cassandra-db/seed';<% } %><% if (postgres) { %>
import postgresSeed from './postgres-db/seed';<% } %><% if (mysql) { %>
import mysqlSeed from './mysql-db/seed';<% } %><% if (mssql) { %>
import mssqlSeed from './mssql-db/seed';<% } %><% if (sqlite) { %>
import sqliteSeed from './sqlite-db/seed';<% } %><% if (maria) { %>
import mariaSeed from './maria-db/seed';<% } %>
import {connect, disconnect} from './db-connect';

const isSecure = config.https_secure && (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV);

// Initialize express
let app = express();

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

connect().subscribe(
  x => {},
  err => console.log(err),
  () => {
    expressInit(app);
    socketInit(socketio);
    
    if (config.seedDB) {
      <% if (mongo) { %>mongoSeed(process.env.NODE_ENV);<% } %><% if (cassandra) { %>
      cassandraSeed(process.env.NODE_ENV);<% } %><% if (postgres) { %>
      postgresSeed(process.env.NODE_ENV);<% } %><% if (mysql) { %>
      mysqlSeed(process.env.NODE_ENV);<% } %><% if (mssql) { %>
      mssqlSeed(process.env.NODE_ENV);<% } %><% if (sqlite) { %>
      sqliteSeed(process.env.NODE_ENV);<% } %><% if (maria) { %>
      mariaSeed(process.env.NODE_ENV);<% } %>
    }

    // Start the server on port / host
    server.listen(config.port, config.host, () => {
        let host = server.address().address;
        let port = server.address().port;

        if (process.env.NODE_ENV !== 'test') {
              console.log(
                chalk.bold.cyan(`\n\tEnvironment:\t\t\t ${ process.env.NODE_ENV || 'production' }\n`));<% if (mongo) { %>

              console.log(
                chalk.bold.cyan(`\tMongoDB:`) +
                chalk.bold.gray(`\n\t - URI:\t\t\t\t ${ config.mongo.uri }\n`));<% } %><% if (cassandra) { %>

              console.log(
                chalk.bold.cyan(`\tCassandra:`) +
                chalk.bold.gray(`\n\t - ContactPoints:\t\t ${ config.cassandra.contactPoints.join(', ') }`) +
                chalk.bold.gray(`\n\t - Port:\t\t\t ${ config.cassandra.protocolOptions.port }`) +
                chalk.bold.gray(`\n\t - Consistency:\t\t\t ${ config.cassandra.queryOptions.consistency }\n`));<% } %><% if (postgres) { %>

              console.log(
                chalk.bold.cyan(`\tPostgres:`) +
                chalk.bold.cyan(`\n\t - URI:\t\t\t\t postgres://${config.postgres.username}:${config.postgres.password}@localhost:5432/${config.postgres.database}\n`));<% } %><% if (mysql) { %>
              
              console.log(
                chalk.bold.cyan(`\tMySQL:`) +
                chalk.bold.cyan(`\n\t - URI:\t\t\t\t mysql://${config.mysql.username}:${config.mysql.password}@localhost:5432/${config.mysql.database}\n`));<% } %><% if (mssql) { %>
              
              console.log(
                chalk.bold.cyan(`\tMSSQL:`) +
                chalk.bold.cyan(`\n\t - URI:\t\t\t\t mssql://${config.mssql.username}:${config.mssql.password}@localhost:5432/${config.mssql.database}\n`));<% } %><% if (sqlite) { %>
              
              console.log(
                chalk.bold.cyan(`\tSQLite:`) +
                chalk.bold.cyan(`\n\t - URI:\t\t\t\t sqlite://${config.sqlite.username}:${config.sqlite.password}@localhost:5432/${config.sqlite.database}\n`));<% } %><% if (maria) { %>
              
              console.log(
                chalk.bold.cyan(`\tMaria:`) +
                chalk.bold.cyan(`\n\t - URI:\t\t\t\t maria://${config.maria.username}:${config.maria.password}@localhost:5432/${config.maria.database}\n`));<% } %>

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
  });

// export express app for testing
export default app;
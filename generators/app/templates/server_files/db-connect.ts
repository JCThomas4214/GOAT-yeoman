<% if (mongo) { %>import { mongoConnect, mongoDisconnect } from './mongo-db';<% } %><% if (cassandra) { %>
import { cassandraConnect, cassandraDisconnect } from './cassandra-db';<% } %><% if (postgres) { %>
import { postgresConnect, postgresDisconnect } from './postgres-db';<% } %><% if (mysql) { %>
import { mysqlConnect, mysqlDisconnect } from './mysql-db';<% } %><% if (mssql) { %>
import { mssqlConnect, mssqlDisconnect } from './mssql-db';<% } %><% if (sqlite) { %>
import { sqliteConnect, sqliteDisconnect } from './sqlite-db';<% } %><% if (maria) { %>
import { mariaConnect, mariaDisconnect } from './maria-db';<% } %>

import * as Rx from 'rxjs';

export function connect(): Rx.Observable<any> {
  let obs = [];<% if (mongo) { %>
  obs.push(mongoConnect());<% } %><% if (cassandra) { %>
  obs.push(cassandraConnect());<% } %><% if (postgres) { %>
  obs.push(postgresConnect());<% } %><% if (mysql) { %>
  obs.push(mysqlConnect());<% } %><% if (mssql) { %>
  obs.push(mssqlConnect());<% } %><% if (sqlite) { %>
  obs.push(sqliteConnect());<% } %><% if (maria) { %>
  obs.push(mariaConnect());<% } %>

  return obs.length > 1 ? Rx.Observable.merge.apply(this, obs) : obs[0];
}

export function disconnect() {<% if (mongo) { %>
  mongoDisconnect();<% } %><% if (cassandra) { %>
  cassandraDisconnect();<% } %><% if (postgres) { %>
  postgresDisconnect();<% } %><% if (mysql) { %>
  mysqlDisconnect();<% } %><% if (mssql) { %>
  mssqlDisconnect();<% } %><% if (sqlite) { %>
  sqliteDisconnect();<% } %><% if (maria) { %>
  mariaDisconnect();<% } %>
}

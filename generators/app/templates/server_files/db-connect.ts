<% if (mongo) { %>import { mongoConnect, mongoDisconnect } from './mongo-db';<% } %><% if (cassandra) { %>
import { cassandraConnect, cassandraDisconnect } from './cassandra-db';<% } %><% if (postgres) { %>
import { postgresConnect, postgresDisconnect } from './postgres-db';<% } %><% if (mysql) { %>
import { mysqlConnect, mysqlDisconnect } from './mysql-db';<% } %><% if (mssql) { %>
import { mssqlConnect, mssqlDisconnect } from './mssql-db';<% } %><% if (sqlite) { %>
import { sqliteConnect, sqliteDisconnect } from './sqlite-db';<% } %><% if (maria) { %>
import { mariaConnect, mariaDisconnect } from './maria-db';<% } %>

export function connect() {<% if (mongo) { %>
  mongoConnect();<% } %><% if (cassandra) { %>
  cassandraConnect();<% } %><% if (postgres) { %>
  postgresConnect();<% } %><% if (mysql) { %>
  mysqlConnect();<% } %><% if (mssql) { %>
  mssqlConnect();<% } %><% if (sqlite) { %>
  sqliteConnect();<% } %><% if (maria) { %>
  mariaConnect();<% } %>
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

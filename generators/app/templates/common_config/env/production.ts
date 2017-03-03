/*
===============================================
Used when process.env.NODE_ENV = 'production'
===============================================
//This file adds config settings and overwrites config settings in the ./default.ts file
//process.env.NODE_ENV is utilized in config/config.ts
*/

export const prodEnv = {
  port: process.env.PORT || 8443,
  // Binding to 127.0.0.1 is safer in production.
  host: process.env.HOST || '0.0.0.0',
  <% if (mongo) { %>mongo: {
      uri: 'mongodb://localhost/prod',
      options: {
        user: '',
        pass: ''
      },
      // Enable mongoose debug mode
      debug: process.env.MONGODB_DEBUG || false
    },<% } %>
    <% if (cassandra) %>cassandra: {
      contactPoints: ['127.0.0.1'],
      protocolOptions: { port: 9042 },
      queryOptions: { consistency: 1 },
      keyspace: 'prod'
    },<% } %>
    <% if (postgres) %>postgres: {
      // uri: 'postgres://postgres:postgres@localhost:5432/GOATstack'
      database: 'prod',
      username: 'postgres',
      password: 'postgres',
      options: {
        host: 'localhost',
        dialect: 'postgres',
      }
    },<% } %>
    <% if (mysql) %>mysql: {
      // uri: 'postgres://postgres:postgres@localhost:5432/GOATstack'
      database: 'prod',
      username: 'mysql',
      password: 'mysql',
      options: {
        host: 'localhost',
        dialect: 'mysql',
      }
    },<% } %>
    <% if (mssql) %>mssql: {
      // uri: 'postgres://postgres:postgres@localhost:5432/GOATstack'
      database: 'prod',
      username: 'mssql',
      password: 'mssql',
      options: {
        host: 'localhost',
        dialect: 'mssql',
      }
    },<% } %>
    <% if (maria) %>maria: {
      // uri: 'postgres://postgres:postgres@localhost:5432/GOATstack'
      database: 'prod',
      username: 'maria',
      password: 'maria',
      options: {
        host: 'localhost',
        dialect: 'mariadb',
      }
    },<% } %>
    <% if (sqlite) %>maria: {
      // uri: 'postgres://postgres:postgres@localhost:5432/GOATstack'
      database: 'prod',
      username: 'sqlite',
      password: 'sqlite',
      options: {
        host: 'localhost',
        dialect: 'sqlite',
      }
    },<% } %>
  seedDB: true
};

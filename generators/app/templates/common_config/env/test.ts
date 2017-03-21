/*
======================================================================================
Used when process.env.NODE_ENV is equal to 'test'
======================================================================================
//This file adds config settings and overwrites config settings in the ./default.ts file
//process.env.NODE_ENV is utilized in config/config.ts
*/

export const testEnv = {
	port: process.env.PORT || 7001,<% if (mongo) { %>
	mongo: {
	  uri: 'mongodb://localhost/test',
	  options: {
	    user: '',
	    pass: ''
	  },
	  // Enable mongoose debug mode
	  debug: process.env.MONGODB_DEBUG || false
	},<% } %><% if (cassandra) { %>
	cassandra: {
	  contactPoints: ['127.0.0.1'],
	  protocolOptions: { port: 9042 },
	  queryOptions: { consistency: 1 },
	  keyspace: 'test'
	},<% } %><% if (postgres) { %>
	postgres: {
	  // uri: 'postgres://postgres:postgres@localhost:5432/GOATstack'
	  database: 'test',
	  username: 'postgres',
	  password: 'postgres',
	  options: {
	    host: 'localhost',
	    dialect: 'postgres',
	    logging: false
	  }
	},<% } %><% if (mysql) { %>
	mysql: {
	  // uri: 'mysql://mysql:mysql@localhost:5432/GOATstack'
	  database: 'test',
	  username: 'mysql',
	  password: 'mysql',
	  options: {
	    host: 'localhost',
	    dialect: 'mysql',
	    logging: false
	  }
	},<% } %><% if (mssql) { %>
	mssql: {
	  // uri: 'mssql://mssql:mssql@localhost:5432/GOATstack'
	  database: 'test',
	  username: 'mssql',
	  password: 'mssql',
	  options: {
	    host: 'localhost',
	    dialect: 'mssql',
	    logging: false
	  }
	},<% } %><% if (maria) { %>
	maria: {
      // uri: 'maria://maria:maria@localhost:5432/GOATstack'
      database: 'test',
      username: 'maria',
      password: 'maria',
      options: {
        host: 'localhost',
        dialect: 'mariadb',
        logging: false
      }
	},<% } %><% if (sqlite) { %>
	sqlite: {
	  // uri: 'sqlite://sqlite:sqlite@localhost:5432/GOATstack'
	  database: 'test',
	  username: 'sqlite',
	  password: 'sqlite',
	  options: {
	    host: 'localhost',
	    dialect: 'sqlite',
	    logging: false
	  }
	},<% } %>
	seedDB: true
};

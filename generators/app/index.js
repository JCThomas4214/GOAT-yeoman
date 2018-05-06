var Generator = require('yeoman-generator'),
	_ = require('lodash'),
  exec = require('child_process').exec,
  glob = require('glob'),
  chalk = require('chalk');

function findDbFolder(database, dbs) {
  switch(database) {
    case 'MongoDB':
      dbs['mongo'] = true;
      return 'mongo-db';
    case 'Apache Cassandra':
      dbs['cassandra'] = true;
      return 'cassandra-db';
    case 'PostgresSQL':
      dbs['postgres'] = true;
      return 'postgres-db';
    case 'MySQL':
      dbs['mysql'] = true;   
      return 'mysql-db';
    case 'MariaDB':
      dbs['maria'] = true;       
      return 'maria-db';
    case 'MSSQL':
      dbs['mssql'] = true;      
      return 'mssql-db';
    case 'SQLite':     
      dbs['sqlite'] = true;       
      return 'sqlite-db';
  }
}

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);
    // This makes `appname` not a required argument.
    this.argument('appname', { type: String, required: false, default: 'GOATstack' });

  }
  
  prompting() {
    console.log(chalk.yellow.bold('\n\n\t**If no databases are selected the generated stack will be a dbless solution -- UPDATED**\n\n'))

    return this.prompt([{
      type    : 'checkbox',
      name    : 'databases',
      message : 'Select what databases you would like to use.',
      choices : ['MongoDB','Apache Cassandra', 'PostgresSQL', 'MySQL', 'MariaDB', 'SQLite', 'MSSQL']
    }, {
      type    : 'confirm',
      name    : 'haveFirebase',
      message : 'Would you like to use FireBase on your Client-Side?',
      when    : res => res.databases.length === 0
    }, {
      type    : 'list',
      name    : 'defaultDb',
      message : 'What will be your default database?',
      choices : res => res.databases,
      when    : res => res.databases.length > 1
    }, {
      type    : 'confirm',
      name    : 'haveUniversal',
      message : 'Would you like to use Angular Universal for server side rendering?'
    }, {
      type    : 'input',
      name    : 'appname',
      message : 'Your new project\'s name?',
      default : this.options.appname
    }, {
      type    : 'input',
      name    : 'appdescription',
      message : 'Your new project\'s description?',
      default : 'The Greatest of All Time Stack!'
    }, {
      type    : 'input',
      name    : 'appkeywords',
      message : 'Your new project\'s keywords (comma between each word)?',
      default : 'redux, immutable, node, mongo, express, angular2, ng2, angular4, ng4, jasmine, karma, protractor, socketio, MEAN, webapp, Web Application'
    }, {
      type    : 'list',
      name    : 'protocol',
      message : 'What type of URL protocol would you like to use?',
      choices : ['http', 'https'],
      when    : res => res.databases.length > 0
    }, {
      type    : 'confirm',
      name    : 'analyticschoice',
      message : 'Would you like to add Google Analytics?'
    }, {
      type    : 'editor',
      name    : 'analytics',
      message : 'Paste the Google Analytics script (including script tags) then save => exit!',
      when    : res => res.analyticschoice
    }]).then(function (answers) {

      this.apptype                 = answers.databases.length > 0 ? 'starter-app' : 'dbless-app';
      this.serverrender            = answers.haveUniversal;
      this.appname                 = answers.appname;
      this.appdescription          = answers.appdescription;
      this.appkeywords             = answers.appkeywords;

      this.analytics               = answers.analytics;
      this.protocol                = answers.protocol;

      this.dbs = {
        mongo: false,
        cassandra: false,
        postgres: false,
        mysql: false,
        mssql: false,
        sqlite: false,
        maria: false,
        ssr: this.serverrender
      };

      this.databases = answers.databases; // initializing databases to scope
      // if defaultDb is defined then set the scope variable
      if (answers.defaultDb) this.defaultDb = findDbFolder(answers.defaultDb, this.dbs);
      // else only one database was selected, define as that
      else this.defaultDb = findDbFolder(this.databases[0], this.dbs);

      this.dbs.defaultDb = this.defaultDb;  
      this.dbs.protocol = this.protocol === 'http' ? false : true;
      this.dbs.routerImports = [];
      this.dbs.expressRouters = [];
      this.dbs.socketImports = [];
      this.dbs.socketRegisters = [];

      this.dbFolders = [];

      for (let x = 0; x < this.databases.length; x++) {
        this.dbFolders.push(findDbFolder(this.databases[x], this.dbs));
      }

      // console.log(this.defaultDb);
      // console.log(this.dbFolders);
      // console.log(this.dbs);

	    this.config.set({
        modules            : [
          'core',
          'home',
          'user-profile',
          '404',
          'shared',
        ],
        subModules          : {
          'core': [],
          'home': [],
          'user-profile': [],
          '404': [],
          'shared': []
        },

        newStoreImports     : [],
        newStoreAttrs       : [],
        newStoreReducers    : [],

        routerImports       : [],
        expressRouters      : [],
        socketImports       : [],
        socketRegisters     : [],

        apptype             : this.apptype,
        appname             : this.appname,
        appdescription      : this.appdescription,
        appkeywords         : this.appkeywords,
        protocol            : this.protocol === 'https',
        analytics           : this.analytics ? this.analytics.replace(/(\r\n|\n|\r)/gm, '') : '',
        defaultDb           : this.defaultDb,
        dbFolders           : this.dbFolders,
        databases           : this.databases
	    });
	    this.config.save();

    }.bind(this));
  }

  // Writes the application to the name of the project
  writing() {
    if (this.apptype === 'starter-app') {
      for (let x = 0; x < this.dbFolders.length; x++) {
        if (this.dbFolders[x] === this.defaultDb) {
          this.fs.copy( // if default, copy the database folder
            this.templatePath(this.dbFolders[x]),
            this.destinationPath(`server/${this.dbFolders[x]}`)
          );
        } else {
          this.fs.copy( //copy the database specific index file
            this.templatePath(`${this.dbFolders[x]}/index.ts`),
            this.destinationPath(`server/${this.dbFolders[x]}/index.ts`)
          );
          this.fs.copy( // copy the empty seed file template
            this.templatePath('seed.ts'),
            this.destinationPath(`server/${this.dbFolders[x]}/seed.ts`)
          );
        }
      }

      // Write the generic config templates
      this.fs.copyTpl(
        this.templatePath('common_config'),
        this.destinationPath('config'),
        this.dbs
      );

      // Write the generic server templates
      this.fs.copyTpl(
        this.templatePath('server_files'),
        this.destinationPath('server'),
        this.dbs
      );
    }

    if (this.serverrender === true) {
      // Write the necessary universal server files
      this.fs.copyTpl(
        this.templatePath('server_render_files/server'),
        this.destinationPath('server'),
        this.dbs
      );
      // Write the necessary universal client files
      this.fs.copyTpl(
        this.templatePath('server_render_files/client'),
        this.destinationPath('client/modules'),
        this.dbs
      );
    }
    
    // Write the application template
    this.fs.copyTpl(
      glob.sync(`${this.templatePath()}/${this.apptype}/**/**/**/*.!(svg|jpg|png|woff|woff2)`),
      this.destinationPath(),
      this.config.getAll()
    );

    // Copy over the application assets
    this.fs.copy(
      glob.sync(`${this.templatePath()}/${this.apptype}/public/*`),
      this.destinationPath('public')
    );
  }

  // Starts npm install
  install() {
    let hasSequl = false;
    let addPackages = [];

    this.npmInstall()

    if (this.dbs.mongo) {
      addPackages.push('@types/mongoose@^4.7.24');
      addPackages.push('@types/mongodb@^2.2.15');
      addPackages.push('mongoose@^4.12.5');
      addPackages.push('mongodb@^2.2.33');
      addPackages.push('connect-mongo@^2.0.0');
    }
    if (this.dbs.cassandra) {
      addPackages.push('cassandra-driver@^3.3.0');
    }
    if (this.dbs.postgres) {
      addPackages.push('@types/sequelize');
      addPackages.push('sequelize@4.20.1');
      addPackages.push('pg@^7.3.0');
      addPackages.push('pg-hstore');
    }
    if (this.dbs.mysql || this.dbs.maria) {
      addPackages.push('@types/sequelize@^4.0.78');
      addPackages.push('sequelize@4.20.1');
      addPackages.push('mysql');
    }
    if (this.dbs.sqlite) {
      addPackages.push('@types/sequelize@^4.0.78');
      addPackages.push('sequelize@4.20.1');
      addPackages.push('sqlite3');
    }
    if (this.dbs.mssql) {
      addPackages.push('@types/sequelize@^4.0.78');
      addPackages.push('sequelize@4.20.1');
      addPackages.push('tedious');
    }

    this.npmInstall(addPackages);
  }

  end() {
    if (this.protocol === 'https')
      exec('cd config/other && generate-ssl-certs.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
      });
  }
}

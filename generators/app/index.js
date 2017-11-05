const Generator = require('yeoman-generator'),
	    _ = require('lodash'),
      exec = require('child_process').exec,
      glob = require('glob'),
      chalk = require('chalk'),
      newApp = require('./new');

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);
    // This makes `appname` not a required argument.
    this.argument('appname', { type: String, required: false, default: 'GOATstack' });

  }

  prompting() {

    this.log(`
       .-::/:-'        
      -++/-://+.         
      -++.  '://-         Hello!         
      ':o.   ./+/-        You've just launched the GOATstack generator
      :o   -/o+/'                  
      '.' -/oo//          Select from the list below to get started!
          '/ooo+-'       
          .+ooo--+o+:-.    
          .oooo:':/+ooo.   
          :ooooo++oooo+'   
          -oooooooooo+.    
          ./oooooo+-' 
          '
    `);
    
    return this.prompt([{
      type    : 'list',
      name    : 'welcome',
      message : `Select from the options below`,
      choices: [ 
            {type: 'separator', line: '----------- Start here --------------------'},
            {name: `Generate a new app`, value: 'new'},
            {name: 'Add boilerplate to an existing app', value: 'boiler'}, 
            {type: 'separator', line: '----------- Resources --------------------'},
            {name: 'View Documentation', value: 'b'},
            'View Demo app',
            {type: 'separator', line: '----------- Get involved --------------------'},
            'Report a Bug',
            'Make a Pull Request',
            {type: 'separator', line: '----------- Created By --------------------'},
            'LyghtWorks',
            'Christopher Haugen',
            'Jason Thomas',
            {type: 'separator', line: '----------- Custom optimizations, tailored for your use-case! ------------'},
            'It\'s dangerous to go alone! Hire us'
        ]
    }, 
    // prompts for selection a
    {
      type    : 'checkbox',
      name    : 'databases',
      message : 'Select what databases you would like to use.' + chalk.yellow.bold('\n\n  **If no databases are selected the generated stack will be a dbless solution**\n'),
      choices : ['MongoDB','Apache Cassandra', 'PostgresSQL', 'MySQL', 'MariaDB', 'SQLite', 'MSSQL'],
      when    : res => res.welcome === 'new'
    }, {
      type    : 'confirm',
      name    : 'haveFirebase',
      message : 'Would you like to use FireBase on your Client-Side?',
      when    : res => res.welcome === 'new' && res.databases.length === 0
    }, {
      type    : 'list',
      name    : 'defaultDb',
      message : 'What will be your default database?',
      choices : res => res.databases,
      when    : res => res.welcome === 'new' && res.databases.length > 1
    }, {
      type    : 'confirm',
      name    : 'haveUniversal',
      message : 'Would you like to use Angular Universal for server side rendering?',
      when    : res => res.welcome === 'new'
    }, {
      type    : 'input',
      name    : 'appname',
      message : 'Your new project\'s name?',
      default : this.options.appname,
      when    : res => res.welcome === 'new'
    }, {
      type    : 'input',
      name    : 'appdescription',
      message : 'Your new project\'s description?',
      default : 'The Greatest of All Time Stack!',
      when    : res => res.welcome === 'new'
    }, {
      type    : 'input',
      name    : 'appkeywords',
      message : 'Your new project\'s keywords (comma between each word)?',
      default : 'redux, immutable, node, mongo, express, angular2, ng2, angular4, ng4, jasmine, karma, protractor, socketio, MEAN, webapp, Web Application',
      when    : res => res.welcome === 'new'
    }, {
      type    : 'list',
      name    : 'protocol',
      message : 'What type of URL protocol would you like to use?',
      choices : ['http', 'https'],
      when    : res => res.databases.length > 0,
      when    : res => res.welcome === 'new'
    }, {
      type    : 'confirm',
      name    : 'analyticschoice',
      message : 'Would you like to add Google Analytics?',
      when    : res => res.welcome === 'new'
    }, {
      type    : 'editor',
      name    : 'analytics',
      message : 'Paste the Google Analytics script (including script tags) then save => exit!',
      when    : res => res.welcome === 'new' && res.analyticschoice
    }]).then(function (answers) {

      newApp.afterPrompt(this, answers);

    }.bind(this));
  }

  // Writes the application to the name of the project
  writing() {
    this.log(this.destinationRoot());
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
  installNpm() {
    let hasSequl = false;
    let addPackages = [];

    if (this.dbs.mongo) {
      addPackages.push('@types/mongoose');
      addPackages.push('@types/mongodb');
      addPackages.push('mongoose');
      addPackages.push('mongodb');
      addPackages.push('connect-mongo');
    }
    if (this.dbs.cassandra) {
      addPackages.push('cassandra-driver');
    }
    if (this.dbs.postgres) {
      addPackages.push('@types/sequelize');
      addPackages.push('sequelize');
      addPackages.push('pg');
      addPackages.push('pg-hstore');
    }
    if (this.dbs.mysql || this.dbs.maria) {
      addPackages.push('@types/sequelize');
      addPackages.push('sequelize');
      addPackages.push('mysql');
    }
    if (this.dbs.sqlite) {
      addPackages.push('@types/sequelize');
      addPackages.push('sequelize');
      addPackages.push('sqlite3');
    }
    if (this.dbs.mssql) {
      addPackages.push('@types/sequelize');
      addPackages.push('sequelize');
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
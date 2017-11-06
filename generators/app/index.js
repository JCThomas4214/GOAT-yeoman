const Generator = require('yeoman-generator'),
  _ = require('lodash'),
  exec = require('child_process').exec,
  glob = require('glob'),
  chalk = require('chalk'),
  newApp = require('./new-app');

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);
    // This makes `appname` not a required argument.
    this.argument('appname', { type: String, required: false, default: 'GOATstack' });

  }

  // Your initialization methods (checking current project state, getting configs, etc)
  initializing() {
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
  }

  // Where you prompt users for options (where you'd call this.prompt())
  prompting() {

    return this.prompt([{
      type: 'list',
      name: 'welcome',
      message: `Select from the options below`,
      choices: [
        { type: 'separator', line: '----------- Start here --------------------' },
        { name: `Generate a new app`, value: 'newApp' },
        { name: 'Add boilerplate to an existing app', value: 'boilerplate' },
        { type: 'separator', line: '----------- Resources --------------------' },
        { name: 'View Documentation', value: 'viewDocs' },
        { name: 'View Demo App', value: 'demo' },
        { type: 'separator', line: '----------- Get involved -----------------' },
        { name: 'Star us on Github!', value: 'star' },
        { name: 'Make a Pull Request', value: 'pull' },
        { name: 'Report a Bug', value: 'bug' },
        { type: 'separator', line: '----------- Created By -------------------' },
        { name: 'Christopher Haugen', value: 'ch' },
        { name: 'Jason Thomas', value: 'jt' },
        { type: 'separator', line: '----------- Custom optimizations, tailored for your use-case! ------------' },
        { name: 'It\'s dangerous to go alone! Hire us', value: 'hire' }
      ]
    },
    // newApp prompts
    {
      type: 'checkbox',
      name: 'databases',
      message: 'Select what databases you would like to use.' + chalk.yellow.bold('\n\n  **If no databases are selected the generated stack will be a dbless solution**\n'),
      choices: ['MongoDB', 'Apache Cassandra', 'PostgreSQL', 'MySQL', 'MariaDB', 'SQLite', 'MSSQL'],
      when: res => res.welcome === 'newApp'
    }, {
      type: 'confirm',
      name: 'haveFirebase',
      message: 'Would you like to use FireBase on your Client-Side?',
      when: res => res.welcome === 'newApp' && res.databases.length === 0
    }, {
      type: 'list',
      name: 'defaultDb',
      message: 'What will be your default database?',
      choices: res => res.databases,
      when: res => res.welcome === 'newApp' && res.databases.length > 1
    }, {
      type: 'confirm',
      name: 'haveUniversal',
      message: 'Would you like to use Angular Universal for server side rendering?',
      when: res => res.welcome === 'newApp'
    }, {
      type: 'input',
      name: 'appname',
      message: 'Your new project\'s name?',
      default: this.options.appname,
      when: res => res.welcome === 'newApp'
    }, {
      type: 'input',
      name: 'appdescription',
      message: 'Your new project\'s description?',
      default: 'The Greatest of All Time Stack!',
      when: res => res.welcome === 'newApp'
    }, {
      type: 'input',
      name: 'appkeywords',
      message: 'Your new project\'s keywords (comma between each word)?',
      default: 'redux, immutable, node, mongo, express, angular2, ng2, angular4, ng4, jasmine, karma, protractor, socketio, MEAN, webapp, Web Application',
      when: res => res.welcome === 'newApp'
    }, {
      type: 'list',
      name: 'protocol',
      message: 'What type of URL protocol would you like to use?',
      choices: ['http', 'https'],
      when: res => res.databases.length > 0,
      when: res => res.welcome === 'newApp'
    }, {
      type: 'confirm',
      name: 'analyticschoice',
      message: 'Would you like to add Google Analytics?',
      when: res => res.welcome === 'newApp'
    }, {
      type: 'editor',
      name: 'analytics',
      message: 'Paste the Google Analytics script (including script tags) then save => exit!',
      when: res => res.welcome === 'newApp' && res.analyticschoice
    },

    //View Documentation prompts
    {
      type: 'checkbox',
      name: 'docs',
      message: 'Select the Documentation you would like to navigate to',
      choices: [
        {name: 'GOATstack - Yeoman generator', value: 'goatyeoman'},
        {name: 'GOATstack - Source', value: 'goatstack'},
        {name: 'Third Party Docs', value: '3rd'}
      ],
      when: res => res.welcome === 'viewDocs'
    },
    {
      type: 'checkbox',
      name: 'thirdParty',
      message: 'Select the third party Documentation you would like to navigate to',
      choices: [

        { type: 'separator', line: '----------- Languages --------------------' },
        {name: 'TypeScript', value: 'ts'},
        {name: 'JavaScript', value: 'js'},

        { type: 'separator', line: '----------- Build Tools --------------------' },
        {name: 'npm', value: 'npm'},
        {name: 'Gulp', value: 'gulp'},

        { type: 'separator', line: '----------- Front End --------------------' },
        {name: 'Angular', value: 'ng'},
        {name: 'Redux', value: 'redux'},
        {name: 'RxJs', value: 'rx'},
        {name: 'Immutable', value: 'immutable'},
        {name: 'SocketIO', value: 'socket'},

        { type: 'separator', line: '----------- Servers --------------------' },
        {name: 'NodeJS', value: 'node'},
        {name: 'Express.js', value: 'express'},
        {name: 'SocketIO', value: 'socket'},
        {name: 'Mongoose', value: 'mongoose'},
        {name: 'Sequelize', value: 'sequelize'},
        {name: 'Passport', value: 'pass'},
        {name: 'Cassandra Driver', value: 'cassdriver'},

        { type: 'separator', line: '----------- Databases --------------------' },
        {name: 'MongoDB', value: 'mongo'},
        {name: 'Apache Cassandra', value: 'cass'},
        {name: 'PostgreSQL', value: 'postgre'},
        {name: 'MySQL', value: 'mysql'},
        {name: 'MariaDB', value: 'maria'},
        {name: 'SQLite', value: 'sqlite'},
        {name: 'MSSQL', value: 'mssql'},

        { type: 'separator', line: '----------- Testing Tools --------------------' },
        {name: 'Jasmine', value: 'jasmine'},
        {name: 'Karma', value: 'karma'},
        {name: 'Protractor', value: 'protractor'}
      ],
      when: res => res.docs.indexOf('3rd') > -1
    }

    ]).then(function (answers) {

      if (answers.welcome === 'newApp') {
        newApp.afterPrompt(this, answers);
      } else if (answers.welcome === 'boilerplate') {

        switch (answers.subgens) {
          case 'module':

            return this.composeWith(require.resolve('../module'));
          case 'submodule':

            return this.composeWith(require.resolve('../submodule'));
          case 'component':

            return this.composeWith(require.resolve('../component'));
          case 'service':

            return this.composeWith(require.resolve('../service'));
          case 'directive':

            return this.composeWith(require.resolve('../directive'));
          case 'pipe':

            return this.composeWith(require.resolve('../pipe'));
          case 'actions':

            return this.composeWith(require.resolve('../actions'));
          case 'store-item':

            return this.composeWith(require.resolve('../store-item'));
          case 'endpoint':

            return this.composeWith(require.resolve('../endpoint'));
          case 'help!':

            return this.log('help selected');

        }
      } else if (answers.welcome === 'viewDocs') {

        const goatyeoman = "https://github.com/JCThomas4214/GOAT-yeoman";
        const goatstack = "https://github.com/projectSHAI/GOATstack/wiki";
        for(let i = 0; i <= answers.docs.length; i++) {

          if(answers.docs[i] === '3rd') {

            const ts = "https://www.typescriptlang.org/docs/home.html",
                  js = "https://developer.mozilla.org/en-US/docs/Web/javascript",
                  npm = "https://docs.npmjs.com/",
                  gulp = "https://github.com/gulpjs/gulp/blob/master/docs/API.md",
                  ng = "https://angular.io/docs/",
                  redux = "https://redux.js.org/",
                  rx = "http://reactivex.io/rxjs/",
                  immutable = "https://facebook.github.io/immutable-js/docs/#/",
                  socket = "https://socket.io/docs/#",
                  node = "https://nodejs.org/en/docs/",
                  express = "http://expressjs.com/",
                  mongoose = "http://mongoosejs.com/docs/api.html",
                  sequelize = "http://docs.sequelizejs.com/manual/installation/getting-started.html",
                  pass = "http://www.passportjs.org/docs",
                  cassdriver = "https://github.com/datastax/nodejs-driver",
                  mongo = "https://docs.mongodb.com/",
                  cass = "http://cassandra.apache.org/doc/latest/",
                  postgre = "https://www.postgresql.org/docs/",
                  mysql = "https://dev.mysql.com/doc/",
                  maria = "https://mariadb.org/learn/",
                  sqlite = "https://sqlite.org/docs.html",
                  mssql = "https://docs.microsoft.com/en-us/sql/sql-server/sql-server-technical-documentation",
                  jasmine = "https://jasmine.github.io/",
                  karma = "http://karma-runner.github.io/0.13/index.html",
                  protractor = "http://www.protractortest.org/#/";

            for(let i = 0; i <= answers.thirdParty.length; i++) {
              this.log('Navigating to inner' + chalk.blue(answers.thirdParty[i]));
              this.log(answers.thirdParty);
              exec('explorer ' + answers.thirdParty[i]);
            }

          } else {
            this.log('Navigating to outer' + chalk.blue(answers.docs[i]));
            this.log(answers.docs);
            exec('explorer ' + answers.docs[i]);
          }

        }

      } else if (answers.welcome === 'demo') {


      } else if (answers.welcome === 'star') {


      } else if (answers.welcome === 'pull') {


      } else if (answers.welcome === 'bug') {


      } else if (answers.welcome === 'ch') {


      } else if (answers.welcome === 'jt') {


      } else if (answers.welcome === 'viewD') {


      } else if (answers.welcome === 'hire') {


      }

    }.bind(this));
  }

  // Where you write the generator specific files (routes, controllers, etc)
  writing() {
    if (this.appname) {
      // newApp.writing(this, glob);
    }
  }

  // Where installations are run (npm, bower)
  install() {
    if (this.appname) {
      // newApp.installNpm(this);
    }
  }

  // Called last, cleanup, say good bye, etc
  end() {
    // TODO: ask Jason about config/other/generate-ssl-certs.sh file and the -e flag
    if (this.protocol === 'https') {
      newApp.httpsCerts(this, exec);
    }
  }
}
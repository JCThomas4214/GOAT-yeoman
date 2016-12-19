var generators = require('yeoman-generator'),
	_ = require('lodash'),
  exec = require('child_process').exec;

module.exports = generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
  	// The root of the yeoman project
  	base = '../../../';

    generators.Base.apply(this, arguments);
    // This makes `appname` not a required argument.
    this.argument('appname', { type: String, required: false, default: 'GOAT-stack' });

  },
  prompting: function () {
    return this.prompt([{
      type    : 'list',
      name    : 'apptype',
      message : 'Which app would you like to start with?',
      choices : ['demo-app', 'starter-app'],
      default : 'demo-app'
    }, {
      type    : 'input',
      name    : 'appname',
      message : 'Your new project\'s name?',
      default : this.appname
    }, {
      type    : 'input',
      name    : 'appdescription',
      message : 'Your new project\'s description?',
      default : 'The Greatest of All Time Stack!'
    }, {
      type    : 'input',
      name    : 'appkeywords',
      message : 'Your new project\'s keywords (comma between each word)?',
      default : 'redux, node, mongo, express, angular2, ng2, jasmine, karma, protractor, socketio, MEAN'
    }, {
      type    : 'list',
      name    : 'protocol',
      message : 'What type of URL protocol would you like to use?',
      choices : ['http', 'https']
    }, {
      type    : 'confirm',
      name    : 'analyticschoice',
      message : 'Would you like to add Google Analytics?'
    }, {
      type    : 'editor',
      name    : 'analytics',
      message : 'Paste the Google Analytics script (including script tags) then exit!',
      when    : (res) => res.analyticschoice
    }, ]).then(function (answers) {

      this.apptype          = answers.apptype;
    	this.appname          = answers.appname;
    	this.appdescription   = answers.appdescription;
    	this.appkeywords      = answers.appkeywords;

      this.analytics        = answers.analytics;
      this.protocol         = answers.protocol;

	    this.config.set({
        Segments            : this.apptype === 'demo-app' ? [
          'footer-segment',
          'header-segment',
          'island-segment',
          'ocean-segment',
          'sky-segment'
        ] : [
          'footer-segment',
          'header-segment',
          'profile-segment'
        ],

        newComponents       : [],
        newComponentImports : [],

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
        analytics           : this.analytics ? '`\n' + this.analytics + '\n`' : ''
	    });
	    this.config.save();

    }.bind(this));
  },
  // Writes the application to the name of the project
  writing: function () {
    // Write the application template
    this.fs.copyTpl(
      this.templatePath(base + 'templates/' + this.apptype),
      this.destinationPath(),
      this.config.getAll()
    );

    // Copy over the application assets
    this.fs.copy(
      this.templatePath(base + 'assets/' + this.apptype),
      this.destinationPath('public/assets')
    );
  },
  // Starts npm install
  installNpm: function() {
    this.npmInstall();
  },
  end: function() {
    if (this.protocol === 'https')
      exec('cd config/scripts && generate-ssl-certs.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
      });
  }
});

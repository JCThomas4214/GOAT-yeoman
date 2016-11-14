var generators = require('yeoman-generator'),
	_ = require('lodash');

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
      type    : 'input',
      name    : 'appname',
      message : 'Your new project\'s name?',
      default: this.appname
    }, {
      type    : 'input',
      name    : 'appdescription',
      message : 'Your new project\'s description?'
    }, {
      type    : 'input',
      name    : 'appkeywords',
      message : 'Your new project\'s keywords (comma between each word)?'
    }]).then(function (answers) {

    	this.appname = answers.appname;
    	this.appdescription = answers.appdescription;
    	this.appkeywords = answers.appkeywords;

	    this.config.set({
	    	newComponents: [],
	    	newComponentImports: [],

        newStoreImports: [],
        newStoreAttrs: [],
        newStoreReducers: [],

        routerImports: [],
        expressRouters: [],

        appname: this.appname,
        appdescription: this.appdescription,
        appkeywords: this.appkeywords
	    });
	    this.config.save();

    }.bind(this));
  },
  // Writes the application to the name of the project
  writing: function () {
    this.fs.copyTpl(
      this.templatePath(base + 'templates/app'),
      this.destinationPath(),
      this.config.getAll()
    );
  },
  // Starts npm install
  installNpm: function() {
    // this.npmInstall();
  }
});
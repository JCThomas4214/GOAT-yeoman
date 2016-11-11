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

    this.config.set({
    	newComponents: [],
    	newComponentImports: []
    });
    this.config.save();
  },
  // Writes the application to the name of the project
  writing: function () {
    this.fs.copyTpl(
      this.templatePath(base + 'templates/app'),
      this.destinationPath(),
      {
      	newComponentImports: [],
      	newComponents: []
      }
    );
  },
  // Starts npm install
  installNpm: function() {
    // this.npmInstall();
  }
});
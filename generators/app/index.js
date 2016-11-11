var generators = require('yeoman-generator'),
	_ = require('lodash'),
	fs = require('graceful-fs');

module.exports = generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
    generators.Base.apply(this, arguments);
    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: false, default: 'GOAT-stack' });
    console.log('The app is called ' + this.appname);


  },
  // Writes the application to the name of the project
  writing: function () {
  	this.sourceRoot('GOAT-yeoman/templates');
    this.fs.copyTpl(
      this.templatePath('app'),
      this.destinationPath(this.appname)
    );
  },
  // Starts npm install
  // installNpm: function() {
  //   this.npmInstall();
  // }
});
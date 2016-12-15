var generators = require('yeoman-generator'),
	  _          = require('lodash'),
    del        = require('del');

module.exports = generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
  	// The root of the yeoman project
  	base = '../../../';

    generators.Base.apply(this, arguments);
    // // This makes `appname` not a required argument.
    this.argument('componentname', { type: String, required: false });
  },
  prompting: function () {
    return this.prompt([{
      type    : 'list',
      name    : 'segmentname',
      message : 'What segment would you like to generate to?',
      choices : ['main-segment'].concat(this.config.get('Segments')),
      when    : this.config.get('Segments').length > 0
    }, {
      type    : 'input',
      name    : 'componentname',
      message : 'Your new component\'s name?',
      default : this.componentname
    }]).then(function (answers) {

      // Process to get naming convention camelcase and capitalized camelcase
      this.namelower = _.camelCase(answers.componentname);
      this.componentname = this.namelower.charAt(0).toUpperCase() + this.namelower.slice(1);
      this.fname = _.kebabCase(this.componentname);

      this.segmentname = answers.segmentname ? answers.segmentname : 'main-segment';

      // Delete the existing module for retemplating
      del(['client/main.module.ts']);

      // update the yo config file with new component
      var config = this.config.getAll();
      config.newComponents.push(this.componentname + 'Component');
      config.newComponentImports.push(
        "import { "+ this.componentname +"Component } from './"+ this.segmentname +"/components/"+ this.fname +"/"+ this.fname +".component';");

      this.config.set(config);
      this.config.save();

    }.bind(this));
  },
  editModule: function() { 
    // Get the new values for newComponents and newComponentImports
    this.module = this.config.get('modules');

    this.fs.copyTpl(
      this.templatePath(base + 'templates/' + this.config.get('apptype') + '/client/main.module.ts'),
      this.destinationPath('client/main.module.ts'),
      { 
        newComponents: this.config.get('newComponents'),
        newComponentImports: this.config.get('newComponentImports')
      }
    );
  },
  // Writes the application to the name of the project
  writing: function () {
    // Clone the template component.ts file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/component/template.component.ts'),
      this.destinationPath('client/' + this.segmentname + '/components/' + this.fname + '/' + this.fname + '.component.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.componentname
      }
    );
    // Clone the template component.html file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/component/template.component.html'),
      this.destinationPath('client/' + this.segmentname + '/components/' + this.fname + '/' + this.fname + '.component.html'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.componentname
      }
    );
    // Clone the template component.scss file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/component/template.component.scss'),
      this.destinationPath('client/' + this.segmentname + '/components/' + this.fname + '/' + this.fname + '.component.scss'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.componentname
      }
    );
  }
});
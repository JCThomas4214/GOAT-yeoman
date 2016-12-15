var generators = require('yeoman-generator'),
	_ = require('lodash'),
  del = require('del');

module.exports = generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
  	// The root of the yeoman project
  	base = '../../../';

    generators.Base.apply(this, arguments);
    // // This makes `appname` not a required argument.
    this.argument('segmentname', { type: String, required: false });
  },
  prompting: function () {
    return this.prompt([{
      type    : 'input',
      name    : 'segmentname',
      message : 'What\'s the name for the new segment?',
      default : this.segmentname
    }]).then(function (answers) {

      // Process to get naming convention camelcase and capitalized camelcase
      this.namelower = _.camelCase(answers.segmentname);
      this.segmentname = this.namelower.charAt(0).toUpperCase() + this.namelower.slice(1);
      this.fname = _.kebabCase(this.segmentname);

      // Delete the existing module for retemplating
      del(['client/main.module.ts']);

      // update the yo config file with new component
      var config = this.config.getAll();
      config.Segments.push(this.fname + '-segment');
      config.newComponents.push(this.segmentname + 'Component');
      config.newComponentImports.push(
        "import { "+ this.segmentname +"Component } from './"+ this.fname +"-segment/components/"+ this.fname +"/"+ this.fname +".component';");

      this.config.set(config);
      this.config.save();

    }.bind(this));
  },
  editModule: function() { 
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
      this.destinationPath('client/' + this.fname + '-segment/components/' + this.fname + '/' + this.fname + '.component.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.segmentname
      }
    );
    // Clone the template component.html file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/component/template.component.html'),
      this.destinationPath('client/' + this.fname + '-segment/components/' + this.fname + '/' + this.fname + '.component.html'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.segmentname
      }
    );
    // Clone the template component.scss file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/component/template.component.scss'),
      this.destinationPath('client/' + this.fname + '-segment/components/' + this.fname + '/' + this.fname + '.component.scss'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.segmentname
      }
    );
  }
});
var Generator = require('yeoman-generator'),
	_ = require('lodash'),
  del = require('del');

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);
  	// The root of the yeoman project
  	this.base = '../../..';
    // // This makes `appname` not a required argument.
    this.argument('submodulename', { type: String, required: false });
  }

  prompting() {
    return this.prompt([{
      type    : 'list',
      name    : 'modulename',
      message : 'What module would you like to generate to?',
      choices : this.config.get('modules')
    }, {
      type    : 'input',
      name    : 'submodulename',
      message : 'What\'s the name for the new module?',
      default : this.submodulename
    }]).then(function (answers) {

      // Process to get naming convention camelcase and capitalized camelcase
      this.namelower = _.camelCase(answers.submodulename);
      this.submodulename = this.namelower.charAt(0).toUpperCase() + this.namelower.slice(1);
      this.fname = _.kebabCase(this.submodulename);

      this.modulename = answers.modulename;

      // update the yo config file with new component
      var config = this.config.getAll();
      config.modules.push(this.fname);
      config.subModules[this.fname] = [];

      this.config.set(config);
      this.config.save();

    }.bind(this));
  }

  // Writes the application to the name of the project
  writing() {
    var location = `client/modules/${this.modulename}/${this.fname}`;

     // Clone the template module.ts file
    this.fs.copyTpl(
      this.templatePath(`template.module.ts`),
      this.destinationPath(`${location}/${this.fname}.module.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        modulename: this.submodulename
      }
    );   
     // Clone the template routing.module.ts file
    this.fs.copyTpl(
      this.templatePath(`template-routing.module.ts`),
      this.destinationPath(`${location}/${this.fname}-routing.module.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        modulename: this.submodulename
      }
    );    

     // Clone the template component.ts file
    this.fs.copyTpl(
      this.templatePath(`${this.base}/generators/component/templates/template.component.ts`),
      this.destinationPath(`${location}/${this.fname}.component.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.submodulename
      }
    );
    // Clone the template component.html file
    this.fs.copyTpl(
      this.templatePath(`${this.base}/generators/component/templates/template.component.html`),
      this.destinationPath(`${location}/${this.fname}.component.html`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.submodulename
      }
    );
    // Clone the template component.scss file
    this.fs.copyTpl(
      this.templatePath(`${this.base}/generators/component/templates/template.component.scss`),
      this.destinationPath(`${location}/${this.fname}.component.scss`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.submodulename
      }
    );
  }

}
var Generator = require('yeoman-generator'),
	  _          = require('lodash'),
    del        = require('del');

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);
    // // This makes `appname` not a required argument.
    this.argument('componentname', { type: String, required: false });
  }

  prompting() {
    return this.prompt([{
      type    : 'list',
      name    : 'modulename',
      message : 'What module would you like to generate to?',
      choices : this.config.get('modules')
    }, {
      type    : 'confirm',
      name    : 'confirmsub',
      message : 'Would you like to create your component inside a submodule?',
      when    : (res) => this.config.get('subModules')[res.modulename].length > 0
    }, {
      type    : 'list',
      name    : 'submodulename',
      message : 'What submodule would you like to generate to?',
      choices : (res) => this.config.get('subModules')[res.modulename],
      when    : (res) => res.confirmsub
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

      this.modulename = answers.modulename;
      this.submodulename = answers.submodulename;

    }.bind(this));
  }

  // Writes the application to the name of the project
  writing() {
    var location = `client/modules/${this.modulename}${this.submodulename ? ('/' + this.submodulename) : ''}`;

    // Clone the template component.ts file
    this.fs.copyTpl(
      this.templatePath('template.component.ts'),
      this.destinationPath(`${location}/components/${this.fname}/${this.fname}.component.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.componentname
      }
    );
    // Clone the template component.html file
    this.fs.copyTpl(
      this.templatePath('template.component.html'),
      this.destinationPath(`${location}/components/${this.fname}/${this.fname}.component.html`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.componentname
      }
    );
    // Clone the template component.scss file
    this.fs.copyTpl(
      this.templatePath('template.component.scss'),
      this.destinationPath(`${location}/components/${this.fname}/${this.fname}.component.scss`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.componentname
      }
    );
  }

}
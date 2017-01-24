var Generator = require('yeoman-generator'),
	_ = require('lodash');

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);
    // // This makes `appname` not a required argument.
    this.argument('servicename', { type: String, required: false });
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
      message : 'Would you like to create your service inside a submodule?',
      when    : (res) => this.config.get('subModules')[res.modulename].length > 0
    }, {
      type    : 'list',
      name    : 'submodulename',
      message : 'What submodule would you like to generate to?',
      choices : (res) => this.config.get('subModules')[res.modulename],
      when    : (res) => res.confirmsub
    }, {
      type    : 'input',
      name    : 'servicename',
      message : 'What\'s the name for the new service?',
      default : this.servicename
    }]).then(function (answers) {

      // Process to get naming convention camelcase and capitalized camelcase
      var tmp = _.camelCase(answers.servicename);
      this.servicename = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.servicename);
      this.fname = _.kebabCase(this.servicename);

      this.modulename = answers.modulename;
      this.submodulename = answers.submodulename;

    }.bind(this));
  }

  // Writes the application to the name of the project
  writing() {
    var location = `client/modules/${this.modulename}${this.submodulename ? ('/' + this.submodulename) : ''}`;

    // Clone the template service.ts file
    this.fs.copyTpl(
      this.templatePath('template.service.ts'),
      this.destinationPath(`${location}/services/${this.fname}/${this.fname}.service.ts`),
      { 
        namelower: this.namelower,
        servicename: this.servicename
      }
    );
  }

}
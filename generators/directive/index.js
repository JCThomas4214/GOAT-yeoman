var generators = require('yeoman-generator'),
	_ = require('lodash');

module.exports = generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
    generators.Base.apply(this, arguments);
    // // This makes `appname` not a required argument.
    this.argument('directivename', { type: String, required: false });
  },
  prompting: function () {
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
      name    : 'directivename',
      message : 'What\'s the name for the new directive?',
      default : this.directivename
    }]).then(function (answers) {

      // Process to get naming convention camelcase and capitalized camelcase
      const tmp = _.camelCase(answers.directivename);
      this.directivename = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.directivename);
      this.fname = _.kebabCase(this.directivename);

      this.modulename = answers.modulename;
      this.submodulename = answers.submodulename;

    }.bind(this));
  },
  // Writes the application to the name of the project
  writing: function () {
    var location = `client/modules/${this.modulename}${this.submodulename ? ('/' + this.submodulename) : ''}`;

    // Clone the template service.ts file
    this.fs.copyTpl(
      this.templatePath('template.directive.ts'),
      this.destinationPath(`${location}/directives/${this.fname}.directive.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        directivename: this.directivename
      }
    );
  }
});
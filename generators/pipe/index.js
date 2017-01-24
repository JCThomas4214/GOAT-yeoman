var generators = require('yeoman-generator'),
	_ = require('lodash');

module.exports = generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
    generators.Base.apply(this, arguments);
    // // This makes `appname` not a required argument.
    this.argument('pipename', { type: String, required: false });
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
      message : 'Would you like to create your pipe inside a submodule?',
      when    : (res) => this.config.get('subModules')[res.modulename].length > 0
    }, {
      type    : 'list',
      name    : 'submodulename',
      message : 'What submodule would you like to generate to?',
      choices : (res) => this.config.get('subModules')[res.modulename],
      when    : (res) => res.confirmsub
    }, {
      type    : 'input',
      name    : 'pipename',
      message : 'What\'s the name for the new pipe?',
      default : this.pipename
    }]).then(function (answers) {

      // Process to get naming convention camelcase and capitalized camelcase
      var tmp = _.camelCase(answers.pipename);
      this.pipename = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.pipename);
      this.fname = _.kebabCase(this.pipename);

      this.modulename = answers.modulename;
      this.submodulename = answers.submodulename;

    }.bind(this));
  },
  // Writes the application to the name of the project
  writing: function () {
    var location = `client/modules/${this.modulename}${this.submodulename ? ('/' + this.submodulename) : ''}`;

    // Clone the template service.ts file
    this.fs.copyTpl(
      this.templatePath('template.pipe.ts'),
      this.destinationPath(`${location}/pipes/${this.fname}.pipe.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        pipename: this.pipename
      }
    );
  }
});
var generators = require('yeoman-generator'),
	_ = require('lodash');

module.exports = generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
  	// The root of the yeoman project
  	base = '../../../';

    generators.Base.apply(this, arguments);
    // // This makes `appname` not a required argument.
    this.argument('directivename', { type: String, required: false });
  },
  prompting: function () {
    return this.prompt([{
      type    : 'input',
      name    : 'directivename',
      message : 'What\'s the name for the new directive?',
      default: this.directivename
    }]).then(function (answers) {

      // Process to get naming convention camelcase and capitalized camelcase
      const tmp = _.camelCase(answers.directivename);
      this.directivename = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.directivename);
      this.fname = _.kebabCase(this.directivename);

    }.bind(this));
  },
  // Writes the application to the name of the project
  writing: function () {
    // Clone the template service.ts file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/directive/template.directive.ts'),
      this.destinationPath('app/directives/' + this.fname + '.directive.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        directivename: this.directivename
      }
    );
  }
});
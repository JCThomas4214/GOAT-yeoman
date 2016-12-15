var generators = require('yeoman-generator'),
	_ = require('lodash');

module.exports = generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
  	// The root of the yeoman project
  	base = '../../../';

    generators.Base.apply(this, arguments);
    // // This makes `appname` not a required argument.
    this.argument('servicename', { type: String, required: false });
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
      name    : 'servicename',
      message : 'What\'s the name for the new service?',
      default : this.servicename
    }]).then(function (answers) {

      // Process to get naming convention camelcase and capitalized camelcase
      var tmp = _.camelCase(answers.servicename);
      this.servicename = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.servicename);
      this.fname = _.kebabCase(this.servicename);

      this.segmentname = answers.segmentname ? answers.segmentname : 'main-segment';

    }.bind(this));
  },
  // Writes the application to the name of the project
  writing: function () {
    // Clone the template service.ts file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/service/template.service.ts'),
      this.destinationPath('client/' + this.segmentname + '/services/' + this.fname + '/' + this.fname + '.service.ts'),
      { 
        namelower: this.namelower,
        servicename: this.servicename
      }
    );
  }
});
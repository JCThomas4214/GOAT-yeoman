var generators = require('yeoman-generator'),
	_ = require('lodash');

module.exports = generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
  	// The root of the yeoman project
  	base = '../../../';

    generators.Base.apply(this, arguments);
    // // This makes `appname` not a required argument.
    this.argument('pipename', { type: String, required: false });
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
      name    : 'pipename',
      message : 'What\'s the name for the new pipe?',
      default : this.pipename
    }]).then(function (answers) {

      // Process to get naming convention camelcase and capitalized camelcase
      var tmp = _.camelCase(answers.pipename);
      this.pipename = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.pipename);
      this.fname = _.kebabCase(this.pipename);

      this.segmentname = answers.segmentname ? answers.segmentname : 'main-segment';

    }.bind(this));
  },
  // Writes the application to the name of the project
  writing: function () {
    // Clone the template service.ts file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/pipe/template.pipe.ts'),
      this.destinationPath('client/' + this.segmentname + '/pipes/' + this.fname + '.pipe.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        pipename: this.pipename
      }
    );
  }
});
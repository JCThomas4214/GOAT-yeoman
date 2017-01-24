var generators = require('yeoman-generator'),
	_ = require('lodash');

module.exports = generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
    generators.Base.apply(this, arguments);
    // // This makes `appname` not a required argument.
    this.argument('actionsname', { type: String, required: false });
  },
  prompting: function () {
    return this.prompt([{
      type    : 'input',
      name    : 'actionsname',
      message : 'The name for these new actions?',
      default : this.actionsname
    }]).then(function (answers) {

      // Process to get naming convention camelcase and capitalized camelcase
      var tmp = _.camelCase(answers.actionsname);
      this.actionsname = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.actionsname);
      this.fname = _.kebabCase(this.actionsname);

    }.bind(this));
  },
  // Writes the application to the name of the project
  writing: function () {
    // Clone the template actions.ts file
    this.fs.copyTpl(
      this.templatePath('template.actions.ts'),
      this.destinationPath(`client/redux/actions/${this.fname}/${this.fname}.actions.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        actionsname: this.actionsname
      }
    );
    // Clone the template actions.spec.ts file
    this.fs.copyTpl(
      this.templatePath('template.actions.spec.ts'),
      this.destinationPath(`client/redux/actions/${this.fname}/${this.fname}.actions.spec.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        actionsname: this.actionsname
      }
    );
  }
});
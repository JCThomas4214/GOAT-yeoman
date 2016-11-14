var generators = require('yeoman-generator'),
	_ = require('lodash'),
  del = require('del');

module.exports = generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
  	// The root of the yeoman project
  	base = '../../../';

    generators.Base.apply(this, arguments);
    // // This makes `storename` not a required argument.
    this.argument('modelname', { type: String, required: false });
  },
  prompting: function () {
    return this.prompt([{
      type    : 'input',
      name    : 'storename',
      message : 'Your new model\'s name?',
      default : this.modelname
    }]).then(function (answers) {

      // Delete the existing store for retemplating
      del(['app/server/routes.ts']);

      // Process to get naming convention camelcase and capitalized camelcase
      var tmp = _.camelCase(answers.modelname);
      this.modelname = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.modelname);

      // update the yo config file with new store attr, reducer, imports
      var config = this.config.getAll();
      config.routerImports.push("import {" + this.namelower + "Routes} from './api/" + this.namelower + ".router';");
      config.expressRouters.push("app.use('api/" + this.namelower + "', " + this.namelower + "Routes);");

      this.config.set(config);
      this.config.save();

    }.bind(this));
  },
  editRoutes: function() { 
    // Get the new values for newComponents and newComponentImports
    this.routerImports = this.config.get('routerImports');
    this.expressRouters = this.config.get('expressRouters');

    // Get the app.module template and inject newComponents and newComponentImports
    this.fs.copyTpl(
      this.templatePath(base + 'templates/app/app/server/routes.ts'),
      this.destinationPath('app/server/routes.ts'),
      { 
        routerImports: this.routerImports,
        expressRouters: this.expressRouters,
      }
    );
  },
  // Writes the application to the name of the project
  writing: function () {
    // // Clone the template store index.ts file
    // this.fs.copyTpl(
    //   this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.index.ts'),
    //   this.destinationPath('app/store/' + this.namelower + '/index.ts'),
    //   { 
    //     namelower: this.namelower,
    //     modelname: this.storename
    //   }
    // );
  }
});
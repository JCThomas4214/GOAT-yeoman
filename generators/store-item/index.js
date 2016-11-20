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
    this.argument('storename', { type: String, required: true });
  },
  prompting: function () {
    return this.prompt([{
      type    : 'input',
      name    : 'storename',
      message : 'Your new store item\'s name?',
      default : this.storename
    }, {
      type    : 'list',
      name    : 'storetype',
      message : 'New store item\'s data structure?',
      choices : ['Map', 'List'],
      default : 0
    }]).then(function (answers) {

      // Delete the existing store for retemplating
      del(['app/store/index.ts']);

      // save store data type
      this.storetype = answers.storetype;

      // Process to get naming convention camelcase and capitalized camelcase
      var tmp = _.camelCase(answers.storename);
      this.storename = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.storename);

      // update the yo config file with new store attr, reducer, imports
      var config = this.config.getAll();
      config.newStoreAttrs.push(this.namelower + '?: ' + this.namelower + '.I' + this.storename + ';');
      config.newStoreReducers.push(this.namelower + ': ' + this.namelower + '.' + this.namelower + 'Reducer');
      config.newStoreImports.push("import * as "+ this.namelower +" from './"+ this.namelower +"/index';");

      this.config.set(config);
      this.config.save();

    }.bind(this));
  },
  editStore: function() { 
    // Get the new values for newComponents and newComponentImports
    this.newStoreAttrs = this.config.get('newStoreAttrs');
    this.newStoreReducers = this.config.get('newStoreReducers');
    this.newStoreImports = this.config.get('newStoreImports');

    // Get the app.module template and inject newComponents and newComponentImports
    this.fs.copyTpl(
      this.templatePath(base + 'templates/app/app/store/index.ts'),
      this.destinationPath('app/store/index.ts'),
      { 
        newStoreAttrs: this.newStoreAttrs,
        newStoreReducers: this.newStoreReducers,
        newStoreImports: this.newStoreImports
      }
    );
  },
  // Writes the application to the name of the project
  writing: function () {
    // Clone the template store index.ts file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.index.ts'),
      this.destinationPath('app/store/' + this.namelower + '/index.ts'),
      { 
        namelower: this.namelower,
        storename: this.storename
      }
    );
    // Clone the template store types file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.types.ts'),
      this.destinationPath('app/store/' + this.namelower + '/' + this.namelower + '.types.ts'),
      { 
        namelower: this.namelower,
        storename: this.storename
      }
    );
    // Clone the template store transformer file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.transformers.ts'),
      this.destinationPath('app/store/' + this.namelower + '/' + this.namelower + '.transformers.ts'),
      { 
        namelower: this.namelower,
        storename: this.storename
      }
    );
    // Clone the template store reducer file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.reducer.ts'),
      this.destinationPath('app/store/' + this.namelower + '/' + this.namelower + '.reducer.ts'),
      { 
        namelower: this.namelower,
        storename: this.storename
      }
    );
    // Clone the template store reducer spec file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.reducer.spec.ts'),
      this.destinationPath('app/store/' + this.namelower + '/' + this.namelower + '.reducer.spec.ts'),
      { 
        namelower: this.namelower,
        storename: this.storename
      }
    );
    // Clone the template store initial-state file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.initial-state.ts'),
      this.destinationPath('app/store/' + this.namelower + '/' + this.namelower + '.initial-state.ts'),
      { 
        namelower: this.namelower,
        storename: this.storename
      }
    );


    // Clone the template store actions file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.actions.ts'),
      this.destinationPath('app/actions/' + this.namelower + '/' + this.namelower + '.actions.ts'),
      { 
        namelower: this.namelower,
        storename: this.storename,
        actionsname: this.storename
      }
    );
    // Clone the template store actions spec file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.actions.spec.ts'),
      this.destinationPath('app/actions/' + this.namelower + '/' + this.namelower + '.actions.spec.ts'),
      { 
        namelower: this.namelower,
        storename: this.storename,
        actionsname: this.storename
      }
    );


  }
});
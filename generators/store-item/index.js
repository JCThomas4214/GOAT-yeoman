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
    this.argument('storename', { type: String, required: false });
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

      // save store data type
      this.storetype = answers.storetype;

      // Process to get naming convention camelcase and capitalized camelcase
      var tmp = _.camelCase(answers.storename);
      this.storename = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.storename);
      this.fname = _.kebabCase(this.storename);

      this.segmentname = answers.segmentname ? answers.segmentname : 'main-segment';

      // Delete the existing store for retemplating
      del(['client/store/index.ts']);

      // update the yo config file with new store attr, reducer, imports
      var config = this.config.getAll();
      config.newStoreAttrs.push(this.namelower + '?: ' + this.namelower + '.I' + this.storename + ';');
      config.newStoreReducers.push(this.namelower + ': ' + this.namelower + '.' + this.namelower + 'Reducer');
      config.newStoreImports.push("import * as "+ this.namelower +" from './"+ this.fname +"/index';");

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
    var templatePath = this.templatePath(base + 'templates/demo-app/client/store/index.ts'),
        config = this.config.getAll();
    if(config.apptype === 'starter-app') {
      templatePath = this.templatePath(base + 'templates/starter-app/client/store/index.ts');
    }
    this.fs.copyTpl(
      templatePath,
      this.destinationPath('client/store/index.ts'),
      { 
        fname: this.fname,
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
      this.destinationPath('client/store/' + this.fname + '/index.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename
      }
    );
    // Clone the template store types file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.types.ts'),
      this.destinationPath('client/store/' + this.fname + '/' + this.fname + '.types.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename
      }
    );
    // Clone the template store transformer file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.transformers.ts'),
      this.destinationPath('client/store/' + this.fname + '/' + this.fname + '.transformers.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename
      }
    );
    // Clone the template store reducer file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.reducer.ts'),
      this.destinationPath('client/store/' + this.fname + '/' + this.fname + '.reducer.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename,
        segmentname: this.segmentname
      }
    );
    // Clone the template store reducer spec file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.reducer.spec.ts'),
      this.destinationPath('client/store/' + this.fname + '/' + this.fname + '.reducer.spec.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename,
        segmentname: this.segmentname
      }
    );
    // Clone the template store initial-state file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.initial-state.ts'),
      this.destinationPath('client/store/' + this.fname + '/' + this.fname + '.initial-state.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename
      }
    );


    // Clone the template store actions file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.actions.ts'),
      this.destinationPath('client/' + this.segmentname + '/actions/' + this.fname + '/' + this.fname + '.actions.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename,
        actionsname: this.storename,
        segmentname: this.segmentname
      }
    );
    // Clone the template store actions spec file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/store-item/' + this.storetype + '/template.actions.spec.ts'),
      this.destinationPath('client/' + this.segmentname + '/actions/' + this.fname + '/' + this.fname + '.actions.spec.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename,
        actionsname: this.storename
      }
    );


  }
});
var Generator = require('yeoman-generator'),
	_ = require('lodash'),
  del = require('del');

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);
  	// The root of the yeoman project
  	this.base = '../../..';
    // // This makes `storename` not a required argument.
    this.argument('storename', { type: String, required: false });
  }

  prompting() {
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

      // save store data type
      this.storetype = answers.storetype;

      // Process to get naming convention camelcase and capitalized camelcase
      var tmp = _.camelCase(answers.storename);
      this.storename = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.storename);
      this.fname = _.kebabCase(this.storename);

      // Delete the existing store for retemplating
      del(['client/redux/store/index.ts']);

      // update the yo config file with new store attr, reducer, imports
      var config = this.config.getAll();
      config.newStoreAttrs.push(`${this.namelower}?: ${this.namelower}.I${this.storename};`);
      config.newStoreReducers.push(`${this.namelower}: ${this.namelower}.${this.namelower}Reducer`);
      config.newStoreImports.push(`import * as ${this.namelower} from './${this.fname}/index';`);

      this.config.set(config);
      this.config.save();

    }.bind(this));
  }

  editStore() { 
    // Get the new values for newComponents and newComponentImports
    this.newStoreAttrs = this.config.get('newStoreAttrs');
    this.newStoreReducers = this.config.get('newStoreReducers');
    this.newStoreImports = this.config.get('newStoreImports');

    // Get the app.module template and inject newComponents and newComponentImports
    var config = this.config.getAll();
    var templatePath = this.templatePath(`${this.base}/generators/app/templates/${config.apptype}/client/redux/store/index.ts`);

    this.fs.copyTpl(
      templatePath,
      this.destinationPath('client/redux/store/index.ts'),
      { 
        fname: this.fname,
        newStoreAttrs: this.newStoreAttrs,
        newStoreReducers: this.newStoreReducers,
        newStoreImports: this.newStoreImports
      }
    );
  }

  // Writes the application to the name of the project
  writing() {
    // Clone the template store index.ts file
    this.fs.copyTpl(
      this.templatePath(`${this.storetype}/template.index.ts`),
      this.destinationPath(`client/redux/store/${this.fname}/index.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename
      }
    );
    // Clone the template store types file
    this.fs.copyTpl(
      this.templatePath(`${this.storetype}/template.types.ts`),
      this.destinationPath(`client/redux/store/${this.fname}/${this.fname}.types.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename
      }
    );
    // Clone the template store transformer file
    this.fs.copyTpl(
      this.templatePath(`${this.storetype}/template.transformers.ts`),
      this.destinationPath(`client/redux/store/${this.fname}/${this.fname}.transformers.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename
      }
    );
    // Clone the template store reducer file
    this.fs.copyTpl(
      this.templatePath(`${this.storetype}/template.reducer.ts`),
      this.destinationPath(`client/redux/store/${this.fname}/${this.fname}.reducer.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename,
        segmentname: this.segmentname
      }
    );
    // Clone the template store reducer spec file
    this.fs.copyTpl(
      this.templatePath(`${this.storetype}/template.reducer.spec.ts`),
      this.destinationPath(`client/redux/store/${this.fname}/${this.fname}.reducer.spec.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename,
        segmentname: this.segmentname
      }
    );
    // Clone the template store initial-state file
    this.fs.copyTpl(
      this.templatePath(`${this.storetype}/template.initial-state.ts`),
      this.destinationPath(`client/redux/store/${this.fname}/${this.fname}.initial-state.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename
      }
    );


    // Clone the template store actions file
    this.fs.copyTpl(
      this.templatePath(`${this.storetype}/template.actions.ts`),
      this.destinationPath(`client/redux/actions/${this.fname}/${this.fname}.actions.ts`),
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
      this.templatePath(`${this.storetype}/template.actions.spec.ts`),
      this.destinationPath(`client/redux/actions/${this.fname}/${this.fname}.actions.spec.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        storename: this.storename,
        actionsname: this.storename
      }
    );


  }

}
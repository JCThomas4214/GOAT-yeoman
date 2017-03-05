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
    this.argument('modelname', { type: String, required: false });
  }

  prompting() {
    return this.prompt([{
      type    : 'list',
      name    : 'database',
      message : 'What database should the endpoint be generated to?',
      choices : res => this.config.get('databases'),
      when    : res => this.config.get('databases').length > 1
    }, {
      type    : 'input',
      name    : 'modelname',
      message : 'Your new model\'s name?',
      validate: input => input !== '',
      default : this.options.modelname
    }, {
      type    : 'checkbox',
      name    : 'authselect',
      message : 'Which api\'s need authentication?',
      choices : [
        'GET controller.index',
        'GET controller.show',
        'POST controller.create',
        'PUT controller.upsert',
        // 'PATCH controller.patch',
        'DELETE controller.destroy'
      ]
    }, {
      type    : 'confirm',
      name    : 'socketchoice',
      message : 'Would you like this endpoint to have socketio?'
    }]).then(function (answers) {

      // Delete the existing routes for retemplating
      del(['server/routes.ts']);

      this.database = answers.database || this.config.get('databases')[0];

      if (this.database === 'MongoDB')
        this.database = 'mongo-db';
      else if (this.database === 'Apache Cassandra')
        this.database = 'cassandra-db';
      else if (this.database === 'PostgresSQL')
        this.database = 'postgres-db';
      else if (this.database === 'MySQL')
        this.database = 'mysql-db';
      else if (this.database === 'MariaDB')
        this.database = 'maria-db';
      else if (this.database === 'SQLite')
        this.database = 'sqlite-db';
      else if (this.database === 'MSSQL')
        this.database = 'mssql-db';

      // Process to get naming convention camelcase and capitalized camelcase
      var tmp = _.camelCase(answers.modelname);
      this.modelname = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.modelname);
      this.fname = _.kebabCase(this.modelname);

      this.authselect = answers.authselect;
      this.socketchoice = answers.socketchoice;

      // set auth variables
      this.get_index = false;
      this.get_show = false;
      this.post_create = false;
      this.put_upsert = false;
      this.patch_patch = false;
      this.delete_destroy = false;

      if (this.database === this.config.get('defaultDb')) {       
       this.authImport = `../../auth/auth.service`; 
      } else {
        this.authImport = `../../../${this.config.get('defaultDb')}/auth/auth.service`;
      }

      for(let i = 0; i < this.authselect.length; i++) {
        switch(this.authselect[i]) {
          case 'GET controller.index':
            this.get_index = true;
            break;
          case 'GET controller.show': 
            this.get_show = true;
            break;
          case 'POST controller.create':
            this.post_create = true;
            break;
          case 'PUT controller.upsert':
            this.put_upsert = true;
            break;
          case 'PATCH controller.patch':
            this.patch_patch = true;
            break;
          case 'DELETE controller.destroy':
            this.delete_destroy = true;
            break;
        }
      }

      // update the yo config file with new store attr, reducer, imports
      var config = this.config.getAll();
      config.routerImports.push(`import {${this.namelower}Routes} from './${this.database}/api/${this.fname}/${this.fname}.router';`);
      config.expressRouters.push(`app.use('/api/${this.fname}s', ${this.namelower}Routes);`);

      if (this.socketchoice) {
        // Delete the existing socketio config for retemplating
        del(['server/socketio.ts']);
        config.socketImports.push(`import {${this.namelower}Register} from './${this.database}/api/${this.fname}/${this.fname}.socket';`);
        config.socketRegisters.push(`${this.namelower}Register(socket);`);
      }

      this.config.set(config);
      this.config.save();

    }.bind(this));
  }

  editRoutes() { 
    // Get the new values for newComponents and newComponentImports
    this.routerImports = this.config.get('routerImports');
    this.expressRouters = this.config.get('expressRouters');

    // Get the app.module template and inject newComponents and newComponentImports
    var config = this.config.getAll();
    var templatePath = this.templatePath(`${this.base}/generators/app/templates/server_files/routes.ts`);

    this.fs.copyTpl(
      templatePath,
      this.destinationPath('server/routes.ts'),
      { 
        fname: this.fname,
        routerImports: this.routerImports,
        expressRouters: this.expressRouters,
        defaultDb: config.defaultDb
      }
    );
  }

  editSockets() { 
    if (this.socketchoice) {
      // Get the new values for newComponents and newComponentImports
      this.socketImports = this.config.get('socketImports');
      this.socketRegisters = this.config.get('socketRegisters');

      // Get the app.module template and inject newComponents and newComponentImports
      var config = this.config.getAll();
      var templatePath = this.templatePath(`${this.base}/generators/app/templates/server_files/socketio.ts`);

      this.fs.copyTpl(
        templatePath,
        this.destinationPath('server/socketio.ts'),
        { 
          fname: this.fname,
          socketImports: this.socketImports,
          socketRegisters: this.socketRegisters
        }
      );
    }
  }

  // Writes the application to the name of the project
  writing() {
    // Clone the template endpoint controller.ts file
    this.fs.copyTpl(
      this.templatePath(`${this.database}/template.controller.ts`),
      this.destinationPath(`server/${this.database}/api/${this.fname}/${this.fname}.controller.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        modelname: this.modelname
      }
    );
    // Clone the template endpoint router.ts file
    this.fs.copyTpl(
      this.templatePath(`${this.database}/template.router.ts`),
      this.destinationPath(`server/${this.database}/api/${this.fname}/${this.fname}.router.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        modelname: this.modelname,

        authImport: this.authImport,
        authselect: this.authselect,
        get_index: this.get_index,
        get_show: this.get_show,
        post_create: this.post_create,
        put_upsert: this.put_upsert,
        patch_patch: this.patch_patch,
        delete_destroy: this.delete_destroy
      }
    );
    // Clone the template endpoint model.ts file
    this.fs.copyTpl(
      this.templatePath(`${this.database}/template.model.ts`),
      this.destinationPath(`server/${this.database}/api/${this.fname}/${this.fname}.model.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        modelname: this.modelname
      }
    );
    // Clone the template endpoint integration.ts file
    this.fs.copyTpl(
      this.templatePath(`${this.database}/template.integration.ts`),
      this.destinationPath(`server/${this.database}/api/${this.fname}/${this.fname}.integration.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        modelname: this.modelname,

        authselect: this.authselect,
        get_index: this.get_index,
        get_show: this.get_show,
        post_create: this.post_create,
        put_upsert: this.put_upsert,
        patch_patch: this.patch_patch,
        delete_destroy: this.delete_destroy
      }
    );
    // Clone the template endpoint integration.ts file
    this.fs.copyTpl(
      this.templatePath(`${this.database}/template.spec.ts`),
      this.destinationPath(`server/${this.database}/api/${this.fname}/${this.fname}.spec.ts`),
      { 
        fname: this.fname,
        namelower: this.namelower,
        modelname: this.modelname,

        authImport: this.authImport,
        authselect: this.authselect,
        get_index: this.get_index,
        get_show: this.get_show,
        post_create: this.post_create,
        put_upsert: this.put_upsert,
        patch_patch: this.patch_patch,
        delete_destroy: this.delete_destroy
      }
    );

    if (this.socketchoice) {
      // Clone the template endpoint events.ts file
      this.fs.copyTpl(
        this.templatePath(`${this.database}/template.events.ts`),
        this.destinationPath(`server/${this.database}/api/${this.fname}/${this.fname}.events.ts`),
        { 
          fname: this.fname,
          namelower: this.namelower,
          modelname: this.modelname
        }
      );
      // Clone the template endpoint socket.ts file
      this.fs.copyTpl(
        this.templatePath(`${this.database}/template.socket.ts`),
        this.destinationPath(`server/${this.database}/api/${this.fname}/${this.fname}.socket.ts`),
        { 
          fname: this.fname,
          namelower: this.namelower,
          modelname: this.modelname
        }
      );
    }
  }

}
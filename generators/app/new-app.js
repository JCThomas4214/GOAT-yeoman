function findDbFolder(database, dbs) {
  switch (database) {
    case 'MongoDB':
      dbs['mongo'] = true;
      return 'mongo-db';
    case 'Apache Cassandra':
      dbs['cassandra'] = true;
      return 'cassandra-db';
    case 'PostgresSQL':
      dbs['postgres'] = true;
      return 'postgres-db';
    case 'MySQL':
      dbs['mysql'] = true;
      return 'mysql-db';
    case 'MariaDB':
      dbs['maria'] = true;
      return 'maria-db';
    case 'MSSQL':
      dbs['mssql'] = true;
      return 'mssql-db';
    case 'SQLite':
      dbs['sqlite'] = true;
      return 'sqlite-db';
  }
}

module.exports = {
  
  afterPrompt(generator, answers) {
    generator.apptype = answers.databases.length > 0 ? 'starter-app' : 'dbless-app';
    generator.serverrender = answers.haveUniversal;
    generator.appname = answers.appname;
    generator.appdescription = answers.appdescription;
    generator.appkeywords = answers.appkeywords;

    generator.analytics = answers.analytics;
    generator.protocol = answers.protocol;

    generator.dbs = {
      mongo: false,
      cassandra: false,
      postgres: false,
      mysql: false,
      mssql: false,
      sqlite: false,
      maria: false,
      ssr: generator.serverrender
    };

    generator.databases = answers.databases; // initializing databases to scope
    // if defaultDb is defined then set the scope variable
    if (answers.defaultDb) generator.defaultDb = findDbFolder(answers.defaultDb, generator.dbs);
    // else only one database was selected, define as that
    else generator.defaultDb = findDbFolder(generator.databases[0], generator.dbs);

    generator.dbs.defaultDb = generator.defaultDb;
    generator.dbs.protocol = generator.protocol === 'http' ? false : true;
    generator.dbs.routerImports = [];
    generator.dbs.expressRouters = [];
    generator.dbs.socketImports = [];
    generator.dbs.socketRegisters = [];

    generator.dbFolders = [];

    for (let x = 0; x < generator.databases.length; x++) {
      generator.dbFolders.push(findDbFolder(generator.databases[x], generator.dbs));
    }

    // console.log(generator.defaultDb);
    // console.log(generator.dbFolders);
    // console.log(generator.dbs);

    generator.config.set({
      modules: [
        'core',
        'home',
        'user-profile',
        '404',
        'shared',
      ],
      subModules: {
        'core': [],
        'home': [],
        'user-profile': [],
        '404': [],
        'shared': []
      },

      newStoreImports: [],
      newStoreAttrs: [],
      newStoreReducers: [],

      routerImports: [],
      expressRouters: [],
      socketImports: [],
      socketRegisters: [],

      apptype: generator.apptype,
      appname: generator.appname,
      appdescription: generator.appdescription,
      appkeywords: generator.appkeywords,
      protocol: generator.protocol === 'https',
      analytics: generator.analytics ? generator.analytics.replace(/(\r\n|\n|\r)/gm, '') : '',
      defaultDb: generator.defaultDb,
      dbFolders: generator.dbFolders,
      databases: generator.databases
    });
    generator.config.save();
  },

  writing(generator, glob) {
    generator.log(generator.destinationRoot());
    if (generator.apptype === 'starter-app') {
      for (let x = 0; x < generator.dbFolders.length; x++) {
        if (generator.dbFolders[x] === generator.defaultDb) {
          generator.fs.copy( // if default, copy the database folder
            generator.templatePath(generator.dbFolders[x]),
            generator.destinationPath(`server/${generator.dbFolders[x]}`)
          );
        } else {
          generator.fs.copy( //copy the database specific index file
            generator.templatePath(`${generator.dbFolders[x]}/index.ts`),
            generator.destinationPath(`server/${generator.dbFolders[x]}/index.ts`)
          );
          generator.fs.copy( // copy the empty seed file template
            generator.templatePath('seed.ts'),
            generator.destinationPath(`server/${generator.dbFolders[x]}/seed.ts`)
          );
        }
      }

      // Write the generic config templates
      generator.fs.copyTpl(
        generator.templatePath('common_config'),
        generator.destinationPath('config'),
        generator.dbs
      );

      // Write the generic server templates
      generator.fs.copyTpl(
        generator.templatePath('server_files'),
        generator.destinationPath('server'),
        generator.dbs
      );
    }

    if (generator.serverrender === true) {
      // Write the necessary universal server files
      generator.fs.copyTpl(
        generator.templatePath('server_render_files/server'),
        generator.destinationPath('server'),
        generator.dbs
      );
      // Write the necessary universal client files
      generator.fs.copyTpl(
        generator.templatePath('server_render_files/client'),
        generator.destinationPath('client/modules'),
        generator.dbs
      );
    }
    
    // Write the application template
    generator.fs.copyTpl(
      glob.sync(`${generator.templatePath()}/${generator.apptype}/**/**/**/*.!(svg|jpg|png|woff|woff2)`),
      generator.destinationPath(),
      generator.config.getAll()
    );

    // Copy over the application assets
    generator.fs.copy(
      glob.sync(`${generator.templatePath()}/${generator.apptype}/public/*`),
      generator.destinationPath('public')
    );
  },

    // Starts npm install
    installNpm(generator) {
      let hasSequl = false;
      let addPackages = [];
  
      if (generator.dbs.mongo) {
        addPackages.push('@types/mongoose');
        addPackages.push('@types/mongodb');
        addPackages.push('mongoose');
        addPackages.push('mongodb');
        addPackages.push('connect-mongo');
      }
      if (generator.dbs.cassandra) {
        addPackages.push('cassandra-driver');
      }
      if (generator.dbs.postgres) {
        addPackages.push('@types/sequelize');
        addPackages.push('sequelize');
        addPackages.push('pg');
        addPackages.push('pg-hstore');
      }
      if (generator.dbs.mysql || generator.dbs.maria) {
        addPackages.push('@types/sequelize');
        addPackages.push('sequelize');
        addPackages.push('mysql');
      }
      if (generator.dbs.sqlite) {
        addPackages.push('@types/sequelize');
        addPackages.push('sequelize');
        addPackages.push('sqlite3');
      }
      if (generator.dbs.mssql) {
        addPackages.push('@types/sequelize');
        addPackages.push('sequelize');
        addPackages.push('tedious');
      }
  
      generator.npmInstall(addPackages);
      generator.npmInstall();
    },

    httpsCerts(generator, exec) {
        exec('cd config/other && generate-ssl-certs.sh', (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
        });
    }


}
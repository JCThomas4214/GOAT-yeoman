function findDbFolder(database, dbs) {
    switch(database) {
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
        generator.apptype                 = answers.databases.length > 0 ? 'starter-app' : 'dbless-app';
        generator.serverrender            = answers.haveUniversal;
        generator.appname                 = answers.appname;
        generator.appdescription          = answers.appdescription;
        generator.appkeywords             = answers.appkeywords;
  
        generator.analytics               = answers.analytics;
        generator.protocol                = answers.protocol;
  
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
          modules            : [
            'core',
            'home',
            'user-profile',
            '404',
            'shared',
          ],
          subModules          : {
            'core': [],
            'home': [],
            'user-profile': [],
            '404': [],
            'shared': []
          },
  
          newStoreImports     : [],
          newStoreAttrs       : [],
          newStoreReducers    : [],
  
          routerImports       : [],
          expressRouters      : [],
          socketImports       : [],
          socketRegisters     : [],
  
          apptype             : generator.apptype,
          appname             : generator.appname,
          appdescription      : generator.appdescription,
          appkeywords         : generator.appkeywords,
          protocol            : generator.protocol === 'https',
          analytics           : generator.analytics ? generator.analytics.replace(/(\r\n|\n|\r)/gm, '') : '',
          defaultDb           : generator.defaultDb,
          dbFolders           : generator.dbFolders,
          databases           : generator.databases
        });
        generator.config.save();
    }
}
module.exports = function (appname, chalk) {

    return [{
        type: 'list',
        name: 'welcome',
        message: `Select from the options below`,
        choices: [
            { type: 'separator', line: '----------- Start here --------------------' },
            { name: `Generate a new app`, value: 'newApp' },
            { name: 'Add boilerplate to an existing app', value: 'boilerplate' },
            { type: 'separator', line: '----------- Resources --------------------' },
            { name: 'View Documentation', value: 'viewDocs' },
            { name: 'View Demo App', value: 'demo' },
            { type: 'separator', line: '----------- Get involved -----------------' },
            { name: 'Report a Bug', value: 'bug' },
            { type: 'separator', line: '----------- Created By -------------------' },
            { name: 'Christopher Haugen', value: 'ch' },
            { name: 'Jason Thomas', value: 'jt' },
            { type: 'separator', line: '----------- Custom optimizations, tailored for your use-case! ------------' },
            { name: 'It\'s dangerous to go alone! Hire us', value: 'hire' }
        ]
    },
    // newApp prompts
    {
        type: 'checkbox',
        name: 'databases',
        message: 'Select what databases you would like to use.' + chalk.yellow.bold('\n\n  **If no databases are selected the generated stack will be a dbless solution**\n'),
        choices: ['MongoDB', 'Apache Cassandra', 'PostgreSQL', 'MySQL', 'MariaDB', 'SQLite', 'MSSQL'],
        when: res => res.welcome === 'newApp'
    }, {
        type: 'confirm',
        name: 'haveFirebase',
        message: 'Would you like to use FireBase on your Client-Side?',
        when: res => res.welcome === 'newApp' && res.databases.length === 0
    }, {
        type: 'list',
        name: 'defaultDb',
        message: 'What will be your default database?',
        choices: res => res.databases,
        when: res => res.welcome === 'newApp' && res.databases.length > 1
    }, {
        type: 'confirm',
        name: 'haveUniversal',
        message: 'Would you like to use Angular Universal for server side rendering?',
        when: res => res.welcome === 'newApp'
    }, {
        type: 'input',
        name: 'appname',
        message: 'Your new project\'s name?',
        default: appname,
        when: res => res.welcome === 'newApp'
    }, {
        type: 'input',
        name: 'appdescription',
        message: 'Your new project\'s description?',
        default: 'The Greatest of All Time Stack!',
        when: res => res.welcome === 'newApp'
    }, {
        type: 'input',
        name: 'appkeywords',
        message: 'Your new project\'s keywords (comma between each word)?',
        default: 'redux, immutable, node, mongo, express, angular2, ng2, angular4, ng4, jasmine, karma, protractor, socketio, MEAN, webapp, Web Application',
        when: res => res.welcome === 'newApp'
    }, {
        type: 'list',
        name: 'protocol',
        message: 'What type of URL protocol would you like to use?',
        choices: ['http', 'https'],
        when: res => res.databases.length > 0,
        when: res => res.welcome === 'newApp'
    }, {
        type: 'confirm',
        name: 'analyticschoice',
        message: 'Would you like to add Google Analytics?',
        when: res => res.welcome === 'newApp'
    }, {
        type: 'editor',
        name: 'analytics',
        message: 'Paste the Google Analytics script (including script tags) then save => exit!',
        when: res => res.welcome === 'newApp' && res.analyticschoice
    },

    //View Documentation prompts
    {
        type: 'checkbox',
        name: 'docs',
        message: 'Select the Documentation you would like to navigate to',
        choices: [
            { name: 'GOATstack - Yeoman generator', value: 'goatyeoman' },
            { name: 'GOATstack - Source', value: 'goatstack' },
            { name: 'Third Party Docs', value: '3rd' }
        ],
        when: res => res.welcome === 'viewDocs'
    },
    {
        type: 'checkbox',
        name: 'thirdParty',
        message: 'Select the third party Documentation you would like to navigate to',
        choices: [

            { type: 'separator', line: '----------- Languages --------------------' },
            { name: 'TypeScript', value: 'ts' },
            { name: 'JavaScript', value: 'js' },

            { type: 'separator', line: '----------- Build Tools --------------------' },
            { name: 'npm', value: 'npm' },
            { name: 'Gulp', value: 'gulp' },

            { type: 'separator', line: '----------- Front End --------------------' },
            { name: 'Angular', value: 'ng' },
            { name: 'Redux', value: 'redux' },
            { name: 'RxJs', value: 'rx' },
            { name: 'Immutable', value: 'immutable' },
            { name: 'SocketIO', value: 'socket' },

            { type: 'separator', line: '----------- Servers --------------------' },
            { name: 'NodeJS', value: 'node' },
            { name: 'Express.js', value: 'express' },
            { name: 'SocketIO', value: 'socket' },
            { name: 'Mongoose', value: 'mongoose' },
            { name: 'Sequelize', value: 'sequelize' },
            { name: 'Passport', value: 'pass' },
            { name: 'Cassandra Driver', value: 'cassdriver' },

            { type: 'separator', line: '----------- Databases --------------------' },
            { name: 'MongoDB', value: 'mongo' },
            { name: 'Apache Cassandra', value: 'cass' },
            { name: 'PostgreSQL', value: 'postgre' },
            { name: 'MySQL', value: 'mysql' },
            { name: 'MariaDB', value: 'maria' },
            { name: 'SQLite', value: 'sqlite' },
            { name: 'MSSQL', value: 'mssql' },

            { type: 'separator', line: '----------- Testing Tools --------------------' },
            { name: 'Jasmine', value: 'jasmine' },
            { name: 'Karma', value: 'karma' },
            { name: 'Protractor', value: 'protractor' }
        ],
        when: res => {
            if (res.docs) {
                if(res.docs.indexOf('3rd') > -1)
                    return true
                else
                    return false
            } else
                return false
        }
    }]
}

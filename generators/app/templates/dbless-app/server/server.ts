let express = require('express');

import * as chalk from 'chalk';
import * as fs from 'graceful-fs';
import * as http from 'http';
import config from '../config';

import expressInit from './express';

// Initialize express
let app = express();

function init(): any {

    // Initialize http server
    let server: any = http.createServer(app);

    // Initialize express features
    expressInit(app);


    // Start the server on port / host
    server.listen(config.port, config.host, () => {
      let host = server.address().address;
      let port = server.address().port;

      if (process.env.NODE_ENV !== 'test') {
        // Logging initialization\
        console.log(chalk.bold.cyan(`\n\tEnvironment:\t\t\t ${ process.env.NODE_ENV || 'production' }`));

        console.log(chalk.bold.magenta(`\n\thttp Server`));
        console.log(chalk.bold.gray(`\tServer Address:\t\t\t http://localhost:${ port }`));

      }
    });

    return app;

};

init();

// export express app for testing
export default app;

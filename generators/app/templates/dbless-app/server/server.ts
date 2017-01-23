import * as express from 'express';
import * as chalk from 'chalk';
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
        console.log(chalk.bold.cyan(`\n\tEnvironment:\t\t\t ${ process.env.NODE_ENV || 'production' }`));
      
        if (!process.env.NODE_ENV)
          console.log(
            chalk.bold.magenta(`\tHTTP Server`) +
            chalk.bold.gray(`\n\tServer Address:\t\t\t http://localhost:${ port }\n`));
      }
    });

    return app;
};

init();

// export express app for testing
export default app;

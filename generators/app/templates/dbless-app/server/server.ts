import * as express from 'express'
import * as chalk from 'chalk';
import * as fs from 'graceful-fs';
import * as http from 'http';
import * as https from 'https';
import config from '../config';

import expressInit from './express';

// Initialize express
let app = express();

// Angular universal server side rendering
if (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {
  require('./server-render').serverSideRendering(app);
}

function init(): any {
  // Initialize http server
  let server: any = http.createServer(app);

  expressInit(app);

  server.listen(config.port, config.host, () => {
    let host = server.address().address;
    let port = server.address().port;

    if (process.env.NODE_ENV !== 'test') {
      console.log(
        chalk.default.bold.cyan(`\n\tEnvironment:\t\t\t ${ process.env.NODE_ENV || 'production' }`));
    
      if (!process.env.NODE_ENV)
        console.log(
          chalk.default.bold.magenta(`\tHTTP Server`) +
          chalk.default.bold.gray(`\n\tServer Address:\t\t\t http://localhost:${ port }\n`));
    }
  });
};

init();

// export express app for testing
export default app;

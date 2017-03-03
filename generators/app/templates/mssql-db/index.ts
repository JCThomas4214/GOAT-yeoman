"use strict";
import config from "../../config";
import Sequelize from "sequelize";
import seed from "./seed";

//initilize the database
let sequelize = new Sequelize(config.mssql.database, config.mssql.username, config.mssql.password, config.mssql.options);

export default sequelize;

// Initialize sequelize
export function mssqlConnect() {
  sequelize.sync().then(function() {

      // seed sequelize
      if (config.seedDB) {
        seed(process.env.NODE_ENV);
      }

  });
};

export function mssqlDisconnect() {

};

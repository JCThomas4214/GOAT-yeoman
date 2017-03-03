"use strict";
import config from "../../config";
import Sequelize from "sequelize";
import sqlSeed from "./seed";

//initilize the database
let sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, config.mysql.options);

export default sequelize;

// Initialize sequelize
export function mysqlConnect() {
  sequelize.sync().then(function() {

      // seed sequelize
      if (config.seedDB) {
        process.env.NODE_ENV === 'production' ? sqlSeed('prod') : sqlSeed();
      }

  });
};

export function mysqlDisconnect() {

};

"use strict";
import config from "../../config";
import Sequelize from "sequelize";
import sqlSeed from "./seed";

//initilize the database
let sequelize = new Sequelize(config.sqlite.database, config.sqlite.username, config.sqlite.password, config.sqlite.options);

export default sequelize;

// Initialize sequelize
export function sqliteConnect() {
  sequelize.sync().then(function() {

      // seed sequelize
      if (config.seedDB) {
        process.env.NODE_ENV === 'production' ? sqlSeed('prod') : sqlSeed();
      }

  });
};

export function sqliteDisconnect() {

};

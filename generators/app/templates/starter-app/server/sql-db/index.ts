"use strict";
import config from "../../config";
import Sequelize from "sequelize";
import sqlSeed from "./seed";

//initilize the database
let sequelize = new Sequelize(config.sql.database, config.sql.username, config.sql.password, config.sql.options);

export default sequelize;

// Initialize sequelize
export function sequelizeConnect() {
  sequelize.sync().then(function() {

      // seed sequelize
      if (config.seedDB) {
        process.env.NODE_ENV === 'production' ? sqlSeed('prod') : sqlSeed();
      }

  });
};

export function sequelizeDisconnect() {

};

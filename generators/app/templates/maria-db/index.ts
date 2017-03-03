"use strict";
import config from "../../config";
import Sequelize from "sequelize";
import seed from "./seed";

//initilize the database
let sequelize = new Sequelize(config.maria.database, config.maria.username, config.maria.password, config.maria.options);

export default sequelize;

// Initialize sequelize
export function mariaConnect() {
  sequelize.sync().then(function() {

      // seed sequelize
      if (config.seedDB) {
        seed(process.env.NODE_ENV);
      }

  });
};

export function mariaDisconnect() {

};

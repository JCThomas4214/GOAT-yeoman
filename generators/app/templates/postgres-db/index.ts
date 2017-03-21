"use strict";
import config from "../../config";
import Sequelize from "sequelize";

import * as Rx from 'rxjs';

//initilize the database
let sequelize = new Sequelize(config.postgres.database, config.postgres.username, config.postgres.password, config.postgres.options);

export default sequelize;

// Initialize sequelize
export function postgresConnect() {
	return Rx.Observable.create(observer => {
		sequelize.sync().then(function() {

		    observer.next();
		    observer.complete();

		}).catch(err => observer.error(err));
	});
};

export function postgresDisconnect() {

};

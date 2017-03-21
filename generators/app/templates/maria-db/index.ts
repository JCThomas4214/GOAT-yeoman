"use strict";
import config from "../../config";
import Sequelize from "sequelize";

import * as Rx from 'rxjs';

//initilize the database
let sequelize = new Sequelize(config.maria.database, config.maria.username, config.maria.password, config.maria.options);

export default sequelize;

// Initialize sequelize
export function mariaConnect() {
	return Rx.Observable.create(observer => {
		sequelize.sync().then(function() {

		    observer.next();
		    observer.complete();

		}).catch(err => observer.error(err));
	});
};

export function mariaDisconnect() {

};

"use strict";
import config from "../../config";
import Sequelize from "sequelize";

import * as Rx from 'rxjs';

//initilize the database
let sequelize = new Sequelize(config.mssql.database, config.mssql.username, config.mssql.password, config.mssql.options);

export default sequelize;

// Initialize sequelize
export function mssqlConnect() {
	return Rx.Observable.create(observer => {
		sequelize.sync().then(function() {

		    observer.next();
		    observer.complete();

		}).catch(err => observer.error(err));
	});
};

export function mssqlDisconnect() {

};

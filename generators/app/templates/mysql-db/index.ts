import config from "../../config";
import Sequelize from "sequelize";

import * as Rx from 'rxjs';

//initilize the database
let sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, config.mysql.options);

export default sequelize;

// Initialize sequelize
export function mysqlConnect() {
	return Rx.Observable.create(observer => {
		sequelize.sync().then(function() {

		    observer.next();
		    observer.complete();

		}).catch(err => observer.error(err));
	});
};

export function mysqlDisconnect() {

};

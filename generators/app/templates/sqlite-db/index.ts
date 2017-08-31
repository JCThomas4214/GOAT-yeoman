import config from "../../config";
import Sequelize from "sequelize";

import * as Rx from 'rxjs';

//initilize the database
let sequelize = new Sequelize(config.sqlite.database, config.sqlite.username, config.sqlite.password, config.sqlite.options);

export default sequelize;

// Initialize sequelize
export function sqliteConnect() {
	return Rx.Observable.create(observer => {
		sequelize.sync().then(function() {

		    observer.next();
		    observer.complete();

		}).catch(err => observer.error(err));
	});
};

export function sqliteDisconnect() {

};

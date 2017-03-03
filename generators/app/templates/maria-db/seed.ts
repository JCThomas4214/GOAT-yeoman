/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import User from './api/user/user.model';

export default function seed(env?: string): void {

  // Insert seeds below
  switch (env) {
    case "development":
      User.destroy({where: {}}).then(() => {
      		User.create({
  			    username: 'AdMiN',
  			    firstname:'admin',
  			    lastname: 'admin',
  			    email:    'admin@admin.com',
  			    role:     'admin',
  			    password: 'admin1'
  			  });
      	});
      break;
    case "test":
      // code...
      break;
    default:
      // code...
      break;
  }

}

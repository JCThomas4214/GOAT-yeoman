import User from './api/user/user.model';

export default function sqlSeed(env?: string): void {
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
}

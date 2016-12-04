/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import User from '../../server/api/user/user.model';

export function seed() {
  User.find({}).remove()
    .then(() => {
      User.create({
        userName: 'AdMiN',
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        password: 'admin1'
      }, {
          userName: 'test',
          firstName: 'testFirst',
          lastName: 'testLast',
          email: 'test@test.com',
          password: 'test'
        }, {
          userName: 'Atheteo',
          firstName: 'Jason',
          lastName: 'Thomas',
          email: 'jc.thomas4214@gmail.com',
          password: 'flight1855'
        });
    });
}

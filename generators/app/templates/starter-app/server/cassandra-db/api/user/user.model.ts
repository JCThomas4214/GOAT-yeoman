import * as crypto from 'crypto';
import {cassandra, Schema, uuid, toTimeStamp, now} from 'cassmask';

let User = new Schema('Users', {
	email: cassandra.TEXT,
	password: cassandra.TEXT,
	created: {
		Type: cassandra.TIMESTAMP,
		Default: toTimeStamp(now())
	},

	username: cassandra.TEXT,
	firstname: cassandra.TEXT,
	lastname: cassandra.TEXT,
	role: {
		Type: cassandra.TEXT,
		Default: 'user'
	},

	facebook: cassandra.TEXT,
	google: cassandra.TEXT,
	github: cassandra.TEXT,
	salt: cassandra.TEXT,
	keys: ['email', 'created', 'password', 'salt']
});

User.pre(['create', 'update'], function(next, err) {
	if (!this.password) {
	  	return next();
	}
	// Make salt with a callback
    this.makeSalt((saltErr, salt) => {
      if (saltErr) {
        return err(saltErr);
      }
      this.salt = salt;
      this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
        if (encryptErr) {
          return err(encryptErr);
        }
        this.password = hashedPassword;
        next();
      });
    });
});

User.helper.methods({

	authenticate(password, callback) {
		if (!callback) {
		  return this.password === this.encryptPassword(password);
		}

		this.encryptPassword(password, (err, pwdGen) => {
	      if (err) {
	        return callback(err);
	      }

	      if (this.password === pwdGen) {
	        callback(null, true);
	      } else {
	        callback(null, false);
	      }
	    });
	},

	makeSalt(byteSize, callback): any {
	  let defaultByteSize = 16;

	  if (typeof byteSize === 'function') {
	    callback = byteSize;
	    byteSize = defaultByteSize;
	  }

	  if (!byteSize) {
	    byteSize = defaultByteSize;
	  }
	  
	  if (!callback) {
	    return crypto.randomBytes(byteSize).toString('base64');
	  }

	  return crypto.randomBytes(byteSize, (err, salt) => {
        if (err) {
          callback(err);
        } else {
          callback(null, salt.toString('base64'));
        }
      });
	},

	encryptPassword(password, callback): any {
	  if (!password || !this.salt) {
	    if (!callback) {
		  return null;
		} else {
		  return callback('Missing password or salt');
		}
	  }

	  const defaultIterations = 10000;
	  const defaultKeyLength = 64;
	  const salt = new Buffer(this.salt, 'base64');

	  if (!callback) {
	    return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha512')
	      .toString('base64');
	  }

	  return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha512', (err, key) => {
	    if (err) {
	      callback(err);
	    } else {
	      callback(null, key.toString('base64'));
	    }
	  });
	}
});

export default User;
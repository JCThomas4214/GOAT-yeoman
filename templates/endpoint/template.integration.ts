import app from '../../server';
import request = require('supertest');

<% if(authselect.length) { %>import User from '../user/user.model';<% } %>
import <%= modelname %> from './<%= fname %>.model';

let addr = app.get('address');

describe('<%= modelname %> API:', function() {
	let new<%= modelname %>s;
	<% if(authselect.length) { %>
	let token;

	beforeAll(function (done) {
	  request(addr)
	    .post('/auth/local')
	    .send({
	      email: 'Fakie@mrfake.com',
	      password: 'mrfakie'
	    })
	    .expect(200)
	    .expect('Content-Type', /json/)
	    .end((err, res) => {
	      if (err) {
	        done.fail(err);
	      } else {
	        token = res.body.token;
	        done();
	      }
	    });
	});
	<% } %>

	// <%= namelower %>s are cleared from DB
	beforeAll(() => {
	  <%= modelname %>.remove({});
	});



	describe('POST /api/<%= fname %>s', () => {
		beforeAll((done) => {
			request(addr)
				.post('/api/<%= fname %>s')
				<% if(post_create) { %>.set('authorization', 'Bearer ' + token)<% } %>
				.send({
					name: '<%= namelower %>',
					info: 'new <%= modelname %>'
				})
				.expect(201)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						done.fail(err);
					}
					new<%= modelname %>s = res.body;
					done();
				});
		});

		it('should POST the new <%= namelower %>', () => {
			expect(new<%= modelname %>s.name).toBe('<%= namelower %>');
			expect(new<%= modelname %>s.info).toBe('new <%= modelname %>');
		});
	});

	describe('GET /api/<%= fname %>s', () => {
		let <%= modelname %>s;

		beforeAll((done) => {
			request(addr)
				.get('/api/<%= fname %>s')
				<% if(get_index) { %>.set('authorization', 'Bearer ' + token)<% } %>
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						done.fail(err);
					}
					<%= modelname %>s = res.body;
					done();
				});
		});

		// This response should be an array
		it('should respond with JSON array', function() {
		  expect(<%= modelname %>s).toEqual(jasmine.any(Array));
		});

		it('should GET the all <%= namelower %>', () => {
			expect(<%= modelname %>s[0].name).toBe('<%= namelower %>');
			expect(<%= modelname %>s[0].info).toBe('new <%= modelname %>');
		});
	});

	describe('GET /api/<%= fname %>s/:id', () => {
		let <%= modelname %>s;

		beforeAll((done) => {
			request(addr)
				.get('/api/<%= fname %>s/' + new<%= modelname %>s._id)
				<% if(get_show) { %>.set('authorization', 'Bearer ' + token)<% } %>
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						done.fail(err);
					}
					<%= modelname %>s = res.body;
					done();
				});
		});

		it('should GET a <%= namelower %>', () => {
			expect(<%= modelname %>s.name).toBe('<%= namelower %>');
			expect(<%= modelname %>s.info).toBe('new <%= modelname %>');
		});
	});

	describe('PUT /api/<%= fname %>s/:id', () => {
		let <%= modelname %>s;

		beforeAll((done) => {
			request(addr)
				.put('/api/<%= fname %>s/' + new<%= modelname %>s._id)
				<% if(put_upsert) { %>.set('authorization', 'Bearer ' + token)<% } %>
				.send({
					name: '<%= namelower %> updated',
					info: 'new <%= modelname %> updated'
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						done.fail(err);
					}
					<%= modelname %>s = res.body;
					done();
				});
		});

		it('should be an <%= namelower %>', () => {
			expect(<%= modelname %>s.name).toBe('<%= namelower %> updated');
			expect(<%= modelname %>s.info).toBe('new <%= modelname %> updated');
		});
	});

	describe('DELETE /api/<%= fname %>s/:id', () => {
		let <%= modelname %>s;

		beforeAll((done) => {
			request(addr)
				.delete('/api/<%= fname %>s/' + new<%= modelname %>s._id)
				<% if(delete_destroy) { %>.set('authorization', 'Bearer ' + token)<% } %>
				.expect(204)
				.end((err, res) => {
					if (err) {
						done.fail(err);
					}
					done();
				});
		});

		it('should respond with 404 not found', (done) => {
			request(addr)
				.get('/api/<%= fname %>s/' + new<%= modelname %>s._id)
				<% if(get_index) { %>.set('authorization', 'Bearer ' + token)<% } %>
				.expect(404)
				.end((err, res) => {
					if (err) {
						done.fail(err);
					}
					done();
				});
		});
	});
});
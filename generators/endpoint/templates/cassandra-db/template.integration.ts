import app from '../../../server';
import request = require('supertest');

import DbModel from '../../db.model';
import DbStmts from '../../prepared.statements';
import <%= modelname %>Model from './<%= fname %>.model';
import <%= modelname %>Stmts from './<%= fname %>.statements';

const TimeUuid = require('cassandra-driver').types.TimeUuid;

const testKeyspace: string = DbStmts.testKeyspace;
const <%= namelower %>Table: string = <%= modelname %>Stmts.<%= namelower %>Table;
const truncate<%= modelname %>Table: string = <%= modelname %>Stmts.truncate<%= modelname %>Table;
const seed<%= modelname %>Table: Array<{ query: string, params: Array<string> }> = <%= modelname %>Stmts.seed<%= modelname %>Table;
const queryOptions: object = {prepared:true};

describe('<%= modelname %> API:', function() {
	let all<%= modelname %>;

	<% if(authselect.length) { %>
	let token;

	beforeAll(function (done) {
	  request(app)
	    .post('/auth/local')
	    .send({
	      email: 'test@test.com',
	      password: 'test1'
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

	// Seed the <%= modelname %> table
	beforeAll((done) => {
		DbModel.keyspace(testKeyspace)
        .then(result => {
          console.log('Int test: Test keyspace ready to seed!');
          // list all your batch queries here by table
          DbModel.seed(<%= namelower %>Table, truncate<%= modelname %>Table, seed<%= modelname %>Table, queryOptions)
            .then(result => {
				console.log('Int Test: <%= namelower %> Table seeded succesfully!');
				return done();
			})
            .catch(err => done.fail(err));
        })
        .catch(err => done.fail(err));
	});



	describe('POST /api/<%= fname %>', () => {
		let <%= namelower %>: {name: string, timeid: string};
		let timeid: string;
		beforeAll((done) => {
			timeid = String(TimeUuid.now());
			request(app)
				.post('/api/<%= fname %>')
				<% if(post_create) { %>.set('authorization', 'Bearer ' + token)<% } %>
				.send({
					name: '<%= modelname %>5',
					timeid: timeid
				})
				.expect(201)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						done.fail(err);
					}
					<%= modelname %>Model.findRowByKey(timeid)
						.then(result => {
							<%= namelower %> = result.rows[0];
							done();
						})
						.catch(err => {
							done.fail(err);
						});
				});
		});

		it('should POST a new row to the <%= namelower %> table', () => {
			expect(<%= namelower %>.name).toBe('<%= modelname %>5');
			expect(String(<%= namelower %>.timeid)).toBe(timeid);
		});
	});

	describe('GET /api/<%= fname %>', () => {

		beforeAll((done) => {
			request(app)
				.get('/api/<%= fname %>')
				<% if(get_index) { %>.set('authorization', 'Bearer ' + token)<% } %>
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						done.fail(err);
					}
					all<%= modelname %> = res.body;
					done();
				});
		});

		// This response should be an array
		it('should respond with JSON array', function() {
		  expect(all<%= modelname %>).toEqual(jasmine.any(Array));
		});

		it('should GET all <%= namelower %> rows', () => {
			expect(all<%= modelname %>.length).toBe(seed<%= modelname %>Table.length);
		});
	});

	describe('GET /api/<%= fname %>/:timeid', () => {
		let <%= namelower %>: {name: string, timeid: string};

		beforeAll((done) => {
			request(app)
				.get('/api/<%= fname %>/' + seed<%= modelname %>Table[0].params[0])
				<% if(get_show) { %>.set('authorization', 'Bearer ' + token)<% } %>
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						done.fail(err);
					}
					<%= namelower %> = res.body;
					done();
				});
		});

		it('should GET a <%= namelower %>', () => {
			expect(<%= namelower %>.name).toBe('<%= modelname %>');
			expect(<%= namelower %>.timeid).toBe(seed<%= modelname %>Table[0].params[0]);
		});
	});

	describe('PUT /api/<%= fname %>/:timeid', () => {
		let <%= namelower %>: {name: string, timeid: string};

		beforeAll((done) => {
			request(app)
				.put('/api/<%= fname %>/' + seed<%= modelname %>Table[1].params[0])
				<% if(put_upsert) { %>.set('authorization', 'Bearer ' + token)<% } %>
				.send({
					name: '<%= namelower %> updated',
					timeid: seed<%= modelname %>Table[1].params[0]
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						done.fail(err);
					}
					<%= namelower %> = res.body;
					done();
				});
		});

		it('should be a(n) <%= namelower %>', () => {
			expect(<%= namelower %>.name).toBe('<%= namelower %> updated');
			expect(<%= namelower %>.timeid).toBe(seed<%= modelname %>Table[1].params[0]);
		});
	});

	describe('DELETE /api/<%= fname %>/:id', () => {

		beforeAll((done) => {
			request(app)
				.delete('/api/<%= fname %>/' + seed<%= modelname %>Table[2].params[0])
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
			request(app)
				.get('/api/<%= fname %>/' + seed<%= modelname %>Table[2].params[0])
				<% if(get_show) { %>.set('authorization', 'Bearer ' + token)<% } %>
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
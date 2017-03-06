import proxyquire = require('proxyquire');
let pq = proxyquire.noPreserveCache();
import sinon = require('sinon');

// <%= namelower %>CtrlStub is used to mimic the router
let <%= namelower %>CtrlStub = {
  index: '<%= namelower %>Ctrl.index',
  show: '<%= namelower %>Ctrl.show',
  create: '<%= namelower %>Ctrl.create',
  upsert: '<%= namelower %>Ctrl.upsert',
  // patch: '<%= namelower %>Ctrl.patch',
  destroy: '<%= namelower %>Ctrl.destroy',
};
<% if(authselect.length) { %>
// mimic the auth service
let authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};
<% } %>

// routerStub spys on http RESTFUL requests
let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  patch: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
// proxyquire simulates the request
// initialize proxyquire
let <%= namelower %>Index = pq('./<%= fname %>.router.js', {
  'express': {
    Router() {
      return routerStub;
    }
  },
  './<%= fname %>.controller': <%= namelower %>CtrlStub,
  <% if(authselect.length) { %>'<%- authImport %>': authServiceStub<% } %>
});

describe('<%= modelname %> API Router:', function() {

  // expects the prozyquire routes to equal the routes it was assigned to
  it('should return an express router instance', function() {
    expect(<%= namelower %>Index.<%= namelower %>Routes).toEqual(routerStub);
  });

  describe('POST /api/<%= fname %>s', function() {

    // expect with each request the approapriate endpoint was called
    it('should route to <%= namelower %>.controller.create', function() {
      expect(routerStub.post.withArgs('/', <% if(post_create) { %>'authService.isAuthenticated', <% } %>'<%= namelower %>Ctrl.create').calledOnce)
        .toBe(true);
    });

  });

  describe('GET /api/<%= fname %>s', function() {

    // expect with each request the approapriate endpoint was called
    it('should route to <%= namelower %>.controller.index', function() {
      expect(routerStub.get.withArgs('/', <% if(get_index) { %>'authService.isAuthenticated', <% } %>'<%= namelower %>Ctrl.index').calledOnce)
        .toBe(true);
    });

  });

  describe('DELETE /api/<%= fname %>s/:id', function() {

    it('should route to <%= namelower %>.controller.destroy', function() {
      expect(routerStub.delete.withArgs('/:id', <% if(delete_destroy) { %>'authService.isAuthenticated', <% } %>'<%= namelower %>Ctrl.destroy').calledOnce)
        .toBe(true);
    });

  });

  describe('GET /api/<%= fname %>s/:id', function() {

    it('should route to <%= namelower %>.controller.show', function() {
      expect(routerStub.get.withArgs('/:id', <% if(get_show) { %>'authService.isAuthenticated', <% } %>'<%= namelower %>Ctrl.show').calledOnce)
        .toBe(true);
    });

  });

  describe('PUT /api/<%= fname %>s/:id', function() {

    it('should route to <%= namelower %>.controller.upsert', function() {
      expect(routerStub.put.withArgs('/:id', <% if(put_upsert) { %>'authService.isAuthenticated', <% } %>'<%= namelower %>Ctrl.upsert').calledOnce)
        .toBe(true);
    });

  });

  // describe('PATCH /api/<%= namelower %>s/:id', function() {

  //   it('should route to <%= namelower %>.controller.patch', function() {
  //     expect(routerStub.patch.withArgs('/:id','<%= namelower %>Ctrl.patch').calledOnce)
  //       .toBe(true);
  //   });

  // });

});
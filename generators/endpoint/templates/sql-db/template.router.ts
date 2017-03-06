/**
 * GET     /api/<%= fname %>            ->  index
 * GET     /api/<%= fname %>/:id        ->  show
 * POST    /api/<%= fname %>            ->  create
 * PUT     /api/<%= fname %>/:id        ->  update
 * PATCH   /api/<%= fname %>/:id		->  upsert
 * DELETE  /api/<%= fname %>/:id        ->  destroy
 */

let express = require('express');
import * as controller from './<%= fname %>.controller';
<% if(authselect.length) { %>import * as auth from '<%- authImport %>';<% } %>

let router = express.Router();

router.get('/', <% if(get_index) { %>auth.isAuthenticated(),<% } %> controller.index);
router.get('/:id', <% if(get_show) { %>auth.isAuthenticated(),<% } %> controller.show);
router.post('/', <% if(post_create) { %>auth.isAuthenticated(),<% } %> controller.create);
router.put('/:id', <% if(put_upsert) { %>auth.isAuthenticated(),<% } %> controller.upsert);
// router.patch('/:id', <% if(patch_patch) { %>auth.isAuthenticated(),<% } %> controller.patch);
router.delete('/:id', <% if(delete_destroy) { %>auth.isAuthenticated(),<% } %> controller.destroy);

export {router as <%= namelower %>Routes};
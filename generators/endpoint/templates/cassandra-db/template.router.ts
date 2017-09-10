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
router.get('/:timeid', <% if(get_show) { %>auth.isAuthenticated(),<% } %> controller.show);
router.post('/', <% if(post_create) { %>auth.isAuthenticated(),<% } %> controller.create);
router.put('/:timeid', <% if(put_upsert) { %>auth.isAuthenticated(),<% } %> controller.upsert);
// router.patch('/:timeid', <% if(patch_patch) { %>auth.isAuthenticated(),<% } %> controller.patch);
router.delete('/:timeid', <% if(delete_destroy) { %>auth.isAuthenticated(),<% } %> controller.destroy);

export {router as <%= namelower %>Routes};
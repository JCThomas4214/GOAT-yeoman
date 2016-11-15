/**
 * GET     /api/<%= namelower %>            ->  index
 * GET     /api/<%= namelower %>/:id        ->  show
 * POST    /api/<%= namelower %>            ->  create
 * PUT     /api/<%= namelower %>/:id        ->  update
 * PATCH   /api/<%= namelower %>/:id		->  upsert
 * DELETE  /api/<%= namelower %>/:id        ->  destroy
 */

let express = require('express');
import * as controller from './<%= namelower %>.controller';
<% if(authselect.length) { %>import * as auth from '../../auth/auth.service';<% } %>

let router = express.Router();

router.get('/', <% if(get_index) { %>auth.isAuthenticated(),<% } %> controller.index);
router.get('/:id', <% if(get_show) { %>auth.isAuthenticated(),<% } %> controller.show);
router.post('/', <% if(post_create) { %>auth.isAuthenticated(),<% } %> controller.create);
router.put('/:id', <% if(put_upsert) { %>auth.isAuthenticated(),<% } %> controller.upsert);
// router.patch('/:id', <% if(patch_patch) { %>auth.isAuthenticated(),<% } %> controller.patch);
router.delete('/:id', <% if(delete_destroy) { %>auth.isAuthenticated(),<% } %> controller.destroy);

export {router as <%= namelower %>Routes};
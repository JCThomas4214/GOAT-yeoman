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

let router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

export {router as <%= namelower %>Routes};
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     <%= namelower %>              ->  index
 * POST    <%= namelower %>              ->  create
 * GET     <%= namelower %>/:id          ->  show
 * PUT     <%= namelower %>/:id          ->  upsert
 * PATCH   <%= namelower %>/:id          ->  patch
 * DELETE  <%= namelower %>/:id          ->  destroy
 */

import <%= modelname %> from './<%= namelower %>.model';
import * as _ from 'lodash';

// if the wonder object was not found
function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

// if there was an error of any kind return approapriate status code
function handleError(res, statusCode?) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWithResult(res, statusCode?) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}


function removeEntity(res) {
  return function(entity) {
    if(entity) {
      entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of <%= modelname %>s
export function index(req, res) {
  return <%= modelname %>.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single <%= modelname %> from the DB
export function show(req, res) {
  return <%= modelname %>.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new <%= modelname %> in the DB
export function create(req, res) {
  return <%= modelname %>.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given <%= modelname %> in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return <%= modelname %>.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// // Updates an existing <%= modelname %> in the DB
// export function patch(req, res) {
//   if(req.body._id) {
//     delete req.body._id;
//   }
//   return <%= modelname %>.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(patchUpdates(req.body))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// Deletes a <%= modelname %> from the DB
export function destroy(req, res) {
  return <%= modelname %>.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
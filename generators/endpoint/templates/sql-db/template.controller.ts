/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     <%= fname %>              ->  index
 * POST    <%= fname %>              ->  create
 * GET     <%= fname %>/:id          ->  show
 * PUT     <%= fname %>/:id          ->  upsert
 * PATCH   <%= fname %>/:id          ->  patch
 * DELETE  <%= fname %>/:id          ->  destroy
 */

import <%= modelname %> from './<%= fname %>.model';

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
      entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of <%= modelname %>s
export function index(req, res) {
  return <%= modelname %>.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single <%= modelname %> from the DB
export function show(req, res) {
  return <%= modelname %>.findById(req.params.id)
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
  return <%= modelname %>.update(req.body, {where: {id: req.params.id}})
    .then(() =>{
      <%= modelname %>.findById(req.params.id).then(respondWithResult(res)).catch(handleError(res));
    })
    .catch(handleError(res));
}

// Deletes a <%= modelname %> from the DB
export function destroy(req, res) {
  return <%= modelname %>.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
import <%= modelname %> from './<%= fname %>.model';
import {Entity, uuid, toTimeStamp, now} from 'cassmask';

// if the wonder object was not found
function handleError(res, err, code?) {
  const statusCode = code || err.statusCode || 500;
  if (err) {
    res.status(statusCode).json(err);
  }
}

function validationError(res, err) {
  if (err) {
    res.status(422).json(err);
  }
}

function respondWithResult(res, entity, code: number = 200) {
  res.status(code).json(entity);
}

// Gets a list of <%= modelname %>
export function index(req, res) {
  return <%= modelname %>.allRows()
    .then(result => {
      respondWithResult(res, result.rows)
    })
    .catch(err => {
      handleError(res, err);
    });
}

// Gets a single <%= modelname %> from the DB
export function show(req, res) {
  return <%= modelname %>.findById(req.params.id)
    .then(result => {
      respondWithResult(res, result.rows)
    })
    .catch(err => {
      handleError(res, err);
    });
}

// Creates a new <%= modelname %> in the DB
export function create(req, res) {
  return <%= modelname %>.insertRow(req.body.name)
    .then(result => {
      respondWithResult(res, result.rows, 201)
    })
    .catch(err => {
      handleError(res, err);
    });
}

// Upserts the given <%= modelname %> in the DB at the specified ID
export function upsert(req, res) {
  return <%= modelname %>.updateById(req.params.id, req.params.name)
    .then(result => {
      respondWithResult(res, {message: 'update was successful!'})
    })
    .catch(err => {
      handleError(res, err);
    });
}


// // Updates an existing <%= modelname %> in the DB
// export function patch(req, res) {
// }

// Deletes a <%= modelname %> from the DB
export function destroy(req, res) {
  return <%= modelname %>.deleteById(req.params.id)
    .then(result => {
      respondWithResult(res, {message: 'Item succesfully deleted!'}, 204),
    })
    .catch(err => {
      err => handleError(res, err);
    });
}
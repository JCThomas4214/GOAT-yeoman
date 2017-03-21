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

// Gets a list of <%= modelname %>s
export function index(req, res) {
  return <%= modelname %>.find().seam().subscribe(
    entities => respondWithResult(res, entities), 
    err => handleError(res, err));
}

// Gets a single <%= modelname %> from the DB
export function show(req, res) {
  return <%= modelname %>.findById(req.params.id).seam().subscribe(
    entity => respondWithResult(res, entity),
    err => handleError(res, err));
}

// Creates a new <%= modelname %> in the DB
export function create(req, res) {
  return <%= modelname %>.create(req.body).seam().subscribe(
    entity => respondWithResult(res, entity, 201),
    err => handleError(res, err));
}

// Upserts the given <%= modelname %> in the DB at the specified ID
export function upsert(req, res) {
  return <%= modelname %>.findById(req.params.id).seam().subscribe(
    entity => entity.remove().subscribe(x => {}, err => handleError(res,err), () => {
      entity.merge(req.body);
      entity.save().subscribe(
        x => respondWithResult(res, x),
        err => handleError(res, err));
    }),
    err => handleError(res, err));
}


// // Updates an existing <%= modelname %> in the DB
// export function patch(req, res) {
// }

// Deletes a <%= modelname %> from the DB
export function destroy(req, res) {
  return <%= modelname %>.findById(req.params.id).seam().subscribe(
    entity => entity.remove().subscribe(
      x => respondWithResult(res, x, 204), 
      err => handleError(res, err, 404)),
    err => handleError(res, err));
}
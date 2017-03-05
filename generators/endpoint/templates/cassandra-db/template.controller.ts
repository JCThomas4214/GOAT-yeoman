import <%= modelname %> from './<%= fname %>.model';
import {Entity, uuid, toTimeStamp, now} from 'cassmask';

// if the wonder object was not found
function handleError(res, err) {
  if (err) {
    res.status(500).json(err);
  }
}

function validationError(res, err) {
  if (err) {
    res.status(422).json(err);
  }
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
  return <%= modelname %>.find().seam().subscribe(
    entities => res.json(entities), 
    err => handleError(res, err));

}

// Gets a single <%= modelname %> from the DB
export function show(req, res) {
  return <%= modelname %>.findById(req.params.id).seam().subscribe(
    entity => res.json(entity),
    err => handleError(res, err));
}

// Creates a new <%= modelname %> in the DB
export function create(req, res) {
  return <%= modelname %>.create(req.body).seam().subscribe(
    entity => res.json(entity),
    err => handleError(err));
}

// Upserts the given <%= modelname %> in the DB at the specified ID
export function upsert(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }
  return <%= modelname %>.findById(req.params.id).seam().subscribe(
    entity => {
      entity.merge(req.body);
      entity.save().subscribe(x => res.json(entity), err => handleError(res, err))
    }, err => handleError(res, err));
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
  return <%= modelname %>.findById(req.params.id).seam().subscribe(
    entity => entity.remove().subscribe(x => res.json(entity), err => handleError(res, err)),
    err => handleError(res, err));
}
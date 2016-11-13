/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/challenges              ->  index
 * POST    /api/challenges              ->  create
 * GET     /api/challenges/:id          ->  show
 * PUT     /api/challenges/:id          ->  upsert
 * PATCH   /api/challenges/:id          ->  patch
 * DELETE  /api/challenges/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Challenge from './challenge.model';
import Label from '../label/label.model';
var json2csv = require('json2csv');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Challenges
export function index(req, res) {
  return Challenge.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Challenge from the DB
export function show(req, res) {
  return Challenge.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Challenge in the DB
export function create(req, res) {
  return Challenge.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Creates a new Challenge in the DB
export function submitLabels(req, res) {
  var data = req.body;
  var labels = [];
  data.labels.forEach((label, l) => {
    var newLabel = label;
    newLabel.challengeId = data.challengeId;
    newLabel.userId = req.user._id;
    newLabel.targetId = data.targetId;
    newLabel.viewCenter = data.viewCenter;
    labels.push(newLabel);
  })
  return Label.create(labels)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function getLabels(req, res){
  /*json2csv({ data: myCars, fields: fields }, function(err, csv) {
  res.setHeader('Content-disposition', 'attachment; filename=data.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200).send(csv);
});*/
  return Label.find({'challengeId': req.params.id})
  .then(respondWithResult(res, 201))
  .catch(handleError(res));
}

export function getLabelCsv(req, res){
  /*
});*/
  return Label.find({'challengeId': req.params.id})
  .then(labels => {
    var array = [];
    var fields = ['userId','challengeId','class','geometry',];
    labels.forEach((label, l) => {
      array.push({
        geometry: '<Point><coordinates>' + label.geo.lat + ',' + label.geo.lng + '</coordinates></Point>',
        class: label.classId,
        userId: label.userId,
        challengeId: label.challengeId
      })
    })
    json2csv({ data: array, fields: fields }, function(err, csv) {
      res.setHeader('Content-disposition', 'attachment; filename=data.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
    })
  })
  .catch(handleError(res));
}



// Upserts the given Challenge in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Challenge.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Challenge in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Challenge.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Challenge from the DB
export function destroy(req, res) {
  return Challenge.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

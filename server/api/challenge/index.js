'use strict';

var express = require('express');
var controller = require('./challenge.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/manage', controller.index);
router.get('/:id',  controller.show);
router.get('/:id/labels', controller.getLabels);
router.get('/:id/labels/csv', controller.getLabelCsv);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/:id/labels', auth.isAuthenticated(), controller.submitLabels);
router.put('/:id',  controller.upsert);
router.patch('/:id',  controller.patch);
router.delete('/:id',  controller.destroy);

module.exports = router;

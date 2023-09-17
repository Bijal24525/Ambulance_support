const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const { validationResult } = require('express-validator');
const routeInfo = require('../controllers/routeInfo');

// Other routes...

// Route for inserting a new traffic entry
router.post('/routing',
[
    body('hospitalLocation')
      .notEmpty()
      .withMessage('Hospital location must be specified'),
    body('currentUserLocation')
      .notEmpty()
      .withMessage('Current user location must be specified')
  ],
  routeInfo.post.createRouteInfo);


  router.get('/routing', routeInfo.get.getAllRouteInfo);

module.exports = router;
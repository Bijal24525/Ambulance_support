const fs = require('fs');

// packages
const Jimp = require('jimp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// model
const { RouteInfo } = require('./../models');

module.exports.post = {
    // Other methods...
  
    createRouteInfo: (req, res, next) => {

        console.log("hello from create");


    //   const { source,destination, url} = req.body;
      // Validate input data
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ err: errors.array()[0].msg });
    //   }

      console.log("Request body", req.body);

      const { currentUser, hospitalLocation, currentUserLocation } = req.body;
      const did = currentUser;
      const source = `${currentUserLocation.lat},${currentUserLocation.lon}`; // Current location
      const destination = `${hospitalLocation.lat},${hospitalLocation.lon}`; // Destination location
      const url = `https://www.google.com/maps/dir/?api=1&origin=${source}&destination=${destination}&travelmode=driving`;
      RouteInfo.create({
        did,
        source,
        destination,
        url
        
      })
      .then(route => res.status(201).json({
        did: route.did,
        source: route.source,
        destination: route.destination,
        url: route.url
      })
      )
      .catch(next);      
    },
    
  
    // Other methods...
};

// const moment = require('moment');
module.exports.get = {
  getAllRouteInfo: async (req, res) => {
      try {
          // Retrieve all route information from the database
          // const allRouteInfo = await RouteInfo.findAll();

          const allRouteInfo = await RouteInfo.findAll({
            attributes: ['did', 'source', 'destination', 'createdAt'], // Include createdAt
          });

          // Extract source and destination from each route information object
          const routeInfoWithLocations = allRouteInfo.map(route => ({
              did: route.did,
              source: route.source,
              destination: route.destination,
              createdAt: route.createdAt.toISOString(),
              // createAt: moment(route.createdAt).format('YYYY-MM-DD HH:mm:ss'),
              // You can include other properties as needed
          }));

          res.json(routeInfoWithLocations);
      } catch (error) {
          console.error('Error retrieving data:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },
};


// module.exports.get = {
//   getAllRouteInfo: async (req, res) => {
//       try {
//           const allRouteInfo = await RouteInfo.findAll();
//           res.json(allRouteInfo);
//       } catch (error) {
//           console.error('Error retrieving data:', error);
//           res.status(500).json({ error: 'Internal server error' });
//       }
//   },
// };



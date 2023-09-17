

// packages
const express = require('express');
const { body, param } = require('express-validator');
const nodemailer = require('nodemailer');
const twilio = require('twilio');


// controllers
const driverController = require('./../controllers/driver');
const sendEmailToUsers = require('./sendEmail'); // Adjust the path to the actual location of your sendEmailToUsers file
const sendSMSToUsers = require('./sendSMS');

// middleware
const imageUpload = require('./../middleware/imageUpload');

const router = express.Router();

// GET
router.get('/driver', driverController.get.all);

router.get(
  '/driver/:contact',
  [
    param('contact')
      .trim()
      .isNumeric()
      .withMessage('Contact must be numbers only')
      .custom(value => {
        if (value.length !== 10) {
          throw new Error('Contact must have 10 characters');
        }
        return true;
      })
  ],
  driverController.get.single
);

router.get(
  '/driver_pic/:contact',
  [
    param('contact')
      .trim()
      .isNumeric()
      .withMessage('Contact must be numbers only')
      .custom(value => {
        if (value.length !== 10) {
          throw new Error('Contact must have 10 characters');
        }
        return true;
      })
  ],
  driverController.get.pic
);

router.get(
  '/driver_small_pic/:contact',
  [
    param('contact')
      .trim()
      .isNumeric()
      .withMessage('Contact must be numbers only')
      .custom(value => {
        if (value.length !== 10) {
          throw new Error('Contact must have 10 characters');
        }
        return true;
      })
  ],
  driverController.get.smallPic
);

// POST
router.post(
  '/driver_signup',
  [
    body('name')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Name must be of at least 5 characters long'),
    body('driver_id').trim(),
    body('email', 'Invalid email').trim().normalizeEmail().isEmail(),
    body('contact')
      .trim()
      .isNumeric()
      .withMessage('Contact must be numbers only')
      .custom(value => {
        if (value.length !== 10) {
          throw new Error('Contact must have 10 characters');
        }
        return true;
      }),
    body('location')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Location must be of at least 3 characters long'),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must have atleast 8 characters')
  ],
  driverController.post.signup
);

router.post('/driver_login', driverController.post.login);

router.post('/driver_check_token', driverController.post.checkToken);

router.post(
  '/driver_pic/:contact',
  [
    param('contact')
      .trim()
      .isNumeric()
      .withMessage('Contact must be numbers only')
      .custom(value => {
        if (value.length !== 10) {
          throw new Error('Contact must have 10 characters');
        }
        return true;
      })
  ],
  imageUpload.single('file'), // File parser
  driverController.post.updatePic
);

// PUT
router.put(
  '/driver/:contact',
  [
    param('contact')
      .optional()
      .trim()
      .isNumeric()
      .withMessage('Contact must be numbers only')
      .custom(value => {
        if (value.length !== 10) {
          throw new Error('Contact must have 10 characters');
        }
        return true;
      }),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 5 })
      .withMessage('Name must be of at least 5 characters long'),
    body('driver_id').optional().trim(),
    body('email', 'Invalid email').optional().trim().normalizeEmail().isEmail(),
    body('location')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Location must be of at least 3 characters long'),
    body('contact')
      .optional()
      .trim()
      .isNumeric()
      .withMessage('Contact must be numbers only')
      .custom(value => {
        if (value.length !== 10) {
          throw new Error('Contact must have 10 characters');
        }
        return true;
      })
  ],
  driverController.put.update
);

router.put(
  '/driver_password/:contact',
  [
    param('contact')
      .optional()
      .trim()
      .isNumeric()
      .withMessage('Contact must be numbers only')
      .custom(value => {
        if (value.length !== 10) {
          throw new Error('Contact must have 10 characters');
        }
        return true;
      }),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must have atleast 8 characters')
  ],
  driverController.put.updatePassword
);

// DELETE
router.delete(
  '/driver/:contact',
  [
    param('contact')
      .optional()
      .trim()
      .isNumeric()
      .withMessage('Contact must be numbers only')
      .custom(value => {
        if (value.length !== 10) {
          throw new Error('Contact must have 10 characters');
        }
        return true;
      })
  ],
  driverController.delete.delete
);

const trafficController = require('./../controllers/traffic');
router.post(
  '/send_notification',
  [
    body('hospitalLocation')
      .notEmpty()
      .withMessage('Hospital location must be specified'),
    body('currentUserLocation')
      .notEmpty()
      .withMessage('Current user location must be specified')
  ],
  async (req, res) => {
    // Validate input
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { hospitalLocation, currentUserLocation } = req.body;
    console.log("hello");
    console.log(hospitalLocation,currentUserLocation);
    
    const users  = ['Receiver Email address'];


    const currentLocation = `${currentUserLocation.lat},${currentUserLocation.lon}`; // Current location
    const destination = `${hospitalLocation.lat},${hospitalLocation.lon}`; // Destination location
    const apiKey = 'Google Map API key';

const googleMapsURL = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation}&destination=${destination}&travelmode=driving`;

// Now you can share the googleMapsURL with the user, and when they open it, it will show the directions on Google Maps.



    console.log(users[0]);
    // return res.status(200).json({ success: true, message: 'Notifications sent successfully' });

    try {
      // Send emails to users
      await sendEmailToUsers(users, hospitalLocation, currentUserLocation,googleMapsURL);

      return res.status(200).json({ success: true, message: 'Notifications sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error sending notifications' });
    }
  }
);

router.post(
  '/send_sms',
  [
    body('hospitalLocation').notEmpty().withMessage('Hospital location must be specified'),
    body('currentUserLocation').notEmpty().withMessage('Current user location must be specified')
  ],
  async (req, res) => {
    // ... other code ...
    const { hospitalLocation, currentUserLocation } = req.body;
    console.log("hello");
    console.log(hospitalLocation,currentUserLocation);

    const Number = ['Reveiver Phone number'];

    const currentLocation = `${currentUserLocation.lat},${currentUserLocation.lon}`;
    const destination = `${hospitalLocation.lat},${hospitalLocation.lon}`;
    // const googleMapsURL = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation}&destination=${destination}&travelmode=driving`;

    try {
      // Send emails to users
      // await sendEmailToUsers(users, hospitalLocation, currentUserLocation, googleMapsURL);

      // Send SMS to users
      await sendSMSToUsers(Number, hospitalLocation, currentUserLocation);

      return res.status(200).json({ success: true, message: 'SMS sent successfully' });
    } catch (error) {
      console.error('Error sending notifications:', error);
      return res.status(500).json({ success: false, message: 'Error sending SMS' });
    }
  }
);

module.exports = router;

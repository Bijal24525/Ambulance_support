// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const sendEmailToUsers = require('./sendEmail'); // Import the email sending module

// const router = express.Router();

// // POST - Send Notification
// router.post(
//   '/send_notification',
//   [
//     body('hospitalLocation').notEmpty().withMessage('Hospital location must be specified'),
//     body('currentUserLocation').notEmpty().withMessage('Current user location must be specified'),
//   ],
//   async (req, res) => {
//     // Validate input
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { hospitalLocation, currentUserLocation } = req.body;

//     // Fetch the list of users (you need to implement this logic)
//     const users = await fetchUsers(); // Replace with actual logic

//     // Call the sendEmailToUsers function from the email module
//     try {
//       await sendEmailToUsers(users, hospitalLocation, currentUserLocation);
//       return res.status(200).json({ success: true, message: 'Notifications sent successfully' });
//     } catch (error) {
//       console.error('Error sending notifications:', error);
//       return res.status(500).json({ success: false, message: 'Error sending notifications' });
//     }
//   }
// );

// module.exports = router;
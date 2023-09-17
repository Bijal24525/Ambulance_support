const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Outlook'
  auth: {
    host: 'smtp.gmail.com',
   port: 465,
   secure: true,
   //real username and app password
    user: 'Your user Name',
    pass: 'Password',
  },
});

const sendEmailToUsers = async (users, hospitalInfo, currentLocation,url) => {
  try {
  const emailPromises = users.map((user) => {
    const mailOptions = {
      //real username
      from: 'Your user Name',
      to: user,
      subject: 'Emergency Notification',
      html: generateEmailBody(hospitalInfo, currentLocation,url),
    };

    console.log("Hello from send email")

    return transporter.sendMail(mailOptions);
  });

  return await Promise.all(emailPromises);
}
  catch(error) {
    console.error('Error sending emails:', error);
    throw error;
  }
};

const generateEmailBody = (hospitalInfo, currentLocation,url) => {
  return `
    <h1>Emergency Notification</h1>
    <p>Dear user,</p>
    <p>Traveling to ${hospitalInfo.display_name}, latitude ${hospitalInfo.lat} and longitude ${hospitalInfo.lon}. Driver current location is ${currentLocation.lat}, ${currentLocation.lon}.
    ${url}</p>
    <p>Please stay safe and follow the guidelines provided by local authorities.</p>
    <p>Best regards,</p>
    <p>Your App Team</p>
  `;
};

module.exports = sendEmailToUsers;

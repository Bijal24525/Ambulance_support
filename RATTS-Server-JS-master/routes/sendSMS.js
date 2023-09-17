const twilio = require('twilio');

const accountSid = 'twilio accountsid';
const authToken = 'twillio authtoken';
const client = require('twilio')(accountSid, authToken);

const sendSMSToUsers = async (number, hospitalInfo, currentLocation) => {
  try {
    const smsPromises = number.map((num) => {
      const message = generateSMSMessage(hospitalInfo, currentLocation);
      return client.messages.create({
        body: message,
        from: 'Twillio Number', // Your Twilio phone number
        to: num,
      });
    });

    return await Promise.all(smsPromises);
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

const generateSMSMessage = (hospitalInfo, currentLocation) => {
  return `
    Emergency Notification:
    Traveling to ${hospitalInfo.display_name}, latitude ${hospitalInfo.lat}, and longitude ${hospitalInfo.lon}.
    Driver's current location is ${currentLocation.lat}, ${currentLocation.lon}.
    Please stay safe and follow guidelines.
    Your App Team
  `;
};

module.exports = sendSMSToUsers;

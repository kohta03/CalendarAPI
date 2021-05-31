import { google } from 'googleapis';

const privateKey = require('../../config/privatekey.json');

export const googleAuth = () => {
  const jwtClient = new google.auth.JWT(
    privateKey.client_email,
    undefined,
    privateKey.private_key,
    ['https://www.googleapis.com/auth/calendar']
  );

  jwtClient.authorize((err, _tokens) => {
    if (err) {
      console.warn(`[ERROR] google api auth error ${err}`);
      return;
    }
    return;
  });

  google.options({ auth: jwtClient });
};

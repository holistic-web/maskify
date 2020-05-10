const functions = require('firebase-functions');

exports.getFacialRecognitionData = functions.https.onCall(url => `I can't find a face in ${url}`);
// TODO make a call to google vision API with image url

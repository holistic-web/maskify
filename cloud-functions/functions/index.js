const functions = require('firebase-functions');
const Vision = require('@google-cloud/vision');

const vision = new Vision.ImageAnnotatorClient();

exports.getFacialRecognitionData = functions.https.onCall(async url => {
	try {
		const [result] = await vision.faceDetection(url);
		return result;
	} catch (err) {
		return `Error in cloud function: ${err}`;
	}
});

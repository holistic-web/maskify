const functions = require('firebase-functions');

const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

exports.getFacialRecognitionData = functions.https.onCall(async url => {
	try {
		const result = await client.faceDetection(url);
		console.log(Object.keys(result));
	} catch (err) {
		console.log('err', err);
		console.log(`I can't find a face in ${url}`);
	}
});

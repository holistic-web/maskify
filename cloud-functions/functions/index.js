const functions = require('firebase-functions');

const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

exports.getFacialRecognitionData = functions.https.onCall(async url => {
	try {
		const [result] = await client.faceDetection(`gs://cloud-samples-data/vision/face/faces.jpeg`);
		const faces = result.faceAnnotations;
		let x = 0;
		let y = 0;
		faces.forEach((face, i) => {
			face.landmarks.forEach((landmark, j) => {
				if (landmark.type === 'MOUTH_CENTER') {
					x = landmark.position.x;
					y = landmark.position.y;
					return (x, y);
				}
			});
		});
	} catch (err) {
		console.log('err', err);
		console.log(`I can't find a face in ${url}`);
	}
});
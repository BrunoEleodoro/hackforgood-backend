const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');

const speechToText = new SpeechToTextV1({
	authenticator: new IamAuthenticator({
		apikey: process.env.watsonAPIKEY,
	}),
	url: process.env.watsonURL,
});

var params = {
	objectMode: true,
	contentType: 'audio/ogg',
	model: 'pt-BR_BroadbandModel',
	// keywords: ['colorado', 'tornado', 'tornadoes'],
	// keywordsThreshold: 0.5,
	// maxAlternatives: 3
};

function convertAudioToText(filename) {
	return new Promise((resolve, reject) => {
		var recognizeStream = speechToText.recognizeUsingWebSocket(params);

		// Pipe in the audio.
		fs.createReadStream(filename).pipe(recognizeStream);

		/*
		 * Uncomment the following two lines of code ONLY if `objectMode` is `false`.
		 *
		 * WHEN USED TOGETHER, the two lines pipe the final transcript to the named
		 * file and produce it on the console.
		 *
		 * WHEN USED ALONE, the following line pipes just the final transcript to
		 * the named file but produces numeric values rather than strings on the
		 * console.
		 */
		// recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

		/*
		 * WHEN USED ALONE, the following line produces just the final transcript
		 * on the console.
		 */
		// recognizeStream.setEncoding('utf8');

		// Listen for events.
		recognizeStream.on('data', function (event) {
			console.log('data', event)
			resolve({
				error: false,
				text: event.results[0].alternatives[0].transcript || ""
			})
		});
		recognizeStream.on('error', function (event) {
			console.log('error', event)
			resolve({
				error: true,
			})
		});
		recognizeStream.on('close', function (event) {
			// resolve({error: false, })
			console.log('closed')
		});

		// Display events on the console.

	})

}

module.exports = {
	convertAudioToText: convertAudioToText
}
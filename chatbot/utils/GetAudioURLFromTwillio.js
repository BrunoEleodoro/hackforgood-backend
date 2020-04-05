const https = require('https');
var request = require('request');


function getAudioUrl(url) {
	return new Promise((resolve, reject) => {
		request.get(url, function (err, res, body) {
			resolve(res.request.uri.href)
		});
	})

}

module.exports = {
	getAudioUrl: getAudioUrl
}
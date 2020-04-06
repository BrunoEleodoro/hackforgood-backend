const request = require('request');

function checkFake(texto) {
	return new Promise((resolve, reject) => {
		request.post('http://ip172-18-0-7-bq5598roudsg00b7sv9g-8001.direct.labs.play-with-docker.com/check', {
			json: {
				text: texto
			}
		}, (error, res, body) => {
			if (error) {
				console.error(error)
				return
			}
			console.log(`statusCode: ${res.statusCode}`)
			var parsed = JSON.parse(body)
			resolve(parsed.fake)
		})
	})
}

module.exports = {
	checkFake: checkFake
}
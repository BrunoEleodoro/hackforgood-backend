const request = require('request');

function checkFake(texto) {
	return new Promise((resolve, reject) => {
		request.post('http://hackforgood-fakedtc/check', {
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
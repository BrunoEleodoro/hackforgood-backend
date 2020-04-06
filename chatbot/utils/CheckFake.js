const request = require('request');

function checkFake(texto) {
	return new Promise((resolve, reject) => {
		request.post('http://hackforgood-fake:3005/check', {
			json: {
				text: texto
			}
		}, (error, res, body) => {
			if (error) {
				console.error(error)
				return
			}
			console.log(`statusCode: ${res.statusCode}`)
			// console.log(`body: ${body}`)

			resolve(body.fake)
		})
	})
}

module.exports = {
	checkFake: checkFake
}
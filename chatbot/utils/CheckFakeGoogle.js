const google = require('googleapis').google
const customSearch = google.customsearch('v1')

function checkFake(texto) {
	return new Promise(async (resolve, reject) => {
		const response = await customSearch.cse.list({
			auth: process.env.googleSearchApiKey,
			cx: process.env.googleSearchId,
			q: texto.substring(0, 100),
			dateRestrict: "d2",
			num: 2,
		})

		var alternativas = response.data.items.map((item) => {
			var message = ""
			message += item.snippet
			message += "\n\n" + item.link
			return { message }
		})
		resolve(alternativas)
	})
}

module.exports = {
	checkFake: checkFake
}
require('dotenv').config()
const google = require('googleapis').google
const customSearch = google.customsearch('v1')

async function main() {
	const response = await customSearch.cse.list({
		auth: process.env.googleSearchApiKey,
		cx: process.env.googleSearchId,
		q: 'Não deve haver paralisação de caminhoneiros na próxima',
		dateRestrict: "d2",
		num: 2,

	})
	var alternativas = response.data.items.map((item) => {
		var message = ""
		message += item.snippet
		message += "\n\n" + item.link
		return { message }
	})
	console.log(alternativas)
	// console.log(response.data.items)
}

main();
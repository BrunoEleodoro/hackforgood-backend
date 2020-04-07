const google = require('googleapis').google
const customSearch = google.customsearch('v1')

var stopwords = ["vai", "se", "nem", "suas", "forma", "de", "governo", "as", "mentes", "tudo", "culpa", "da", "emissora", "da", "or", "liderar", "sou", "a", "liderança", "logo", "expedição", "hope", "par", "chegar", "coisa", "outra", "último", "é", "acerca", "agora", "algmas", "alguns", "ali", "ambos", "antes", "apontar", "aquela", "aquelas", "aquele", "aqueles", "aqui", "atrás", "bem", "bom", "cada", "caminho", "cima", "com", "como", "comprido", "conhecido", "corrente", "das", "debaixo", "dentro", "desde", "desligado", "deve", "devem", "deverá", "direita", "diz", "dizer", "dois", "dos", "e", "ela", "ele", "eles", "em", "enquanto", "então", "está", "estão", "estado", "estar 	estará", "este", "estes", "esteve", "estive", "estivemos", "estiveram", "eu", "fará", "faz", "fazer", "fazia", "fez", "fim", "foi", "fora", "horas", "iniciar", "inicio", "ir", "irá", "ista", "iste", "isto", "ligado", "maioria", "maiorias", "mais", "mas", "mesmo", "meu", "muito", "muitos", "nós", "não", "nome", "nosso", "novo", "o", "onde", "os", "ou", "outro", "para", "parte", "pegar", "pelo", "pessoas", "pode", "poderá 	podia", "por", "porque", "povo", "promeiro", "quê", "qual", "qualquer", "quando", "quem", "quieto", "são", "saber", "sem", "ser", "seu", "somente", "têm", "tal", "também", "tem", "tempo", "tenho", "tentar", "tentaram", "tente", "tentei", "teu", "teve", "tipo", "tive", "todos", "trabalhar", "trabalho", "tu", "um", "uma", "umas", "uns", "usa", "usar", "valor", "veja", "ver", "verdade", "verdadeiro", "você"]

function checkFake(texto) {
	return new Promise(async (resolve, reject) => {

		texto = remove_stopwords(texto.substring(0, 150) + ".")
		console.log('checkFake', texto)

		const response = await customSearch.cse.list({
			auth: process.env.googleSearchApiKey,
			cx: process.env.googleSearchId,
			q: texto,
			dateRestrict: "d10",
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

function remove_stopwords(str) {
	res = []
	words = str.split(' ')
	for (i = 0; i < words.length; i++) {
		word_clean = words[i].split(".").join("")
		if (!stopwords.includes(word_clean)) {
			res.push(word_clean)
		}
	}
	return (res.join(' '))
}

module.exports = {
	checkFake: checkFake
}
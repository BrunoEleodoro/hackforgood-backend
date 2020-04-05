const fs = require('fs')
var natural = require('natural');

var fakePath = '/Users/bruno/ProjectSamples/Fake.br-Corpus/size_normalized_texts/fake/'
var truePath = '/Users/bruno/ProjectSamples/Fake.br-Corpus/size_normalized_texts/true/'

var fakeList = fs.readdirSync(fakePath)
var trueList = fs.readdirSync(truePath)

var classifier = new natural.BayesClassifier();


console.log('including documents true model')
var i = 0
while (i < trueList.length) {
	if (trueList[i].includes(".txt")) {
		var contents = fs.readFileSync(truePath + "" + trueList[i])
		classifier.addDocument(contents, 'true');
	}
	i++;
}
console.log('done including documents true model')

console.log('including documents fake model')
var i = 0
while (i < fakeList.length) {
	if (fakeList[i].includes(".txt")) {
		var contents = fs.readFileSync(fakePath + "" + fakeList[i])
		classifier.addDocument(contents, 'fake');
	}
	i++;
}
console.log('done including documents fake model')

console.log('training model');
classifier.train();
console.log('done training model');

console.log('saving model');
classifier.save('classificador', (err, classifier) => {
	console.log(err)
	console.log(classifier)
})
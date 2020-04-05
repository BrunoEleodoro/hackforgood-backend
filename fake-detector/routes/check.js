var express = require('express');
var router = express.Router();
var natural = require('natural')
var classifier;
const fs = require('fs')

if (fs.existsSync('./classificador.json')) {
  natural.BayesClassifier.load('classificador.json', null, function (err, loaded_classifier) {
    classifier = loaded_classifier
  });
}


router.post('/', function (req, res, next) {
  var response = classifier.classify(req.body.text)
  res.send({
    status: 200,
    fake: response == 'fake'
  })
});

module.exports = router;

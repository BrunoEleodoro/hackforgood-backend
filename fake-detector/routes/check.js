var express = require('express');
var router = express.Router();
var natural = require('natural')
const fs = require('fs')
var classifier;



router.post('/', function (req, res, next) {
  if (fs.existsSync('./classificador.json') && classifier == null) {
    natural.BayesClassifier.load('classificador.json', null, function (err, loaded_classifier) {
      classifier = loaded_classifier
    });
  }


  var response = classifier.classify(req.body.text)
  res.send({
    status: 200,
    fake: response == 'fake'
  })
});

module.exports = router;

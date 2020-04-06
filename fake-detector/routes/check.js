var express = require('express');
var router = express.Router();
var natural = require('natural')
const fs = require('fs')
var classifier;


function loadModel() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('./classificador.json') && classifier == null) {
      natural.BayesClassifier.load('classificador.json', null, function (err, loaded_classifier) {
        resolve(loaded_classifier)
      });
    } else {
      resolve(classifier)
    }
  })
}

router.post('/', async function (req, res, next) {
  console.log('received', req.body.text)
  var classifier = await loadModel()
  var response = classifier.classify(req.body.text)
  res.send({
    status: 200,
    fake: response == 'fake'
  })
});

module.exports = router;

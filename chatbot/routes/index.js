var express = require('express');
var router = express.Router();

const getAudioUrl = require('../utils/GetAudioURLFromTwillio').getAudioUrl
const downloadFile = require('../utils/SaveFile').downloadFile
const convertAudioToText = require('../utils/SpeechToTextWatson').convertAudioToText
const sendMessage = require('../utils/SendMessage').sendMessage
const checkFake = require('../utils/CheckFake').checkFake
const checkFakeGoogle = require('../utils/CheckFakeGoogle').checkFake
const sleep = require('../utils/Sleep').sleep

router.post('/', async function (req, res, next) {
  res.send('reply')
  console.log('router post', req.body.Body)
  var msg = req.body.Body

  // req.body.Body = req.body.Body.join('\n')

  var messageHeaderFake = '⚠️ #FakeNews ⚠️\n\nO Conteudo enviado por ser uma noticia falsa :( Procure em mais fontes';
  var messageHeaderTrue = '⚠️ ⚠️ O Conteudo parece ser verdadeiro, mesmo assim recomendamos que você verifique os fatos em mais fontes'

  if (req.body.NumMedia != '0') {
    await sendMessage('Audio recebido, vou converter para texto', req.body.From)
    let filename = "./media/audio_" + new Date().getTime() + ".ogg";
    let audioUrl = await getAudioUrl(req.body.MediaUrl0)
    console.log('downloadFile')
    await downloadFile(audioUrl, filename)
    console.log('wait')
    await sleep(2000)
    console.log('convertAudioToText')
    let contents = await convertAudioToText(filename)
    console.log('checkFake')
    let isItFake = await checkFake(contents.text)
    if (isItFake) {
      var message = messageHeaderFake
      await sendMessage(message, req.body.From)
    } else {
      var message = messageHeaderTrue
      await sendMessage(message, req.body.From)
    }
    sendNews(contents.text, req.body.From)
  } else if (req.body.NumMedia == '0' && req.body.Body.length >= 150) {
    msg = msg.toString().join('\n')
    let isItFake = await checkFake(msg)
    if (isItFake) {
      var message = messageHeaderFake
      await sendMessage(message, req.body.From)
    } else {
      var message = messageHeaderTrue
      await sendMessage(message, req.body.From)
    }
    sendNews(msg, req.body.From)
  } else {
    await sendMessage('Por favor envie um audio ou texto com mais de 150 caracteres.', req.body.From)
  }

});

async function sendNews(texto, from) {
  var alternatives = await checkFakeGoogle(texto, from)
  var i = 0;
  while (i < alternatives.length) {
    await sendMessage(alternatives[i].message, from)
    i++;
  }
}

module.exports = router;

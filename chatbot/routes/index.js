var express = require('express');
var router = express.Router();

const getAudioUrl = require('../utils/GetAudioURLFromTwillio').getAudioUrl
const downloadFile = require('../utils/SaveFile').downloadFile
const convertAudioToText = require('../utils/SpeechToTextWatson').convertAudioToText
const sendMessage = require('../utils/SendMessage').sendMessage
const checkFake = require('../utils/CheckFake').checkFake
const sleep = require('../utils/Sleep').sleep

router.post('/', async function (req, res, next) {
  res.send('reply')

  if (req.body.NumMedia != '0') {
    await sendMessage('Audio recebido, vou converter para texto', req.body.From)
    let filename = "./media/audio_" + new Date().getTime() + ".ogg";
    let audioUrl = await getAudioUrl(req.body.MediaUrl0)
    await downloadFile(audioUrl, filename)
    await sleep(2000)
    let contents = await convertAudioToText(filename)
    let isItFake = await checkFake(contents)
    if (isItFake) {
      await sendMessage('#FakeNews\n\nO Conteudo enviado por ser uma noticia falsa :( Procure em mais fontes', req.body.From)
    } else {
      await sendMessage('O Conteudo parece ser veridico, mesmo assim recomendamos que você verifique os fatos em mais fontes', req.body.From)
    }
  } else {
    await sendMessage('Por favor envie um audio.', req.body.From)
  }

});

module.exports = router;

const fs = require('fs')
const natural = require('natural');

require('dotenv').config()

var express = require('express');
var trainRouter = require('./routes/train');
var checkRouter = require('./routes/check');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('working')
})
app.use('/train', trainRouter);
app.use('/check', checkRouter);

app.listen(3005, () => {
	console.log('listening')
})

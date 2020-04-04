const accountSid = process.env.accountSid
const authToken = process.env.authToken
const client = require('twilio')(accountSid, authToken)

function sendMessage(msg, to) {
	return new Promise((resolve, reject) => {
		client.messages
			.create({
				from: 'whatsapp:+14155238886',
				body: `${msg}`,
				to: to
			})
			.then(message => resolve(message.sid))
	})
}

module.exports = {
	sendMessage: sendMessage
}
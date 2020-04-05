const https = require('https');
const fs = require('fs');

function downloadFile(url, filename) {
	return new Promise((resolve, reject) => {
		var fileStream = fs.createWriteStream(filename);
		https.get(url, function (response_file) {
			response_file.pipe(fileStream);
			resolve(true)
		})
	})
}

module.exports = {
	downloadFile: downloadFile
}
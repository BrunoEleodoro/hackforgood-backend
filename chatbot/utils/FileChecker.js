const fs = require('fs')
var crypto = require('crypto')

function checksum(str, algorithm, encoding) {
	return crypto
		.createHash(algorithm || 'md5')
		.update(str, 'utf8')
		.digest(encoding || 'hex')
}


function checkFiles(file1, file2) {
	var hash1 = checksum(fs.readFileSync(file1))
	var hash2 = checksum(fs.readFileSync(file2))
	return hash1 == hash2
}

module.exports = {
	checkFiles: checkFiles
}
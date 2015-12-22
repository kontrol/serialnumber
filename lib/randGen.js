var crypto = require('crypto');

function randomSerialGenerator(howMany, charSet) {

   charSet = charSet 
	|| "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

   var random = crypto.randomBytes(howMany)
	, value = new Array(howMany)
	, length = charSet.length;

   for (var i = 0; i < howMany; i++) {
	value[i] = charSet[random[i] % length]
	};

	return value.join('');
}

module.exports = {randomSerialGenerator: randomSerialGenerator};

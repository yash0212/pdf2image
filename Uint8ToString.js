const btoa = require("btoa");
module.exports = function(u8a) {
	var CHUNK_SZ = 0x8000;
	var c = [];
	for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
		c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
	}
	return btoa(c.join(""));
};

const path = require("path");
const fs = require("fs");
var PDF = require("./index.js");
// var file = fs.readFileSync(
// 	// path.join(path.join(__dirname, "test"), "testpdf_small.pdf")
// 	path.join(path.join(__dirname, "test"), "testpdf_big.pdf")
// );
var file = fs.createReadStream(
	// path.join(path.join(__dirname, "test"), "testpdf_big.pdf")
	// path.join(path.join(__dirname, "test"), "testpdf_small.pdf")
	path.join(path.join(__dirname, "test"), "testpdf_singlepage.pdf")
);

PDF(file);

var readline = require("readline");
var count = 0;
const Uint8ToString = require("./Uint8ToString.js");
var fs = require("fs");
var btoa = require("btoa");
var zlib = require("zlib");
var stream = fs.createWriteStream("file.bin", { flags: "a" });
var Jimp = require("jimp");

async function PDF(fileReadStream) {
	const rl = readline.createInterface({ input: fileReadStream });
	var streamStartBool = 0,
		imageBool = 0;
	let rawImgData;
	rl.on("line", line => {
		if (line == "/Subtype /Image") {
			imageBool = 1;
		}
		if (line == "endstream" && imageBool == 1) {
			imageBool = 0;
			streamStartBool = 0;
			// var buf = Uint8Array.from(rawImgData).buffer;
			rawImgData = rawImgData.replace(/\r|\n/g, "");
			var buf = Buffer.from(rawImgData.slice(1)).Buffer;
			// fs.writeFile("rawImgDatafile.bin", rawImgData, (err, msg) => {});
			// var j = new Jimp(
			// 	{ data: buf, width: 1141, height: 1754 },
			// 	(err, image) => {
			// 		// this image is 1280 x 768, pixels are loaded from the given buffer.
			// 		console.log(err);
			// 	}
			// );

			zlib.inflate(buf, (err, buffer) => {
				if (!err) {
					var imgData = buffer.toString("base64");
					// console.log(buffer.toString("base64"));
					var contents = `
					<html lang="en">
						<head>
						</head>
						<body>
							<img src="data:image/jpg;base64, ${imgData}"/>
						</body>
					</html>
					`;
					// Jimp.read(buffer)
					// 	.then(image => {
					// 		console.log("sucess data", image);
					// 	})
					// 	.catch(err => {
					// 		console.error(err);
					// 	});
					fs.writeFile(
						"file_" + contents + ".html",
						imgData,
						function(err) {
							if (err) throw err;
							// console.log("Saved!");
						}
					);
				} else {
					// handle error
					console.error(err);
				}
			});
			// rawImgData
			// var imgData = Uint8ToString(buf);
			// console.log(count);
			// var imgData = hexToBase64(rawImgData);
			// console.log(
			// "-----------------------------------------------------------"
			// );
			rawImgData = "";
		}
		if (imageBool && line == "stream") {
			streamStartBool = 1;
			count++;
		}
		if (streamStartBool && line != "stream") {
			rawImgData += line;
			line = line.replace(/\r/g, "");
			stream.write(line);
			// console.log(rawImgData);
		}
		// console.log(line, ": ", imageBool);
	});
	// rl.on("close", () => {
	// 	console.log("count ", count);
	// });
	// var buf = Uint8Array.from(fs.readFileSync(file.path)).buffer;
	// var file = file.toString();
	// var imagePos = file.indexOf("/Subtype /Image");
	// var streamPos = file.indexOf("stream", imagePos);
	// var endstreamPos = file.indexOf("endstream", imagePos);
	// var streamStartPos = streamPos + 7;
	// var streamEndPos = endstreamPos - 2;
	// console.log(file);
	// var imgData = Uint8ToString(imgData);
}
module.exports = PDF;
function hexToBase64(str) {
	return btoa(
		String.fromCharCode.apply(
			null,
			str
				.replace(/\r|\n/g, "")
				.replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
				.replace(/ +$/, "")
				.split(" ")
		)
	);
}

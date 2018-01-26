function getRand() {
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	return [red, green, blue];
}

function setRand() {
	var color = getRand();
	setPrimaryColor("red", color[0]);
	setPrimaryColor("green", color[1]);
	setPrimaryColor("blue", color[2]);
	setHex();
}

function verifyRGB(value) {
	if(isNaN(value)) {
		return 0;
	}
	return(Math.floor(Math.min(Math.max(value,0),255)));
}
function setHex() {
	var redVal = $("#red-field").val();
	var greenVal = $("#green-field").val();
	var blueVal = $("#blue-field").val();
	var $hexField = $("#hex-field");
	hexVal = [RGBtoHEX(redVal), RGBtoHEX(greenVal), RGBtoHEX(blueVal)];
	hexVal = "#" + hexVal[0] + hexVal[1] + hexVal[2];
	$hexField.val(hexVal);
	$("#primary-square").css("background-color",hexVal);

	setSchemes([redVal, greenVal, blueVal]);
}
function setSchemes(rgb) {
	var primary = mergeRGB(rgb);
	var complementary = getComplementary(rgb);
	var analog = getAnalgous(rgb);
	var split = getSplit(rgb);
	var triad = getTriad(rgb);
	var tetrad = getTetrad(rgb);
	var square = getSquare(rgb);
	setScheme("complementary",[primary].concat(complementary));
	setScheme("analog",[primary].concat(analog));
	setScheme("split",[primary].concat(split));
	setScheme("triad",[primary].concat(triad));
	setScheme("tetradic",[primary].concat(tetrad));
	setScheme("square",[primary].concat(square));
}
function setScheme(schemeName, colorValues) {
	var $scheme = $("#" + schemeName);
	var $color_blocks = $scheme.find(".panel").find(".scheme-colors").find(".color-square").toArray();
	for(i=0; i < colorValues.length; i++) {
		$($color_blocks[i]).css("background-color",colorValues[i]);
	}
	var $hex_labels = $scheme.find(".panel").find(".scheme-hex").find(".hex-label").toArray();
	for(i=0; i < colorValues.length; i++) {
		var rgbVals = splitRGBString(colorValues[i]);
		var hexVal = [RGBtoHEX(rgbVals[0]), RGBtoHEX(rgbVals[1]), RGBtoHEX(rgbVals[2])];
		hexVal = "#" + hexVal[0] + hexVal[1] + hexVal[2];
		$($hex_labels[i]).text(hexVal);
	}
}
function setPrimaryColor(colorName, colorValue) {
	var $textField = $("#" + colorName + "-field");
	colorValue = verifyRGB(colorValue);
	if(colorValue != $("#" + colorName + "-slider").slider("value")) {
		$("#" + colorName + "-slider").slider("value", colorValue)
	}
	$textField.val(colorValue);
}
function verifyHEX(value) {
	var val = parseInt(value, 16);
	if(isNaN(val)) {
		return false;
	}
	if(val > 255 || val < 0) {
		return false;
	}
	return true;
}
function setFromHEXField(hexString) {
	hexString = hexString.slice(hexString.indexOf("#") + 1,hexString.length);
	//invalid
	if(hexString.length != 6) {
		console.log("wrong length");
		return;
	}
	//invalid
	for(i = 0; i < 3; i++) {
		if (verifyHEX(hexString.slice(i, i+2)) == false) {
			console.log("wrong number");
			return;
		}
	}
	console.log("valid hex input!");
	setPrimaryColor("red", parseInt(hexString.slice(0,2),16));
	setPrimaryColor("green", parseInt(hexString.slice(2,4),16));
	setPrimaryColor("blue", parseInt(hexString.slice(4,6),16));
}
function getTextColor(RGBvalue) {
	console.log(RGBvalue);
	var whiteContrast = Math.abs(255 - RGBvalue[0]) + Math.abs(255 - RGBvalue[1]) + Math.abs(255 - RGBvalue[2]);
	var RGBTotal = parseInt(RGBvalue[0]) + parseInt(RGBvalue[1]) + parseInt(RGBvalue[2]);
	if(whiteContrast > RGBTotal) {
		return "rgb(255,255,255)";
	}
	return "rgb(0,0,0)";
}
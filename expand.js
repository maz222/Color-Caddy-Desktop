$(document).ready(function() {
	$(".color-slider").slider({
		range: "min",
		min: 0,
		max: 255,
		value: 155,
	});
	$("#red-slider").on("slidechange", function(ui, event) {
		setPrimaryColor("red",$("#red-slider").slider("value"));
		setHex();
	});
	$("#red-slider").on("slide", function(ui, event) {
		setPrimaryColor("red",$("#red-slider").slider("value"));
		setHex();
	});

	$("#blue-slider").on("slidechange", function(ui, event) {
		setPrimaryColor("blue",$("#blue-slider").slider("value"));
		setHex();
	});
	$("#blue-slider").on("slide", function(ui, event) {
		setPrimaryColor("blue",$("#blue-slider").slider("value"));
		setHex();
	});

	$("#green-slider").on("slidechange", function(ui, event) {
		setPrimaryColor("green",$("#green-slider").slider("value"));
		setHex();
	});
	$("#green-slider").on("slide", function(ui, event) {
		setPrimaryColor("green",$("#green-slider").slider("value"));
		setHex();
	});

	$("#random-button").on("click", function(ui, event) {
		setRand();
	});
	$(".color-field").on("change", function(ui, event) {
		var val = verifyRGB($(this).val());
		console.log(val);
		$(this).parent().find(".color-slider").slider("value", val);
	});
	$("#hex-field").on("change", function(ui, event) {
		var val = $(this).val();
		console.log(val);
		setFromHEXField(val);
		setHex();
	});

	$(".color-square").on("click", function(ui, event) {
		var newColor = $(this).css("backgroundColor");
		//if in rgb() format
		if(newColor[0] == "r") {
			newColor = splitRGBString(newColor);
			console.log(newColor);
			var hex = "#";
			for(color in newColor) {
				hex += RGBtoHEX(newColor[color]);
			}
		}
		console.log(hex);
		setFromHEXField(hex);
		setHex();
	});


	var labelSwap = "";
	$(".hex-label").hover(
		function() {
			labelSwap = $(this).text();
			$(this).css("backgroundColor", labelSwap);
			var textColor = getTextColor(HEXtoRGB(labelSwap.slice(1,labelSwap.length)));
			$(this).css("color", textColor);
			$(this).text("\'" + labelSwap +  "\' - copy to clipboard");
		},
		function() {
			$(this).text(labelSwap);
			$(this).css("backgroundColor", "white");
			$(this).css("color", "black")
		}
	);
	$(".hex-label").click(
		function() {
			$(this).text("copied!");
		},
	);

	new Clipboard(".hex-label", {
		text: function(trigger) {return labelSwap;}
	});

	setHex();
})
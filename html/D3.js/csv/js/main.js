d3.csv("data/test.csv", function(error, data){
	var text = "";
	for(var i=0; i<data.length; i++){

		console.log( data[i].label, data[i].value );

		text += data[i].label + " = " + data[i].value + "<br>";
	}
	d3.select("#result").html(text);
});

// var HackerEarth = require("../../node_modules/hackearth-node/distribution/index");

// var hackerEarth = new HackerEarth("472192bc9c58c8e3dff61c2c3ad71e718abd18e1");

// var compileButton = document.querySelector("#compile_button");
// var runButton = document.querySelector("#run_button");
// var codeArea = document.querySelector("#code_area");

var editorConfig = {

	lineNumbers: true,
	matchBrackets: true,
	mode: "text/x-csrc"
}

var editor = CodeMirror.fromTextArea($("#code_area")[0], editorConfig);

$("#compile_button").click(function() {

	console.log(editor.getValue());
	// Gonna send this code to hackerearth

	// var hackerearthConfig = {

	// 	time_limit: 1,
	// 	memory_limit: 323244,
	// 	source: editor.getValue(),
	// 	input: "",
	// 	language: "C++"
	// }

	// hackerearth.compile(hackerearthConfig, (err, res) => {

	// 	if (err) {

	// 		console.log(err);
	// 	}

	// 	console.log(JSON.parse(res));
	// });
});

$("#run_button").click(function() {

	console.log(editor.getValue());
	// gonna send this code to hackerearth

	// var hackerearthConfig = {

	// 	time_limit: 1,
	// 	memory_limit: 323244,
	// 	source: editor.getValue(),
	// 	input: "",
	// 	language: "C++"
	// }

	// hackerearth.run(hackerearthConfig, (err, res) => {

	// 	if (err) {

	// 		console.log(err);
	// 	}

	// 	console.log(JSON.parse(res));
	// });
});
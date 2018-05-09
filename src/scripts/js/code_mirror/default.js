$(document).ready(function(){
	var code = $(".codemirror-testarea")[0];
	var editor = CodeMirror.fromTextArea(code, {
		lineNumbers : true
	});
});
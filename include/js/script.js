/* Used to find the location of the problem */
var lineCount = 1;
var myArray = [];

function oppositeDelimiter(ch) {
	switch (ch) {
        case '(':
        	return ')';
        case '[':
        	return ']';
        case '{':
        	return '}';
        default:
        	break;
        }
};

function pushDelimiter(ch) {
	switch (ch) {
        case '(':
        case '[':
        case '{':
        	myArray.push(ch);
        	break;
        }
};

/* Analyzes the code. If there is a problem, it tells the user the location of the problem and the problem itself Using textarea to take user input and read line by line */
function analyze() {
	var line = "";
	var text = $('#code-input-tb').val().split('\n');
	
	for (var i = 0; i < text.length; i++) {
		line = text[i];
		for (var j = 0; j < line.length; j++) {
			pushDelimiter(line[j]);
			switch (line[j]) {
			case ')':
			case ']':
			case '}':
				if (myArray.length !== 0) {
					var topBracket = myArray.pop();
					if (line[j] !== oppositeDelimiter(topBracket)) {
						toggleErrorAlert("Line " + lineCount + ": expected " + oppositeDelimiter(topBracket) + ", but found " + line[j] + ".");
						return false;
					}
				} else {
					toggleErrorAlert("Line " + lineCount + ": extraneous closing brace " + line[j] + ".");
					return false;
				}
				break;
			default:
				break;
			}
		}
		lineCount++;
	}
	if (myArray.length !== 0){
		toggleErrorAlert("Reached end of code: missing " + oppositeDelimiter(myArray[myArray.length - 1]) + ".");
	}
	else if (myArray.length === 0){
		toggleSuccessAlert();
	}
}

function toggleErrorAlert(errorMessage) {
	if( $('#success-alert').hasClass('hidden') == false )
    		$('#success-alert').addClass('hidden');
    	$('#error-alert span').text(errorMessage);
    	$('#error-alert').removeClass('hidden');
}

function toggleSuccessAlert() {
	if( $('#error-alert').hasClass('hidden') == false )
    		$('#error-alert').addClass('hidden');
        $('#success-alert').removeClass('hidden');	
}
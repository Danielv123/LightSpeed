//
//Usage: 
//progress(80, $('#progressBar'));
//Sets bar to 80%
//
function progress(percent, $element) {
	var progressBarWidth = percent * $element.width() / 100;
	$element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
}
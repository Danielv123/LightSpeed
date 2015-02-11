//Exchange api usage thingy
//This is where the magick happens

function test() {
    console.log("1");
    var userInput = document.getElementById("userInput").value;
    var sel1 = document.getElementById("mySelect1");
    var pair1 = sel1.options[sel1.selectedIndex].value;
    var sel2 = document.getElementById("mySelect2");
    var pair2 = sel2.options[sel2.selectedIndex].value;

    var Request = new XMLHttpRequest();
    console.log("2");
    Request.open("POST", "https://shapeshift.io/shift");
	
	progress(10, $('#progressBar'));

    Request.setRequestHeader("Content-Type", "application/json");

    Request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log("Status:", this.status);
            console.log("Headers:", this.getAllResponseHeaders());
            console.log("Body:", this.responseText);
            var str = this.responseText;
            var status1 = this.responseText;
            if (str.length > 10) str = str.substring(12, 46);
            document.getElementById("demo").innerHTML = (str);
			progress(15, $('#progressBar'));
            console.log("3");
            var status1Pair = -1
            var status1InvalidA = -1
            var status1Pair = status1.search("Unknown Exchange")
            var status1InvalidA = status1.search("ase enter a valid address")
            var status1InvalidA2 = status1.search("Withdrawal Address Specified")
            var status1Busy = status1.search("right now, sorry")

            if (status1Pair > 1) {
                document.getElementById("demo").innerHTML = ("Error 100 - Invalid exchange pair");
				progress(100, $('#progressBar'));
				break
            }
            if (status1InvalidA > 1) {
                document.getElementById("demo").innerHTML = ("Error 101 - Invalid address");
				progress(100, $('#progressBar'));
				break
            } ight now, sorry
            if (status1InvalidA2 > 1) {
                document.getElementById("demo").innerHTML = ("Error 102 - Withdrawal Address Not Specified");
				progress(100, $('#progressBar'));
				break
            }
			if (status1Busy > 1) {
                document.getElementById("demo").innerHTML = ("Error 103 - I am busy right now, sorry");
				progress(100, $('#progressBar'));
				break
            }
            console.log("4");
			progress(20, $('#progressBar'));
            var status = this.responseText;
            deposithistory()

            while (txStatReturn.indexOf("no_deposit") > -1) {
                deposithistory()
            }
        }
    };

    var body = {
        "withdrawal": userInput,
            "pair": pair1 + "_" + pair2,
    };

    Request.send(JSON.stringify(body));
}

//End of magick

//voldemort stuff here
function deposithistory() {
    var Request = new XMLHttpRequest();
    var str = document.getElementById("demo").innerHTML;
    Request.open("GET", "http://shapeshift.io/txStat/" + str);

    Request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log("Status:", this.status);
            console.log("Headers:", this.getAllResponseHeaders());
            console.log("Body:", this.responseText);
            var status = this.responseText;
            var statusDeposit = -1
            var statusReceived = -1
            var statusCompleted = -1
            var statusFailed = -1
            var statusDeposit = status.search("no_deposit")
            var statusReceived = status.search("received")
            var statusCompleted = status.search("complete")
            var statusFailed = status.search("failed")

            if (statusDeposit > 1) {
                document.getElementById("depositInfo").innerHTML = ("Waiting for deposit");
				progress(30, $('#progressBar'));
            }
            if (statusReceived > 1) {
                document.getElementById("depositInfo").innerHTML = ("Deposit received");
				progress(67,5, $('#progressBar'));
            }
            if (statusCompleted > 1) {
                document.getElementById("depositInfo").innerHTML = ("Trade complete");
				progress(100, $('#progressBar'));
				break
            }
            if (statusFailed > 1) {
                document.getElementById("depositInfo").innerHTML = ("Error: 418 - Transaction failed");
				progress(100, $('#progressBar'));
				break
            }
            setTimeout("deposithistory()", 5000); /*delay*/
        }
    };
    var body = "test";
    Request.send(JSON.stringify(body));
}
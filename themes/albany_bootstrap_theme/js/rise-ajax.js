(function(global, factory) {
    "use strict";
    var Rise = Rise || {};
    const getData = function getData(url, err, success) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const result = JSON.parse(this.responseText);
                success(result);
            } else if (this.status !== 0 && this.status !== 200) {
                err(this.status);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    Rise.getData = getData;

    const postData = function postData(url, error, success, data) {
        let dataInString = JSON.stringify(data);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                success(this.responseText);
            } else if (this.status !== 200 && this.status !== 0) {
                error(this.status);
            }
        };
        xhttp.open("POST", url, true);
        xhttp.send(dataInString);
    }
    Rise.postData = postData;

    const errorHandler = function errorHandler(text) {
        let $message = document.querySelector(".message");
        if ($message) {
            $message.innerHTML = text;
            $message.classList.remove("success");
            $message.classList.add("error");
        } else {
            console.log("no message container available. Add an element with message classname to see the message");
            console.error(text);
        }

    }
    Rise.errorHandler = errorHandler;
    window.Rise = Rise;
    return Rise;
})();
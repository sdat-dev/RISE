! function(t, s) { "use strict"; var e = e || {};
    e.getData = function(t, s, e) { var a = new XMLHttpRequest;
        a.onreadystatechange = function() { if (4 == this.readyState && 200 == this.status) { const t = JSON.parse(this.responseText);
                e(t) } else 0 !== this.status && 200 !== this.status && s(this.status) }, a.open("GET", t, !0), a.send() };
    e.postData = function(t, s, e, a) { let n = JSON.stringify(a); var i = new XMLHttpRequest;
        i.onreadystatechange = function() { 4 == this.readyState && 200 == this.status ? e(this.responseText) : 200 !== this.status && 0 !== this.status && s(this.status) }, i.open("POST", t, !0), i.send(n) };
    e.errorHandler = function(t) { let s = document.querySelector(".message");
        s ? (s.innerHTML = t, s.classList.remove("success"), s.classList.add("error")) : (console.log("no message container available. Add an element with message classname to see the message"), console.error(t)) }, window.Rise = e }();
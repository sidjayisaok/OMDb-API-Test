var xhr = new XMLHttpRequest();
var test = "Penguins";
var wikiCall = "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + test + "&callback=?";

xhr.open('GET', wikiCall);
xhr.onload = function() {
    
    if(xhr.status === 200) {
        var res = xhr.responseText;
        var result = JSON.parse(res);
        console.log(result);
    }

    else {
        console.log('An error occured: ' + xhr.status);
    }
};

xhr.send();
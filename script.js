console.log("js")
var search = $("#search")
var searchSubmit = $("#searchSubmit")
var searchClear = $("#searchClear")

var apiKey = "Wnzr87egH7NGFAHMg3rOj8yG4AgnCejd"


searchSubmit.on("click", function (event) {
    console.log(search.val())
    getNYTarticles(search.val())
})

function getNYTarticles(val) {
    var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${val}&api-key=${apiKey}`
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}
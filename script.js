$(document).ready(function () {
    //     //TODO Setup variabes here

    console.log("js");
    var search = $("#search");
    var searchSubmit = $("#searchSubmit");
    var searchClear = $("#searchClear");

    //Jquery datePicker function to generate a plugin calendar
    var startDate = $("#beginDate").datepicker();
    var endDate = $("#endDate").datepicker();

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
});
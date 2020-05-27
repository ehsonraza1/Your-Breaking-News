$(document).ready(function () {
  //TODO Setup variabes here

  console.log("js");
  var search = $("#search");
  var searchSubmit = $("#searchSubmit");
  var searchClear = $("#searchClear");

  //Jquery datePicker function to generate a plugin calendar
  var startDate = $("#beginDate").datepicker();
  var endDate = $("#endDate").datepicker();

  var apiKey = "Wnzr87egH7NGFAHMg3rOj8yG4AgnCejd";
  var newsApiKey = "4ce7da4aff204eb1b8f4db2012e6e095";

  searchSubmit.on("click", function (event) {
    console.log(search.val());
    getNYTarticles(search.val());
    getNewsArticles(search.val());
  });
  // https://newsapi.org/v2/sources?q=${val}apiKey=${newsApiKey}`
  // 0deb5d185fmshde18b9f954e9815p1515bcjsnf6dbc546835f
  function getNewsArticles(val) {
    // "GET", "https://myallies-breaking-news-v1.p.rapidapi.com/GetTopNews"
    // var queryURL = `https://myallies-breaking-news-v1.p.rapidapi.com/GetTopNews?apiKey=0deb5d185fmshde18b9f954e9815p1515bcjsnf6dbc546835f`
    var queryURL = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/sources?q=${val}&apiKey=${newsApiKey}`;
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      console.log(data);
      console.log("news");
    });
  }

  function getNYTarticles(val) {
    var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${val}&api-key=${apiKey}`;
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      console.log(data);
      var docs = data.response.docs;
      for (var i = 0; i < docs.length; i++) {
        var newHeadLine = $("<a>");
        newHeadLine.addClass(
          "waves-effect waves-light waves-effect btn btn-large indigo"
        );
        newHeadLine.attr("href", docs[i].web_url);
        newHeadLine.text(docs[i].headline.main.slice(0, 25) + "...");
        $("#headLine").append(newHeadLine);

        // $("#addHeadLine" + i).append("<h3>response.docs[0].headline.pub_date</h3>");
        console.log(docs[i]);
      }
      //     console.log(response.docs[i].headline.main);
      // console.log(response.docs[0].headline.pub_date);

      //Adding to the html
      var newHeadLine = $("<a>");
      newHeadLine.addClass(
        "waves-effect waves-light waves-effect btn btn-large indigo"
      );
      newHeadLine.attr("id", "articleSection");
      $("#headLine").append(newHeadLine);

      $("#addHeadLine" + i).append(
        "<h3>response.docs[0].headline.pub_date</h3>"
      );
    });
  }
});

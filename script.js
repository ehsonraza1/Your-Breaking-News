var apiKey = "Wnzr87egH7NGFAHMg3rOj8yG4AgnCejd";

var rapidApiKey = "0deb5d185fmshde18b9f954e9815p1515bcjsnf6dbc546835f";
var $news = $("#newsTemplate");
$(document).ready(function () {
  //TODO Setup variabes here

  console.log("js");
  var search = $("#search");
  var searchSubmit = $("#searchSubmit");
  var searchClear = $("#searchClear");


  displayCurrentDate();



  //Jquery datePicker function to generate a plugin calendar
  var startDate = $("#beginDate").datepicker();
  var endDate = $("#endDate").datepicker();
  populateNYTButtons();
  searchSubmit.on("click", function (event) {
    console.log(search.val());
    getNYTarticles(search.val());
    getHoaxyNews(search.val());
    getBingNews(search.val());
  });
});

function displayCurrentDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  document.getElementById("date").innerHTML = `${month}/${day}/${year}`;
}

function getHoaxyNews(val) {
  var settings = {
    async: true,
    crossDomain: true,
    url: `https://api-hoaxy.p.rapidapi.com/articles?sort_by=relevant&use_lucene_syntax=true&query=${val}`,
    method: "GET",
    headers: {
      "x-rapidapi-host": "api-hoaxy.p.rapidapi.com",
      "x-rapidapi-key": "0deb5d185fmshde18b9f954e9815p1515bcjsnf6dbc546835f",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}

function getBingNews(val) {
  var settings = {
    async: true,
    crossDomain: true,
    url: `https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Off&q=${val}`,
    method: "GET",
    headers: {
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "ba818755cbmsh04c0fc93108fdcfp1d4799jsnc7dce26e4a9f",
      "x-bingapis-sdk": "true",
    },
  };

  $.ajax(settings)
    .done(function (response) {
      console.log(response);
      var cardData = {
        url: response.value[0].url,
        description: response.value[0].description,
        title: response.value[0].name,
      };
      $news.append($.parseHTML(generateCard(cardData)));
    })
    .catch(function (error) {
      console.log(error);
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
    var cardData = {
      url: docs[0].web_url,
      description: docs[0].snippet,
      title: docs[0].headline.main,
    };
    $news.append($.parseHTML(generateCard(cardData)));
  });
}
function populateNYTButtons() {
  var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}`;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    var docs = data.response.docs;
    populateBreakingNews(docs);
  });
}
function generateCard(cardData) {
  //Sample Bana Object structure
  //   var cardData = {
  //     url: "abc",
  //     description: "efg",
  //     title: "hij",
  //   };
  //TODO Dynamically generated HTML for News Cards
  var template = `<div class="col s12 m6">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">${cardData.title}</span>
                        <p>${cardData.description}</p>
                    </div>
                    <div class="card-action">
                        <a href="${cardData.url}">Read more</a>
                    </div>
                </div>
            </div>`;
  return template;
}
function populateBreakingNews(docs) {
  for (var i = 0; i < 6; i++) {
    // TODO Dynamically generated HTML for Breaking News Buttons
    var newHeadLine = $("<a>");
    newHeadLine.addClass(
      "waves-effect waves-light waves-effect btn btn-large indigo"
    );
    newHeadLine.attr("href", docs[i].web_url);
    newHeadLine.text(docs[i].headline.main.slice(0, 25) + "...");
    $("#headLine").append(newHeadLine);

    console.log(docs[i]);
  }

  //Adding to the html
  var newHeadLine = $("<a>");
  newHeadLine.addClass(
    "waves-effect waves-light waves-effect btn btn-large indigo"
  );
  newHeadLine.attr("id", "articleSection");
  $("#headLine").append(newHeadLine);
}

var apiKey = "Wnzr87egH7NGFAHMg3rOj8yG4AgnCejd";
var rapidApiKey = "0deb5d185fmshde18b9f954e9815p1515bcjsnf6dbc546835f";

const newsResultsArea = $("#newsResultsArea");

//Cleares the search field
function clearSearch() {
  $("#search").val("");
}

function addClearSearchEventListeners() {
  $("#searchClear").on("click", clearSearch);
  $("#clearSearchIcon").on("click", clearSearch);
}

function performSearch() {
  const textToSearch = $("#search").val();
  getNYTarticles(textToSearch);
  getHoaxyNews(textToSearch);
  getBingNews(textToSearch);
}

function onPressEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    performSearch();
  }
}

$(document).ready(function () {
  displayCurrentDate();
  addClearSearchEventListeners();

  populateNYTButtons();

  $("#searchSubmit").on("click", performSearch);

  $("#search").on("keypress", onPressEnter);
});

// Displays current date on the page
function displayCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  document.getElementById("date").innerHTML = `${month}-${day}-${year}`;
}

//Jquery datePicker function to generate a plugin calendar
// var startDate = $("#beginDate").datepicker();
// var endDate = $("#endDate").datepicker();

//Searches Hoaxy news articles for keywords from user input search field
function getHoaxyNews(val) {
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://api-hoaxy.p.rapidapi.com/articles?sort_by=relevant&use_lucene_syntax=true&query=${val}`,
    method: "GET",
    headers: {
      "x-rapidapi-host": "api-hoaxy.p.rapidapi.com",
      "x-rapidapi-key": "0deb5d185fmshde18b9f954e9815p1515bcjsnf6dbc546835f",
    },
  };

  $.ajax(settings)
    .done(function (response) {
      if (response.articles.length > 0) {
        const mostPopular = response.articles[0];
        const description = `Published by ${mostPopular.domain}, ${mostPopular.number_of_tweets} retweets.`;
        const cardData = {
          url: mostPopular.url,
          description: `Fact Checker\'s Best Match for the Search: ${description}`,
          title: mostPopular.title,
        };
        newsResultsArea.append($.parseHTML(generateCard(cardData)));
      }
    })
    .catch(function (error) {
      //Adding cards(above)
    });
}

//Searches Bing news articles for keywords from user input search field
function getBingNews(val) {
  const settings = {
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
      const cardData = {
        url: response.value[0].url,
        description: response.value[0].description,
        title: response.value[0].name,
      };
      newsResultsArea.append($.parseHTML(generateCard(cardData)));
    })
    .catch(function (error) {});
}

//Searches NYTimes articles for keywords from user input search field
function getNYTarticles(val) {
  const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${val}&api-key=${apiKey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    const docs = data.response.docs;
    const cardData = {
      url: docs[0].web_url,
      description: docs[0].snippet,
      title: docs[0].headline.main,
    };
    newsResultsArea.append($.parseHTML(generateCard(cardData)));
  });
}

function populateNYTButtons() {
  const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    const docs = data.response.docs;
    populateBreakingNews(docs);
  });
}

function generateCard(cardData) {
  const template = `<div class="col s12 m6">
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
    const newHeadLine = $("<a>");
    newHeadLine.addClass("waves-effect waves-light btn-large transparent");
    //newHeadLine.attr("id", "newsButtons");
    newHeadLine.attr("href", docs[i].web_url);
    newHeadLine.text(docs[i].headline.main.slice(0, 30) + "...");
    $("#headLine").append(newHeadLine);
  }
}

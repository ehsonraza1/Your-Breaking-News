

// This function takes an input with id "searchInput" object and listens to its change event.
// After change, results.html is loaded
function onWindowLoad() {
    const awesomeInput = document.getElementById("searchInput");
    if (awesomeInput) {
        awesomeInput.addEventListener("change", resultsHTML )
    }

}

// This function extracts text from the event and navigates to results.html, putting that text in a query string.
function resultsHTML (event){
    console.log(event.target.value)
    if (text) {
        const origin  = window.location.origin;
        const path = window.location.pathname;
        const newPath = path.replace("index.html","results.html");
        window.location.href = `${origin}${newPath}?query=${text}`;
    }
}

// take window object and start listen to its "load" event. When that event is fired, run onWindowLoad function.
window.addEventListener("load", onWindowLoad)
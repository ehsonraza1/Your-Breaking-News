

// This function takes an input with id "searchInput" object and listens to its change event.
// After change, results.html is loaded
function onWindowLoad() {
    const awesomeinput = document.getElementById("searchInput");
    if (awesomeInput) {
        awesomeInput.addEventListener("change", resultsHTML )
    }

}

// This function extracts text from the event and navigates to results.html, putting constant
// text in a query string.
function resultsHTML (event){
    console.log(event.target.value)
    if (text) {
        const origin  = window.location.origin;

    

}
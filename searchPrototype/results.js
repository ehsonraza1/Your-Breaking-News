const nyTimes = {
    mostPolular: "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json",
}

function printApiResponse(apiCallResponse) {
    apiCallResponse.json().then(console.log);
}

function withKey(url) {
    const key = apiKeys.nyTimes;
    return `${url}?api-key=${key}`;
}

// This function loads results
function onWindowLoad() {
    console.log("I'm working")
    
    // passing nyTimes most popular as url into withKey function and then
    // passing the result to fetch, which returns a promise
    const promise = fetch( withKey(nyTimes.mostPolular) );

    // when promise is resolved call printApiResponse with promise result
    promise.then(printApiResponse);

    if (apiKeys !== undefined) {
        console.log("Environment:", apiKeys);
    } else {
        console.log("Api keys are not loaded");
    }
    
    const searchParams = new URLSearchParams(window.location.search);
    const text = searchParams.get('query');
    if (text) {
        alert(`Searching for ${text}`)
    }

}

// take window object and start listen to its "load" event. When that event is fired, run onWindowLoad function.
window.addEventListener("load", onWindowLoad)

/*

*/




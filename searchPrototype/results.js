// This function loads results

function onWindowLoad() {
console.log("I'm working")
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




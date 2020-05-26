// This function takes an input with id "searchInput" object and listens to its change event.
// After change, results.html is loaded
function onWindowLoad() {
    const searchParams = new URLSearchParams(window.location.search);

    const text = searchParams.get('query');
    if (text) {
        alert(`Searching for ${text}`)
    }

}
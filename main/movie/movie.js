
if (document.URL.includes("gaoqingmp4.com") || document.URL.includes("wemp4.com")) {
    simpleMovieWeb()
}

function simpleMovieWeb() {
    insertCss('main/movie/movie.css');

    let botH3 = document.querySelector(".bot h3")
    if (botH3 && botH3.nextSibling) {
        return
    }

    let download = document.querySelector("a[href^='mag']")
    if (download) {
        let link = download.cloneNode()
        link.textContent = download.textContent
        botH3.parentNode.appendChild(link)
    }
}
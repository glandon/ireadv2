(function codenongSimple() {
    if (!document.URL.includes("codenong.com")) {
        return;
    }
    insertCss('main/others/codenong.css');
    inject_iReaderBar(true);
    showDonate();
})()
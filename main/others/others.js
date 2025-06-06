(function freesionSimple() {
    if (document.URL.includes("shuzhiduo.com")) {
        insertCss('main/others/others.css');
        inject_iReaderBar(true);
        showDonate();
    }
})()
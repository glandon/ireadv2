(function freesionSimple() {
    if (document.URL.includes("doc88.com")) {
        book118Simple();
    }
})()

function book118Simple() {
    insertCss('main/others/doc88.css');

    let { ful_scr_toolbar, ful_scr_toolbar_close } = inject_iReaderBar();
    ful_scr_toolbar_close.onclick = onReadBtnClick;

    let bodyLastBgColor = document.body.style.backgroundColor;
    let main = document.getElementsByClassName('content')[0]
    let oldMainClass = main.className

    function enterFullScreen() {
        ful_scr_toolbar.className = "ful_scr_toolbar"
        ful_scr_toolbar_close.textContent = "×";
        document.body.className = "iread_fuscr"

        main.className += " iread_main";
    }

    function exitFullScreen() {
        ful_scr_toolbar.className = "ful_scr_toolbar_notful";
        ful_scr_toolbar_close.textContent = "+";
        document.body.className = "iread_main_notful"

        if (main) main.className = oldMainClass;
        main.style.background = bodyLastBgColor;
    }

    function onReadBtnClick() {
        if (main && main.className.includes("iread_main")) {
            exitFullScreen();
        } else {
            enterFullScreen();
        }
    }

    ///enterFullScreen();
}
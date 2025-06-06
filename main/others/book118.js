(function freesionSimple() {
    if (document.URL.includes("book118.com")) {
        book118Simple();
    }
})()

function book118Simple() {
    insertCss('main/others/book118.css');

    let { ful_scr_toolbar, ful_scr_toolbar_close } = inject_iReaderBar();
    ful_scr_toolbar_close.onclick = onReadBtnClick;

    let bodyLastBgColor = document.body.style.backgroundColor;
    let main = document.body
    let content = document.getElementsByClassName('detail')[0]
    let side = document.getElementsByClassName('side')[0]
    let site = document.getElementById('site')

    function enterFullScreen() {
        ful_scr_toolbar.className = "ful_scr_toolbar"
        ful_scr_toolbar_close.textContent = "×";

        chrome.storage.sync.get(['bgcolor'], function(result) {
            let bgcolor = result.bgcolor ? result.bgcolor : "rgb(227, 227, 227)";
            main.setAttribute('style', "background:" + bgcolor + " !important");
        });

        main.className += "iread_main";

        if (content) content.style = "width:100%;left:0;padding:40px 12.5%"
        side.style = "display: none"
        site.style = "width: 0; height: 0"
    }

    function exitFullScreen() {
        ful_scr_toolbar.className = "ful_scr_toolbar_notful";
        ful_scr_toolbar_close.textContent = "+";

        if (main) main.className = main.className.replace("iread_main", "");
        main.style.background = bodyLastBgColor;

        if (content) content.style = ""
        side.style = "display: unset"
        site.style = "width: unset;height: unset;"
    }

    function onReadBtnClick() {
        if (main && main.className.includes("iread_main")) {
            exitFullScreen();
        } else {
            enterFullScreen();
        }
    }

    enterFullScreen();
}
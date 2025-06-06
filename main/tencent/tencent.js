if (document.URL.includes("tencent.com")) {
    chrome.storage.sync.get(['tencent'], function(result) {
        console.log('tencent.js: Value currently is ' + result.tencent);
        if (result.tencent || result.tencent==undefined) tencentSimple();
    });
}

function tencentSimple() {
    insertCss('main/tencent/tencent.css');

    let main_css_class = "cdc-layout__main";
    let mains = document.getElementsByClassName(main_css_class);
    if (mains.length ==0) {
        main_css_class = "layout-main";
        mains = document.getElementsByClassName("layout-main");
    }

    let main = mains[0];
    let bodyLastBgColor = main?main.style.background:"";

    function enterFullScreen(){
        document.body.className += " iread_full";

        if (main) {
            main.className = "iread_main";
            changeBackgroud(main);
        }
    }
    
    function exitFullScreen(){
        document.body.className = document.body.className.replace(" iread_full", "");

        if (main) {
            main.className = main_css_class;
            main.style.background = bodyLastBgColor;
        }
    }

    function onReaderBtnClicked(fullScr) {
        if (fullScr) {
            enterFullScreen();
            return true
        }

        if (main && main.className.includes("iread_main")) {
            exitFullScreen();
            return false
        } else {
            enterFullScreen();
            return true
        }
    };

    inject_iReaderBarEx('i_tencent', onReaderBtnClicked)
}




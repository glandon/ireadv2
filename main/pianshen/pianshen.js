if (document.URL.includes("pianshen.com")) {
    chrome.storage.sync.get(['pianshen'], function(result) {
        console.log('pianshen.js: Value currently is ' + result.pianshen);
        if (result.pianshen || result.pianshen==undefined) pianshenSimple();
    });
}


function pianshenSimple() {
    insertCss('main/pianshen/pianshen.css');

    let container = document.getElementsByClassName("col-md-8")[0];
    let main = container.parentElement.parentElement
    let bodyLastBgColor = main ? main.style.background : "";

    function onReadBtnClick() {
        if (main && main.className.includes("iread_main")) {
            exitFullScreen();
        } else {
            enterFullScreen();
        }
    }

    function enterFullScreen() {
        document.body.className = "ireadfullscr"
        if (main) {
            main.className = "iread_main";
            changeBackgroud(main);
        }
    }

    function exitFullScreen() {
        document.body.className = ""
        if (main) {
            main.className = "container";
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
    
    inject_iReaderBarEx('i_pianshen', onReaderBtnClicked)
}
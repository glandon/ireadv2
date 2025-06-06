if (document.URL.includes("163.com")) {
    chrome.storage.sync.get(['net163'], function(result) {
        console.log('net163.js: Value currently is ' + result.net163);
        if (result.net163 || result.net163==undefined) net163Simple();
    });
}

function net163Simple() {
    insertCss('main/163/163.css');

    let main_css_class = document.body.className
    let main = document.body

    let bodyLastBgColor = main?main.style.background:"";

    function enterFullScreen(){
        console.log('enterFullScreen')    
        if (main) {
            main.className = "iread_main";
            changeBackgroud(main)
        }
    }
    
    function exitFullScreen(){
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

    inject_iReaderBarEx('i_net163', onReaderBtnClicked)
}

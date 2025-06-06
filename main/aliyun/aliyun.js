if (document.URL.includes("aliyun.com")) {
    chrome.storage.sync.get(['aliyun'], function(result) {
        console.log('aliyun.js: Value currently is ' + result.aliyun);
        if (result.aliyun || result.aliyun==undefined) aliyunSimple();
    });
}

function aliyunSimple() {
    insertCss('main/aliyun/aliyun.css');

    let main_css_class = "left-content"
    let main = document.getElementsByClassName(main_css_class)[0];

    let bodyLastBgColor = main?main.style.background:"";

    function enterFullScreen(){
        console.log('enterFullScreen')
        document.body.className = "iread_fulscr"
        if (main) {
            main.className += " iread_main";
            changeBackgroud(main)
        }
    }
    
    function exitFullScreen(){
        document.body.className = ""

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

    inject_iReaderBarEx('i_aliyun', onReaderBtnClicked)
}




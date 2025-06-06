if (document.URL.includes("juejin.cn")) {
    chrome.storage.sync.get(['juejin'], function(result) {
        console.log('juejin.js: Value currently is ' + result.juejin);
        if (result.juejin || result.juejin==undefined) juejinSimple();
    });
}

function juejinSimple() {
    insertCss('main/juejin/juejin.css');

    let main = document.getElementById("juejin");
    let bodyLastBgColor = main?main.style.background:"";

    function enterFullScreen(){
        console.log('enterFullScreen')
        document.body.className = "iread_fulscr"

        if (main) {
            main.className += "iread_main";
            changeBackgroud(main);
        }
    }
    
    function exitFullScreen(){
        document.body.className = ""

        if (main) {
            main.style.background = bodyLastBgColor;
            main.className = main.className.replace("iread_main", "");
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
    
    inject_iReaderBarEx('i_juejin', onReaderBtnClicked)
}




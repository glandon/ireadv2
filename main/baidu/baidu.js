
chrome.storage.sync.get(['baidusearch'], function(result) {
    console.log('baidu.js: Value currently is ' + result.baidusearch);
    if (result.baidusearch || result.baidusearch==undefined) baiduSimple();
});

function baiduSimple() {
    if (!document.URL.includes("baidu.com/s?")) {
        return;
    }

    if (!document.title.includes("百度搜索")) {
        return;
    }

    /**
     * TODO 更多的优化
     */
}


if (document.URL.includes("baijiahao.baidu.com") || document.URL.includes("mbd.baidu.com")) {
    chrome.storage.sync.get(['baijiahao'], function(result) {
        console.log('baidu.js: baijiahao currently is ' + result.baijiahao);
        if (result.baijiahao || result.baijiahao==undefined) baijiahaoSimple();
    });
}

function baijiahaoSimple() {
    let commentModule = document.getElementById("commentModule")
    if (!commentModule) {
        console.log("not support this website.")
        return
    }

    insertCss('main/baidu/baidu.css');

    let content = commentModule.parentNode.parentNode
    let main = content.parentNode
    let bodyLastBgColor = main?main.style.background:"";

    function enterFullScreen(){
        console.log('enterFullScreen')
     
        document.body.className = "iread_fulscr"
        if (main) {
            main.className += " iread_main";
            changeBackgroud(main)
        }
        content.className += " iread_content"
    }
    
    function exitFullScreen(){
        document.body.className = ""

        if (main) {
            main.style.background = bodyLastBgColor;
            main.className = main.className.replace(" iread_main", "");
        }

        if (content) {
            content.className = content.className.replace(" iread_content", "");
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

    inject_iReaderBarEx('i_baijiahao', onReaderBtnClicked)
}

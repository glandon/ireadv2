if (document.URL.match("ruiwen.com|oh100.com|aiyangedu.com|yuwenmi.com|kuwen.com|cnrencai.com|yjbys.com|xianxue.com")) {
    chrome.storage.sync.get(['ruiwen'], function(result) {
        console.log('ruiwen.js: Value currently is ' + result.ruiwen);
        if (result.ruiwen || result.ruiwen==undefined) ruiwenSimple();
    });
}

///////////Entry//////////////
function ruiwenSimple() {
    insertCss('main/ruiwen/ruiwen.css');
    enableCopy()
 
    let isAiyangedu = false
    if (document.URL.includes("aiyangedu.com")) {
        isAiyangedu = true
        insertCss('main/ruiwen/aiyangedu.css');
    } else if (document.URL.includes("yuwenmi.com")) {
        insertCss('main/ruiwen/yuwenmi.css');
    }

    let main = document.getElementsByClassName("main-left")[0];
    let topbar = document.getElementsByClassName("conttop")[0];

    let content_css = 'iread_content';
    let bodyLastBgColor = main ? main.style.background : "";

    let iread_content = main.children[0];

    function enterFullScreen() {
        if (main) {
            main.className = "iread_main";
            changeBackgroud(main)
        }

        if (isAiyangedu) {
            document.body.className = "aiyang"
        }

        if (topbar) {
            topbar.setAttribute('style', "display:none");
        }

        if (iread_content) {
            iread_content.className += " " + content_css;
        }
    }

    function exitFullScreen() {
        if (main) {
            main.className = "main-left";
            main.style.background = bodyLastBgColor;
        }

        if (topbar) {
            topbar.setAttribute('style', "");
        }

        if (isAiyangedu) {
            document.body.className = ""
        }

        if (iread_content) iread_content.className = iread_content.className.replace(content_css, "");
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
    
    inject_iReaderBarEx('i_ruiwen', onReaderBtnClicked)
}
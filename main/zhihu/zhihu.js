if (document.URL.includes("zhuanlan.zhihu.com")) {
    chrome.storage.sync.get(['zhihu'], function(result) {
        console.log('zhihu.js: Value currently is ' + result.zhihu);
        if (result.zhihu || result.zhihu==undefined) zhihuSimple('i_zhihu');
    });
}

if (document.URL.includes("zhihu.com/question")) {
    chrome.storage.sync.get(['zhihuq'], function(result) {
        console.log('zhihu.js: Value currently is ' + result.zhihuq);
        if (result.zhihuq || result.zhihuq==undefined) zhihuSimple('i_zhihuq');
    });
}

function zhihuSimple(which) {
    insertCss('main/zhihu/zhihu.css');

    let main_css_class = "App"
    let main = document.getElementsByClassName(main_css_class)[0];
    if (!main) {
        main =  document.getElementsByClassName('QuestionPage')[0];
    }

    let bodyLastBgColor = main?main.style.background:"";

    function enterFullScreen(){
        console.log('enterFullScreen')
        document.head.parentNode.className = "iread_fulscr"
        if (main) {
            main.className = "iread_main";
            changeBackgroud(main);
        }
    }
    
    function exitFullScreen(){
        document.head.parentNode.className =""

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
    
    inject_iReaderBarEx(which, onReaderBtnClicked)
    
}




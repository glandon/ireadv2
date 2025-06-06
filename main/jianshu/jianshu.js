if (document.URL.includes("jianshu.com")) {
    chrome.storage.sync.get(['jianshu'], function(result) {
        console.log('jianshu.js: Value currently is ' + result.jianshu);
        if (result.jianshu || result.jianshu==undefined) jianshuSimple();
    });
}

function jianshuSimple() {
    insertCss('main/jianshu/jianshu.css');

    let content = document.getElementsByTagName('section')[0]
    if (!content) {
        jianshuSpecial();
        return
    }

    let content_container = content.parentElement
    let content_container_css = content_container.className

    let bodyLastBgColor = document.body.style.backgroundColor;
    let main = document.body

    function enterFullScreen() {
        showHeaderAndFooter(false);
        if (main) {
            main.className += "iread_main";
            changeBackgroud(main)
        }

        content_container.className = "jiansu_content_container"
        content_container.parentElement.style = "width:80%;padding:0"
    }

    function exitFullScreen() {
        showHeaderAndFooter(true);

        if (main) main.className = main.className.replace("iread_main", "");
        main.style.background = bodyLastBgColor;

        content_container.className = content_container_css
        content_container.parentElement.style = ""
    }

    function showHeaderAndFooter(show) {
        let headers = document.getElementsByTagName("header");
        let footers = document.getElementsByTagName("footer");
        let asides = document.getElementsByTagName("aside");

        if (headers && headers[0]) headers[0].style.display = show ? "block" : "none";
        if (footers && footers[0]) footers[0].style.display = show ? "block" : "none";
        if (asides && asides[0]) asides[0].style.display = show ? "block" : "none";
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
    
    inject_iReaderBarEx('i_jianshu', onReaderBtnClicked)
}

function jianshuSpecial() {
    let bodyLastBgColor = document.body.style.backgroundColor;
    let main = document.body

    insertCss('jianshu/jianshu2.css');

    let nav = document.getElementsByTagName('nav')[0]
    let post = document.getElementsByClassName('post')[0]
    let note_bottom = document.getElementsByClassName('note-bottom')[0]

    function enterFullScreen() {
        if (post) post.style = "width:75%;padding:40px 8%;background:white;border-radius:4px";
        if (nav) nav.style.display = "none"
        if (note_bottom) note_bottom.style = "margin:20px 12.5%;padding:30px 60px;border-radius:4px;background:white;"

        if (main) {
            changeBackgroud(main)
            main.className += "iread_main";
        }
    }

    function exitFullScreen() {
        if (post) post.style = "width:75%;padding:0;";
        if (nav) nav.style.display = ""
        if (note_bottom) note_bottom.style = "padding:0 10.5%;background:unset"

        if (main) main.className = main.className.replace("iread_main", "");
        main.style.background = bodyLastBgColor;
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
    
    inject_iReaderBarEx('i_jianshu', onReaderBtnClicked)
}
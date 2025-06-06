
if (document.URL.includes("csdn.net")) {
    chrome.storage.sync.get(['csdn'], function(result) {
        console.log('CSDN.js: Value currently is ' + result.csdn);
        if (result.csdn || result.csdn==undefined) csdnSimple();
    });
}

function csdnSimple() {
    insertCss('main/csdn/csdn.css')
    insertJs('main/csdn/xcopy.js')
    enableCopy()

    let codes = document.getElementsByClassName("hljs-button")

    if (codes) {
        for (let code of codes) {
            code.setAttribute('onclick', "onCopyCode(event)")
            code.parentNode.onmouseenter=()=>{
                code.setAttribute('data-title', "爱读复制")
            }
        }
    }

    ////////////////////////////
    let asideSearchArticle = document.getElementById("asideSearchArticle");

    if (asideSearchArticle && asideSearchArticle.nextSibling) {
        asideSearchArticle.nextSibling.display="none"
    }

    //csdn-shop-window-top
    let csdn_shop_window_top = document.getElementById("csdn-shop-window-top");
    if (csdn_shop_window_top) {
        csdn_shop_window_top.style.display="none"
    }

    let csdn_right_aside = document.getElementById("rightAside");
    let blog_container_aside = document.getElementsByClassName("blog_container_aside");

    let main = document.getElementsByTagName("main")[0];

    let contentBox = document.getElementsByClassName("blog-content-box")[0];
    let csdnToolbar = document.getElementById("csdn-toolbar");

    let bodyLastBgColor = document.body.style.background;

    function exitFullScreen() {
        document.body.className = document.body.className.replace(" iread_body", "");

        if (main) {
            main.className = "";
            document.body.style.background = bodyLastBgColor;
        }

        if (csdn_right_aside) {
            csdn_right_aside.style.display=""
        }
        
        if (blog_container_aside[0]) {
            blog_container_aside[0].className = blog_container_aside[0].className.replace("iread-aside", "");
            blog_container_aside[0].left = "auto";
        }

        if (csdnToolbar) csdnToolbar.className = csdnToolbar.className.replace("iread_hide_toolbar", "");
        if (contentBox) contentBox.className = contentBox.className.replace("iread_blog_content_box", "");
        
        document.body.scrollIntoView();
    }

    function enterFullScreen() {
        document.body.className += " iread_body";

        if (csdn_right_aside) {
            csdn_right_aside.style.display="none"
        }

        if (blog_container_aside[0]) {
            blog_container_aside[0].className += " iread-aside";
        }

        if(main) {
            main.className = "iread_main";
            changeBackgroud(document.body, true)
        }

        if (csdnToolbar) csdnToolbar.className += " iread_hide_toolbar";
        if (contentBox) contentBox.className += " iread_blog_content_box";

        document.body.scrollIntoView();
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

    inject_iReaderBarEx('i_csdn', onReaderBtnClicked)
}

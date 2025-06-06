if (document.URL.includes("jb51.net")) {
    chrome.storage.sync.get(['jb51'], function(result) {
        console.log('jb51.js: Value currently is ' + result.jb51);
        if (result.jb51 || result.jb51==undefined) jb51Simple();
    });
}

///////////Entry//////////////
function jb51Simple() {
enableCopy()

if (document.URL.endsWith("jb51.net/")) {
    insertCss('main/jb51/jb51.home.css');
    return;
} else {
    insertCss('main/jb51/jb51.css');
}

////////////////////////////
let main = document.getElementById("main");
let container = document.getElementById("container");
let wrapper = document.getElementById("wrapper");
let article = document.getElementById("article");

// let main_left = document.getElementsByClassName("main-left");
let main_right = document.getElementsByClassName("main-right");
let search = document.getElementsByClassName("search");
let breadcrumb = document.getElementsByClassName("breadcrumb");

let topbar = document.getElementById("topbar");
let header = document.getElementById("header");
let submenu = document.getElementById("submenu");
let rshare = document.getElementById("right-share");

let bodyLastBgColor;
if (main)bodyLastBgColor = main.style.background;

function exitFullScreen() {
    document.body.className = document.body.className.replace(" iread_body", "");
 
    if (rshare) rshare.className = rshare.className.replace(" rshare", "");

    if (main) main.className = main.className.replace(" iread_main", "");
    if (main) main.style.background = bodyLastBgColor;
 
    if (container) container.className = container.className.replace(" iread_container", "");
    if (wrapper) wrapper.className = wrapper.className.replace(" iread_wrapper", "");
    if (article) article.className = article.className.replace(" iread_article", "");
    
    if (main_right[0]) main_right[0].className = main_right[0].className.replace(" iread_main_right", "");
    if (search[0]) search[0].className = search[0].className.replace(" iread_search", "");
    if (breadcrumb[0]) breadcrumb[0].className = breadcrumb[0].className.replace(" iread_breadcrumb", "");
    
    if (topbar) topbar.className = topbar.className.replace(" iread_topbar", "");
    if (header) header.className = header.className.replace(" iread_header", "");
    if (submenu) submenu.className = submenu.className.replace(" iread_submenu", ""); 
}

function enterFullScreen() {
    document.body.className += " iread_body";

    if (rshare)rshare.className += " rshare"
    if (main) {
        main.className +=" iread_main";
        changeBackgroud(main);
    }

    if (container) container.className +=" iread_container";
    if (wrapper) wrapper.className += " iread_wrapper";
    if (article) article.className += " iread_article";

    if (main_right[0]) main_right[0].className += " iread_main_right";
    if (search[0]) search[0].className += " iread_search";
    if (breadcrumb[0]) breadcrumb[0].className += " iread_breadcrumb";
    
    if (topbar) topbar.className += " iread_topbar";
    if (header) header.className += " iread_header";
    if (submenu) submenu.className += " iread_submenu";

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

inject_iReaderBarEx('i_jb51', onReaderBtnClicked)
}

/**
 * 实验性功能，配置支持更多网站
 */
function checkAndApply(key, func) {
    chrome.storage.sync.get([key], function(result) {
        console.log('web.js: Value currently is ' + result[key]);
        if (result[key] || result[key]==undefined) func();
    });   
}

if (document.URL.includes("segmentfault.com")) {
    checkAndApply('segmentfault', function(){
        insertCss('main/web/web.css');
        applyCss2Web("segmentfault", "i_segmentfault");
        enableCopy();
    })
}

else if (document.URL.includes("51cto.com")) {
    checkAndApply('cto51', function(){
        insertCss('main/web/web.css');
        applyCss2Web("cto51", "i_cto51");
        enableCopy();
    })
}

else if (document.URL.includes("sina.com")) {
    checkAndApply('sina', function(){
        insertCss('main/web/web.css');
        applyCss2Web("sina", "i_sina");
    })
}

else if (document.URL.includes("qq.com")) {
    checkAndApply('qqnews', function(){
        insertCss('main/web/web.css');
        applyCss2Web("qqnews", "i_qqnews");
    })
}

else if (document.URL.includes("sohu.com")) {
    console.log("open sohu")
    checkAndApply('sohu', function(){
        console.log("insertCss")
        insertCss('main/web/web.css');
        console.log("applyCss2Web")
        applyCss2Web("sohu", "i_sohu");
    })
}
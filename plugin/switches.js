
let autoItems = [
    "i_csdn",
    "i_juejin",
    "i_jb51",
    "i_sohu",
    "i_jianshu",
    "i_pianshen",
    "i_ruiwen",
    "i_tencent",
    "i_aliyun",
    "i_net163",
    "i_zhihu",
    "i_zhihuq",
    "i_baijiahao",
    "i_segmentfault",
    "i_cto51",
    "i_qqnews",
    "i_sina"
]

let enableWebs = [
    "csdn",
    "juejin",
    "jb51",
    "sohu",
    "jianshu",
    "pianshen",
    "ruiwen",
    "tencent",
    "aliyun",
    "net163",
    "zhihu",
    "zhihuq",
    "baijiahao",
    "segmentfault",
    "cto51",
    "qqnews",
    "sina"
]

let webNames = [
    "CSDN",
    "掘金",
    "脚本之家",
    "搜狐新闻",
    "简书",
    "程序员大本营",
    "瑞文系",
    "腾讯云技术博客",
    "阿里云技术博客",
    "网易新闻",
    "知乎专栏",
    "知乎问答",
    "百家号",
    "segmentfault",
    "51CTO",
    "QQ新闻",
    "新浪新闻"
]

let maxWidthIds = [
    "width1000", "width1200", "width1400", "width1600", "width1800"
]

let webLogoIds = [
    "none", "guohui", "cat", "kitty", "fo", "muyu"
]

//<input type="checkbox" id="baidusearch" value="1" checked disabled>百度免广告(可在“有权访问的网站”关闭)<br/>
let webListDiv = document.getElementById('web_enable_list')

enableWebs.forEach((v, i)=> {
    let optEnable = document.createElement("input");
    optEnable.type = 'checkbox';
    optEnable.id = v;
    optEnable.checked = true;
    optEnable.value = 1;
    webListDiv.appendChild(optEnable);

    let optAuto = document.createElement("input");
    optAuto.type = 'checkbox';
    optAuto.id = `i_${v}`;
    optAuto.checked = true;
    optAuto.value = 1;
    optAuto.className = 'web_auto_opt';
    webListDiv.appendChild(optAuto);

    let span = document.createElement("span")
    span.innerText = webNames[i];
    span.className = "webname"
    webListDiv.appendChild(span);

    webListDiv.appendChild(document.createElement("br"));
})

/** 2. iread auto cofig */
let autoItemsObjs = {}
autoItems.forEach ((v)=>{
    let autoItem = document.getElementById(v);
    autoItemsObjs[v] = autoItem
    if (!autoItem) {
        console.log("xxx:"+v)
    }
    autoItem.addEventListener("click", ()=>setAutoEnableCfg(v));
})

function setAutoEnableCfg(v) {
    chrome.storage.sync.set({[v]: autoItemsObjs[v].checked }, function() {
        console.log('auto enble is set to ' + v + autoItemsObjs[v].checked);
    });
}

/** 3. usr color enable cofig */
let enableWebObjs = {}
enableWebs.forEach ((v)=>{
    let enableItem = document.getElementById(v);
    enableWebObjs[v] = enableItem
    enableItem.addEventListener("click", ()=>setWebSiteEnableCfg(v));
})

function setWebSiteEnableCfg(v) {
    chrome.storage.sync.set({[v]: enableWebObjs[v].checked }, function() {
        console.log('web enble is set to ' + v + enableWebObjs[v].checked );
    });
}

let allItems = enableWebs.concat(autoItems)
let allConfigItems = {...autoItemsObjs, ...enableWebObjs}

chrome.storage.sync.get(allItems, function(result) {
    for (let i in allConfigItems) {
        allConfigItems[i].checked = result[i]==undefined || result[i] 
    }
})

/** 4. max width cofig */
let maxWidthNodes = {}
maxWidthIds.forEach ((v)=>{
    let maxWithItem = document.getElementById(v);
    maxWidthNodes[v] = maxWithItem
    maxWithItem.addEventListener("click", ()=>setWebSiteMaxWidthCfg(maxWithItem));
})

function setWebSiteMaxWidthCfg(v) {
    chrome.storage.sync.set({"maxWidth": v.value}, function() {
        console.log('max width is set to '+ v.value );
    });
}

chrome.storage.sync.get(["maxWidth"], function(result) {
    let atLeastOne = false
    for (let i in maxWidthNodes) {
        maxWidthNodes[i].checked = maxWidthNodes[i].value == result["maxWidth"]
        atLeastOne |= maxWidthNodes[i].checked
    }
    if (!atLeastOne) {
        maxWidthNodes['width1400'].checked = true;
    }
})

/** 5. logo cofig */
let logoConfig = {}
webLogoIds.forEach ((v)=>{
    let logoItem = document.getElementById(v);
    logoConfig[v] = logoItem
    logoItem.addEventListener("click", ()=>setWebLogoCfg(logoItem));
})

function setWebLogoCfg(v) {
    chrome.storage.sync.set({"webLogo": v.value}, function() {
        console.log('web logo is set to '+ v.value );
    });
}

chrome.storage.sync.get(["webLogo"], function(result) {
    let atLeastOne = false
    for (let i in logoConfig) {
        logoConfig[i].checked = logoConfig[i].value == result["webLogo"]
        atLeastOne |= logoConfig[i].checked 
    }

    if (!atLeastOne) {
        logoConfig['none'].checked = true;
    }
})
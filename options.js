'use strict';

let recommendList = document.getElementById('app_div');
let hotNewsList = document.getElementById('hot_news_div');
// let simHardList = document.getElementById('sim_hard_div');
let yaoguaPage = document.getElementById('yaogua_div');
let know_divList = document.getElementById('know_list');
let know_div = document.getElementById('know_div');
let book_divList = document.getElementById('book_list');
let book_div = document.getElementById('book_div');
let eventsList = document.getElementById('events_div');

recommendList.style = "display:none"
hotNewsList.style = "display:block"
yaoguaPage.style = "display:none"
// simHardList.style = "display:none"

let recommendApp = document.getElementById('recommend_app');

recommendApp.children[0].onclick = ()=>onRecommendClick([1,0,0])
recommendApp.children[1].onclick = ()=>onRecommendClick([0,1,0])
recommendApp.children[2].onclick = ()=>onRecommendClick([0,0,1])
// recommendApp.children[3].onclick = ()=>onRecommendClick([0,0,0,1])

function onRecommendClick(pages) {
    pages.forEach((e, i) => {
        if (e) {
            recommendApp.children[i].className = "select";
            recommendApp.children[i+pages.length+1].style = "min-height:8em";
        } else {
            recommendApp.children[i].className = "unselect";
            recommendApp.children[i+pages.length+1].style = "display:none";
        }
    })
}

const coverInput = document.getElementById("event_cover_input")
coverInput.onchange = (e)=> {
    console.log(e)

    const cover = document.getElementById("preview_events_a");
    if (cover) {
        cover.setAttribute("style", `background-size:cover;background-image:url("${e.target.value}")`);
    }
}

let visitCount = document.getElementById('visit_count');
let notification = document.getElementById('notification');

let knowsData=[],eventsData=[],appsData=[],booksData=[];
let pluginfo = {};

chrome.storage.local.get("pluginfo", (cache)=>{
    parseData(cache.pluginfo)

    fetchResource("https://handbooks.cn:18443/ireader/info").then((resp)=>{
        chrome.storage.local.set({pluginfo: resp.data});
        resetPage();
        parseData(resp.data);
    }).catch((e) => {
        console.log("get events -> Network error->" + e)
    });
})

function resetPage() {
    knowsData=[],eventsData=[],appsData=[], booksData=[];
    pluginfo = {};
    while(recommendList.firstChild) recommendList.removeChild(recommendList.firstChild);
    while(hotNewsList.firstChild) hotNewsList.removeChild(hotNewsList.firstChild);
    while(know_div.firstChild) know_div.removeChild(know_div.firstChild);
    while(book_div.firstChild) book_div.removeChild(book_div.firstChild);
    while(eventsList.firstChild) eventsList.removeChild(eventsList.firstChild);
}

function parseData(dat) {
    if (dat == null) {
        return
    }
    for (let d of dat.info) {
        if (d.type == "knowledge") knowsData.push(d);
        else if (d.type == "book") booksData.push(d);
        else if (d.type == "app") appsData.push(d);
        else if (d.type == "event") eventsData.push(d);
        else pluginfo = d;
    }
    visitCount.textContent = pluginfo.cover;
    notification.textContent = pluginfo.msg;

    /** 推荐书籍 */
    if (booksData.length > 0) {
        book_divList.style = "display: block"
        for (let item of booksData) { bookItem(item)}
    } else {
        book_divList.style = "display: none"
    }
 
    /** 涨知识 */
    if (knowsData.length > 0) {
        know_divList.style = "display: block"
        for (let item of knowsData) { knowItem(item)}
    } else {
        know_divList.style = "display: none"
    }

    /** 新闻列表 */
    constructHotNewsList(dat.news);

    /** 应用推荐 */
    constructAppList(appsData)

    /** 随机事件列表 */
    constructEventsList(eventsData)

    /** 搞笑日历 */
    constructCalendar(dat.calendar);
}

function bookItem(data) {
    let li = document.createElement("li");
    let coverDiv = document.createElement("div");
    let linkDiv = document.createElement("div");
    li.appendChild(coverDiv);
    li.appendChild(linkDiv);

    let img = document.createElement("img");
    img.alt = data.title;
    img.src = data.cover;
    coverDiv.appendChild(img);

    let a = document.createElement("a");
    a.textContent = data.title;
    a.href = data.link;
    a.target = "_blank"
    coverDiv.appendChild(a);

    book_div.appendChild(li);
}

function knowItem(data) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.textContent = ellipse(data.msg, 60);
    a.target = 'blank';
    a.href = data.link;
    li.appendChild(a);
    know_div.appendChild(li);
}

function constructAppList() {
    if (!appsData) {
        let li = document.createElement('li');
        recommendList.appendChild(li)
        li.textContent = "服务不可用"
        return
    }

    for (let item of appsData) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        let p = document.createElement('p');

        li.appendChild(a);
        a.appendChild(p)

        p.textContent = item.title;
        p.style="white-space: nowrap;";
 
        a.href = item.link;
        a.target = "_blank";

        if (item.cover) {
            a.setAttribute("style", `background-size:cover;background-image:url(${item.cover})`)
        }
        recommendList.appendChild(li);
    }
}

function newsItem(item) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    let p = document.createElement('p');
    li.appendChild(a);
    a.appendChild(p)

    let len = 13
    if (window.innerWidth < 1200) {
        len = 10;
    } else if (window.innerWidth < 1400) {
        len = 13;
    } else if (window.innerWidth < 1600) {
        len = 18;
    } else {
        len = 20;
    }

    if (item.hot) {
        p.textContent = ellipse(item.title, len) 
        p.textContent += "🔥" + item.hot;
    } else {
        p.textContent = ellipse(item.title, len+5) 
    }

    a.href = item.url;
    a.target = "_blank";
    hotNewsList.appendChild(li);
}

function constructHotNewsList(news) {
    let newsList = news
    for (let item of newsList) {
        for (let data of item.data) {
            newsItem(data)
        }
    }
}

function showSnapshot() {
    chrome.storage.local.get("snapshot", (cache)=>{
        const snapshotdiv = document.getElementById("snapshotmask");
        if (cache.snapshot) {
            document.getElementById("snapshot").src = cache.snapshot;
            snapshotdiv.style = "display:block";
        }
        document.getElementById("snapshotbtn").onclick = ()=> {
            snapshotdiv.style = "display:none";
        }
        chrome.storage.local.set({snapshot:""});
    });
}

let optionPageTabId;
chrome.tabs.onUpdated.addListener((tabId)=>{
    if (!optionPageTabId) optionPageTabId = tabId
});

chrome.tabs.onActivated.addListener((e)=>{
    if (e.tabId == optionPageTabId) {
        console.log("back to option page!")
        showSnapshot()
    }
});

// try to show snapshot default!
showSnapshot();

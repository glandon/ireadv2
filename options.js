'use strict';

let yaoguaPage = document.getElementById('yaogua_div');
yaoguaPage.style = "display:block"


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

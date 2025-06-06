// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(() => {
    setDefaultSettings();
});

function setDefaultSettings() {
    chrome.storage.sync.set({ 
          bgcolor: '',
             csdn: true,    i_csdn: true,
           juejin: true,  i_juejin: true,
             jb51: true,    i_jb51: true,
             sohu: true,    i_sohu: true,
           net163: true,  i_net163: true,
          jianshu: true, i_jianshu: true,
         pianshen: true,i_pianshen: true,
          tencent: true, i_tencent: true,
           aliyun: true,  i_aliyun: true,
            zhihu: true,   i_zhihu: true,
            zhihuq: true,   i_zhihuq: true,
           ruiwen: true,  i_ruiwen: true,
     segmentfault: true, i_segmentfault: true,
            cto51: true, i_cto51: true,
             sina: true, i_sina: true,
           qqnews: true, i_qqnews: true,
           baijiahao: true, i_baijiahao: true
    } )
}

// chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
//     const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
//     console.log(msg);
// });

chrome.runtime.onMessage.addListener(
    function handleMessage(request, sender, respCallback) {
    if (request.action == "showoption") {
        chrome.runtime.openOptionsPage();
        respCallback({res: "ok"});
    } else if (request.action == "snapshot") {
        try { takeSnapshot() } catch(e){}
    } else if (request.action == "fetch") {
        handleFetchMsg(request, respCallback)
    } else if (request.action = "capture") {
        doCapture(respCallback, request)
    } else {
        respCallback({res: "not support"});
    }
    return true
})

// 先初始化 offCanvans，生成 drawContext
// 记录lastScrollY绘制拼接页面
var offCanvans = null, drawContext = null;
var lastScrollY = -1;

function doCapture(respCallback, data) {
    console.log(JSON.stringify(data));

    if (data.complete) {
        capture(data.y, data.windowHeight, data.totalWidth, data.totalHeight, data.complete)
    } else {
        console.log("start capture");
        drawContext = null;
        offCanvans = null;
    }

    setTimeout(()=>respCallback(), 1000);
}

function handleRsp(resp, callback) {
    const headers = { status: resp.status, statusText: resp.statusText};
    return callback([text, headers])
}

async function handleFetchMsg(request, respCallback) {
    console.log('handleFetchMsg');
    let headers = {}

    try {
        let resp = await fetch(request.url, request.args);
        headers = { status: resp.status, statusText: resp.statusText};
        let data = await resp.json();
        respCallback([data, headers]);
    } catch(e) {
        respCallback([null, headers])
    }
}

/////////////////////////////////////////////////////
console.log('Service worker started.');

function capture(y, wh, fw, fh, progress) {
    if (!offCanvans) {
        offCanvans = new OffscreenCanvas(fw*3/4, fh);
        drawContext = offCanvans.getContext("2d");
        drawContext.canvas.width = fw*3/4, drawContext.canvas.height = fh;    
        lastScrollY = fh;
        console.log("fw="+fw + ", fh="+fh + ", lastScrollY="+lastScrollY)
    }

    console.log("captureVisibleTab",new Date().getTime())
    chrome.tabs.captureVisibleTab( null, {format: 'png', quality: 100}, function(dataURI) {
        drawCapture(dataURI, y, fw, wh, progress)
        lastScrollY = y;
    });
}

async function drawCapture(dataURI, y, w, h, progress) {
    const m = await createImageBitmap(toBlob(dataURI));
    console.log("y="+y + ", w="+w + ", h="+h)
    drawContext.drawImage(m, -w/8, y-40, w, h);
    
    // drawContext.moveTo(0, y);
    // drawContext.lineTo(w, y);
    // drawContext.lineWidth = 5;
    // drawContext.strokeStyle = "red";
    // drawContext.stroke();

    if (progress == 1) {
        onCaptureComplete()
    }
}

async function onCaptureComplete() {
    const blob = await offCanvans.convertToBlob({
        type: "image/png"
    });

    const m = await new Promise((e => {
        const r = new FileReader;
        r.onloadend = () => e(r.result), r.readAsDataURL(blob);
    }))

    chrome.storage.local.set({snapshot: m})
    // chrome.storage.local.set({snapshot: dataURI})
    chrome.runtime.openOptionsPage();
}

function toBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // create a blob for writing to a file
    var blob = new Blob([ab], {type: mimeString});
    return blob;
}
function enableCopy() {
    function t(e) {
        e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation()
    }

    document.querySelectorAll("*").forEach(e => {
        "none" === window.getComputedStyle(e, null).getPropertyValue("user-select") && e.style.setProperty("user-select", "text", "important")
    }), [
        "copy",
        // "cut",
        // "contextmenu", 
        // "selectstart", 
        // "mousedown", 
        // "mouseup", 
        // "mousemove", 
        // "keydown", 
        // "keypress", 
        // "keyup"
        ].forEach(function (e) {
        document.documentElement.addEventListener(e, t, {capture: !0})
    })
}

function changeBackgroud(main, useweb) {
    chrome.storage.sync.get(['bgcolor'], function(result) {
        let background = null
        if (result.bgcolor.startsWith("images")) {
            background = 'background:' + result.bgcolor + " !important";
        } else if (result.bgcolor) {
            background = 'background:' + result.bgcolor + " !important";
        } else if (useweb){
            console.log("keep background of web.")
        } else {
            background = 'background:rgb(227, 227, 227) !important';
        }

        if (!background) {
            return
        }

        let mainStyle = main.getAttribute("style")
        if (mainStyle) {
            if (!mainStyle.endsWith(';')) mainStyle += ';';
            background = mainStyle.replace(/\s*background.*?;/g, "")+background
        }
        main.setAttribute('style', background + ";background-attachment:fixed !important;");
    });
}

function injectCss(cs) {
    let style = document.createElement('style');
    document.head.appendChild(style);
    style.textContent = cs;
}

function insertCss(cs) {
    var el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('href', chrome.runtime.getURL(cs));
    document.head.appendChild(el);
}

function insertJs(js) {
    var script = document.createElement('script');
    script.setAttribute('src', chrome.runtime.getURL(js));
    script.type = 'text/javascript';
    document.head.appendChild(script);
}

function takeSnapshot() {
    var target = document.getElementsByClassName("iread_main")[0]
    var canvas = document.createElement("canvas");
    canvas.width = target.scrollWidth;
    canvas.height = target.scrollHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(target, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    var link = document.createElement("a");
    link.download = "screenshot.png";
    link.href = canvas.toDataURL();
    link.click();
}

function addDonateBtn(root) {
    let donate_div = document.createElement("div");
    donate_div.className = "ful_scr_toolbar_icon";
    donate_div.id = "ireader_donate_icon";

    let ireader_icon = document.createElement("img");
    ireader_icon.src = chrome.runtime.getURL('images/simbaba.png');
    donate_div.appendChild(ireader_icon);
    root.appendChild(donate_div);
}

function addPrintBtn(root) {
    let el = document.createElement("div");
    el.className = "ireader_btn ireader_config";
    el.id = "ireader_print";
    el.innerHTML = "㊞";
    el.onclick=()=>{window.stop();window.print()}
    root.appendChild(el);
}

function addOptionBtn(root) {
    let el = document.createElement("div");
    el.className = "ireader_btn ireader_config";
    el.id = "ireader_config_btn";
    el.innerHTML = "㊠";
    el.onclick = ()=> {
        // chrome.tabs.create({url:"chrome-extension://ejcljjkgegdnefmgllmnfnonnbemeacj/options.html"})
        chrome.runtime.sendMessage(null, {action:"showoption"}, (resp)=>{
            console.log('resp data', resp);
        });
    }
    root.appendChild(el);
}

function addFullScrBtn(root) {
    let el = document.createElement("div");
    el.className = "ireader_btn ireader_config";
    el.id = "ireader_fullscr_btn";
    el.innerHTML = "㊪";
    el.onclick = ()=> {
        if (document.fullscreenElement) {
            el.style.color = "";
            document.exitFullscreen()
        } else {
            el.style.color = "gold";
            document.documentElement.requestFullscreen()
        }
    }
    root.appendChild(el);
}

function addEditableBtn(root) {
    let el = document.createElement("div");
    el.className = "ireader_btn ireader_config";
    el.id = "ireader_edit";
    el.innerHTML = "㊢";
    el.onclick = ()=> {
        if (document.body.isContentEditable) {
            el.style.color = "";
            document.body.contentEditable = false
        } else {
            el.style.color = "gold";
            document.body.contentEditable = true
        }
    }
    root.appendChild(el);
}

function addTakeSnapShotBtn(root) {
    let el = document.createElement("div");
    el.className = "ireader_btn ireader_config";
    el.id = "ireader_snapshot";
    el.innerHTML = "📷";
    // el.onclick = ()=> {
    //     // chrome.tabs.create({url:"chrome-extension://ejcljjkgegdnefmgllmnfnonnbemeacj/options.html"})
    //     chrome.runtime.sendMessage(null, {action:"snapshot"}, (resp)=>{
    //         console.log('resp data', resp);
    //     });
    // }
    el.onclick = capture
    root.appendChild(el);
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
}

function addGongdeDiv(container) {
    let gongde = document.createElement("div");
    gongde.className = "logo-wrapper";

    let gongdeTextWrapper = document.createElement("div");
    gongdeTextWrapper.className = "logo-text-wrapper";
    gongdeTextWrapper.id = "logo-text-wrapper-id";

    let gongdeImg =  document.createElement("img");
    gongdeImg.id = "logo-img-id";
    gongdeImg.alt = "爱读";

    gongde.appendChild(gongdeTextWrapper);
    gongde.appendChild(gongdeImg);

    container.appendChild(gongde);
    return gongde;
}

function inject_iReaderBar(onlydonate) {
    let ful_scr_toolbar, ful_scr_toolbar_close
    let iread_root = document.createElement("div");
    iread_root.className = "ireader_root_div"

    if (onlydonate) {
        addDonateBtn(iread_root)
        document.body.appendChild(iread_root);
        return
    }

    ful_scr_toolbar = document.createElement("div");
    ful_scr_toolbar.className = "ful_scr_toolbar_notful";
    ful_scr_toolbar_close = document.createElement("a");
    ful_scr_toolbar_close.id = "toolbar_close_id"
    ful_scr_toolbar.appendChild(ful_scr_toolbar_close);
    ful_scr_toolbar.style.right = "-10%";

    let gongde = addGongdeDiv(iread_root);
    iread_root.appendChild(ful_scr_toolbar);
    showLogo(gongde, 'none')   

    addPrintBtn(iread_root)
    addOptionBtn(iread_root)
    addFullScrBtn(iread_root)
    addEditableBtn(iread_root)
    addTakeSnapShotBtn(iread_root)
 
    document.body.appendChild(iread_root);
    return { ful_scr_toolbar, ful_scr_toolbar_close, gongde}
}

function autoFullScr(site, fnFullScr) {
    chrome.storage.sync.get([site], function(result) {
        console.log(site +' enable auto is ' + result[site]);
        if (result[site] || result[site] == undefined) {
            fnFullScr();
            showLogo(null, 'none');
        } else {
            showLogo(null, 'images/iread_32.png');
        }
    });
}

var isDrag = false
function onLogoMouseDown(ev) {
    const logo = ev.currentTarget;
    let ex = 0;
    let ey = 0;
    let moveCount = 0;

    isDrag = false
    document.onmousemove = ev => {
        if (moveCount++ == 0) {
            ex = ev.clientX - logo.offsetLeft;
            ey = ev.clientY - logo.offsetTop;
        }
        logo.style.left = `${ev.clientX - ex}px`;
        logo.style.top = `${ev.clientY - ey}px`;
    }

    document.onmouseup = ev => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (moveCount == 0) {
            return;
        }
        moveCount = 0;

        if (!logo.style.left) {
            logo.style.left = `${100*(ev.clientX - ex)/window.innerWidth}%`;
            logo.style.top = `${100*(ev.clientY - ey)/window.innerHeight}%`;
        }

        const logoPositionValue = document.body.style.getPropertyValue("--ipage-logo-position")
        let lastLogoPosition = null
        if (logoPositionValue) {
            lastLogoPosition = JSON.parse(logoPositionValue)
        }
       
        if (lastLogoPosition) {
            let diffX = parseInt(lastLogoPosition.x)-parseInt(logo.style.left)
            let diffY = parseInt(lastLogoPosition.y)-parseInt(logo.style.top)
            if (Math.abs(diffX) < 4 && Math.abs(diffY) < 4) return
            isDrag = true;
        } else {
            isDrag = false;
        }

        let logoPosition = {
            'x':logo.style.left, 'y':logo.style.top, 
            'w':window.innerWidth, 'h': window.innerHeight
        };
        chrome.storage.sync.set({"logoPosition":logoPosition})
        document.body.style.setProperty("--ipage-logo-position", JSON.stringify(logoPosition)); 
    }
}

function inject_iReaderBarEx(site, fnClick) {
    let {ful_scr_toolbar,ful_scr_toolbar_close, gongde} = inject_iReaderBar()
    let logo = gongde.children[1];

    ful_scr_toolbar_close.onclick = ()=> {
        if (isDrag && ful_scr_toolbar.className != "ful_scr_toolbar") {
            return
        }
        if (fnClick()) {
            ful_scr_toolbar.style.top = "40px"
            ful_scr_toolbar.style.left = "unset"
            ful_scr_toolbar.style.right = "1%"
            ful_scr_toolbar.className = "ful_scr_toolbar"
            ful_scr_toolbar_close.textContent = "×";

            if (logo && logo.className == "logo_default") {
                logo.style = "display:none";
            }
        } else  {
            let webLogo = document.body.style.getPropertyValue("--ipage-web-logo");
            if (!webLogo.endsWith("iread_32.png")) {
                ful_scr_toolbar.style.right = "-10%"
            } else {
                ful_scr_toolbar.style.top = "40px"
                ful_scr_toolbar.style.left = "unset"
                ful_scr_toolbar.style.right = "1%"
                ful_scr_toolbar_close.textContent = "+";
            }
            ful_scr_toolbar.className = "ful_scr_toolbar_notful";
            if (logo) {
                if (logo.className == "logo_default") logo.style = "";
                else if (logo.className == "logo_none") showLogo(null, 'images/iread_32.png');
            }
        }
    }

    chrome.storage.sync.get([site], function(result) {
        console.log(site +' enable auto is ' + result[site]);
        if (result[site] || result[site] == undefined) {
            fnClick(true);
            ful_scr_toolbar.style.right = "1%"
            ful_scr_toolbar.style.backgroundImage = null;
            ful_scr_toolbar.className = "ful_scr_toolbar"
            ful_scr_toolbar_close.textContent = "×";
        } else {
            showLogo(null, 'images/iread_32.png');
            ful_scr_toolbar.style.right = "-10%";
        }
    });
}

function appendMuyuAudio() {
    let audio = document.createElement("audio");
    audio.id = "muyu_audio";
    audio.src = chrome.runtime.getURL("audios/muyu.mp3");
    document.body.appendChild(audio);
}

function showLogo(gongde, def, logoPos) {
    if (gongde == null) {
        gongde = document.getElementsByClassName('logo-wrapper')[0];
    }

    let webLogo = document.body.style.getPropertyValue("--ipage-web-logo");;
    let logo = gongde.children[1];
    if (!webLogo || webLogo == 'none') {
        webLogo = def;
    }

    if (!webLogo || webLogo.endsWith("none")) {
        logo.className = "logo_none";
        return
    }

    if (webLogo == "images/fo.png") {
        logo.className = "logo_fo";
    } else if (webLogo == "images/muyu.png") {
        logo.className = "logo_muyu";
        appendMuyuAudio();
    } else if (webLogo == "images/iread_32.png"){
        logo.className = "logo_default";
    } else if (webLogo.endsWith("png")) {
        logo.className = "logo_static";
    } else {
        logo.className = "logo_gif";
    }

    logo.src = chrome.runtime.getURL(webLogo);
    gongde.addEventListener('mousedown', onLogoMouseDown)

    let logoPositionValue = document.body.style.getPropertyValue("--ipage-logo-position")
    if (!logoPositionValue) {
        logoPositionValue = logoPos
    }

    if (!logoPositionValue) {
        logoPositionValue = '{"x":"92%", "y":"86%"}';
    }
 
    if (logoPositionValue) {
        let logoPosition = JSON.parse(logoPositionValue)
        if (logoPosition.x.endsWith('px') && logoPosition.w) {
            gongde.style.left = `${100*parseInt(logoPosition.x)/logoPosition.w}%`;
        } else {
            gongde.style.left = logoPosition.x;
        }
        if (logoPosition.y.endsWith('px') && logoPosition.h) {
            gongde.style.top = `${100*parseInt(logoPosition.y)/logoPosition.h}%`;
        } else {
            gongde.style.top = logoPosition.y;
        }
        gongde.style.right = "unset";
    }

    gongde.onclick = (e)=> {
        if (isDrag) {
            return
        }

        let openBtn = document.getElementById('toolbar_close_id');
        if (e.altKey && openBtn) {
            document.getElementById('toolbar_close_id').click();
        } else if (e.altKey || e.shiftKey) {
            chrome.runtime.sendMessage(null, {action:"showoption"});
        } else if (webLogo.endsWith('muyu.png')) {
            gongDeMore(logo, gongde.children[0]);
            window.getSelection().removeAllRanges();
        } else if (!webLogo.endsWith('iread_32.png')){
            showHelp(logo, gongde.children[0])
        } else {
            document.getElementById('toolbar_close_id').click();
        }
    }
}

function showHelp(logo, textWrapper) {
    let helpText = document.createElement("div");
    textWrapper.insertBefore(helpText, textWrapper.firstChild);

    setTimeout(()=>{
        textWrapper.removeChild(helpText);
    }, 1200)

    helpText.className = "help-text";
    helpText.style.animation = "1s ease 0s 1 normal none running help-animation";
    helpText.style.width = `${logo.width}px`;
 
    let date = new Date();
    let seconds = date.getSeconds();
    let msg = [];

    if (logo.src.includes('guohui')) {
        msg = [
            "有困难找警察!",
            "上网注意安全!",
            "不要相信网络谣言!",
            "美女都是假的!"
        ];
    } else if (logo.src.includes('muyu.png') || logo.src.includes('fo.png')) {
        msg = [
            "色即是空,空即是色",
            "愿你看透这个世界",
            "烟火起,照人间,喜悦无边",
            "岁月静好,一世安康",
            "生命不在长短,而在顿悟早晚",
            "有缘而来，无缘而去",
            "一切皆苦,寂灭为乐",
            "阿弥陀佛",
            "尝尽人间百味,还是清淡最美",
            "看尽世事繁华,还是平淡最真",
            "命由己造,相由心生"
        ];
    } else {
        msg = [
            "Alt+Click 全屏/退出",
            "Shift+Click 配置页",
            "加油,加油,为你加油!",
            "岁月静好,一世安康",
            "烟火起,照人间,喜悦无边",
            "世上唯有贫穷可以不劳而获",
            "及时当勉励,岁月不待人",
            "与其临渊羡鱼,不如退而结网",
            "要么放弃,要么拼命",
            "错过落日余晖,还有满天星辰"
        ];

        if (logo.src.includes('cat1.gif') && seconds % 5 == 0) {
            logo.src = chrome.runtime.getURL('images/cat2.gif');
            msg.push("喵,喵～")
        }
    }

    helpText.innerText = msg[seconds%msg.length];
}

function gongDeMore(logo, textWrapper) {
    logo.style.animation = "0.3s linear 0s 1 normal none running logo-animation"
    setTimeout(()=>{
        logo.style.animation = null;
    }, 400)
    let muyu = document.getElementById("muyu_audio");
    if (muyu) muyu.play();

    let gongdeText = document.createElement("div");
    if (textWrapper.firstChild) {
        textWrapper.insertBefore(gongdeText, textWrapper.firstChild);
    } else {
        textWrapper.appendChild(gongdeText);
    }

    setTimeout(()=>{
        textWrapper.removeChild(gongdeText);
    }, 600)

    gongdeText.style.left = logo.style.left;
    gongdeText.style.top = logo.style.top;

    gongdeText.className = "logo-text";
    gongdeText.style.animation = "0.6s ease 0s 1 normal none running gongde-animation"
    gongdeText.style.width = `${logo.width+20}px`;
    gongdeText.innerText = "功德 + 1";
}

function showDonate() {
    let donate = document.getElementById("ireader_donate_icon")
    donate.style.display = "block";
    setTimeout(() => { donate.style.display = "none" }, 4000)
}


function capture() {
    let lastClassName = document.body.className;
    if (lastClassName) document.body.className += " iread_capture";
    else document.body.className = "iread_capture";

    chrome.runtime.sendMessage(null, {action:"capture"}, (resp)=>{
        console.log('resp data', resp);
    });

    let main = document.getElementsByClassName("iread_main")[0];
    if (!main) {
        main = document.querySelector("*[ireader='iread_main']")
    }

    var bodyLastBgColor = main.style.background;
    main.style.background = "white";

    startPageCapture(()=>{
        main.style.background = bodyLastBgColor;
        if (lastClassName) document.body.className = lastClassName;
    });
}
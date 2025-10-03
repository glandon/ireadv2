
const commons = {
"display:none":[
    '.iread_fullscr .article-detail ~ *', 
    '.iread_fullscr .home-top',
    '.iread_fullscr .action-aside',
    '.iread_fullscr .Header',
    '.iread_fullscr #footerSet',
    '.iread_fullscr .suspension-pendant_r',
    '.iread_fullscr .erweima-box',
    '.iread_fullscr .adsbygoogle',
    '.iread_fullscr #secondNav',
    '.iread_fullscr .header-box',
    '.iread_fullscr .ad-navtop',
    '.iread_fullscr .article-right',
    '.iread_fullscr #comment-area',
    '*[ireader="iread_main"] .col-lg-2']
}

const cto51 = {
    main:{'components-page-article':0, 'detail-content-left': 0},
    title:{'article-title': 0, 'title': 0},
    article:{'article-left': 0, 'article-detail': 0},
    innerTitle: true
}

const qqnews = {
    main:{'qq_conent':0},
    title:{},
    article:{'LEFT': 0},
    innerTitle: true,
    css:{
    "width: 100%": [
        ".iread_fullscr .LEFT", 
        ".iread_fullscr .content-article",
        ".iread_fullscr .recommend-con"
    ],
    "display:block":[
        ".qq_conent"
    ],
    "display:none":[
        '#bottomAd',
        '#topAd',
        '.iread_fullscr .LeftTool',
        '.iread_fullscr .RIGHT',
        '.iread_fullscr #Foot'
    ]},
    print: [
        "#Recomend"
    ]
}

const sohu = {
    main:{'left main':0, 'content area': 0},
    title:{'text-title': 0, 'article-title': 0},
    article:{'text': 0, 'article-box': 0},
    innerTitle: true,
    asarticle: ['.comment', '#comment_area', '.groom-read', '#commentList', '#meComment'],
    css: {
        "display:none": [
            ".adA",
            ".myBaiduAd",
            "*[class*='myBaiduAd']",
            "*[id*='god']",
            "*[class*='god']",
            "*[class*='ad-rect']",
            ".iread_fullscr .rec-list-box",
            ".iread_fullscr #articleAllsee",
            ".iread_fullscr #groomRead",
            ".iread_fullscr .hot-atlas",
            ".iread_fullscr .four-pic",
            ".iread_fullscr #discuss",
            "div[class^=publift-widget]",
            ".iread_fullscr #hot-news-container",
            ".iread_fullscr .aside",
            ".iread_fullscr header",
            ".iread_fullscr .bottom-rec-box",
            ".iread_fullscr .recommend-writer"
        ]
    }
}

const sina = {
    main:{'main-content':0, 'blkContainerSblk': 0, 'main-content': 0},
    title:{'main-title': 0, '#artibodyTitle': 0, 'main-title': 0},
    article:{'article-content-left': 0, '#artibody': 0, '#article_content': 0},
    innerTitle: false,
    css:{
    "display:none":[
        '*[id^=ad]',
        '*[id^=sinaad]',
        '.iread_fullscr .attitude',
        '.iread_fullscr .pub',
        '.iread_fullscr .btn_addfav_w',
        '.iread_fullscr .artInfo',
        '.iread_fullscr .art-subscribe',
        '.iread_fullscr *[class*="top-bar-wrap"]',
        '.iread_fullscr #tab_related',
        '.iread_fullscr .article-content-right',
        '.iread_fullscr .tab_related',
        '.iread_fullscr .sina-header',
        '.sinaads',
        '.iread_fullscr .page-right-bar',
        '.top-bar-wrap',
        '.ad',
        '.iread_fullscr .path-search',
        '.top-banner',
        'iframe', 
        '.sinaad-toolkit-box'],
    "margin-top: 0": [
        '.article-content'],
    "width: 100%": [
        '*[ireader="iread_main"] .img_wrapper:first-child img']
    }
}

const segment = {
    main:{'article-wrap':0},
    title:{'col-lg-7': 0},
    article:{'col-lg-7': 1},
    innerTitle: false
}

var profies = {
    "cto51": cto51,
    "segmentfault": segment,
    "sohu": sohu,
    "sina": sina,
    "qqnews": qqnews,
    "common": commons
}

function applyCss2Web(web, cfg) {
    let mainObj = profies[web]['main']
    let main = null;
    for (m in mainObj) {
        if (m.startsWith('#')) {
            main = document.getElementById(m.substr(1))
        } else {
            main = document.getElementsByClassName(m)[0]
        }
        if (main) break
    }

    if (!main) {
        return
    }

    let articleObj = profies[web]['article']
    let article = null;
    for (a in articleObj) {
        let node = null;
        if (a.startsWith('#')) {
            article = document.getElementById(a.substr(1))
        } else {
            node = document.getElementsByClassName(a)
            article = node[articleObj[a]]
        }
        if (article) break
    }

    let isInnerTitle = profies[web]['innerTitle']
    let titleObj = profies[web]['title']
    let title = null;

    let doc = null;
    if (isInnerTitle) {
        doc = article
    } else {
        doc = document
    }

    for (t in titleObj) {
        if (t.startsWith('#')){
            title = doc.getElementById(t.substr(1))
        } else {
            title = doc.getElementsByClassName(t)[titleObj[t]]
        }
        if (title) break
    }

    let css = "";
    for (t in profies['common']) {
        css += profies['common'][t].join(',');
        css += "{";
        css += t;
        css += " !important;}";
    }
    injectCss(css);

    let webCss = profies[web]['css'];
    css = "";
    for (t in webCss) {
        css += webCss[t].join(',');
        css += "{";
        css += t;
        css += " !important;}";
    }

    let printCss = profies[web]['print'];
    if (printCss) {
        css += "@media print {";
        css += printCss.join(',');
        css += "{display: none !important;}}";
    }

    injectCss(css);

    let asarticles = profies[web]['asarticle'];
    if (!asarticles) {
        asarticles = []
    }

    let asarticleNodes = [];
    for (a of asarticles) {
        if (a.startsWith('#')){
            asarticleNodes.push(document.getElementById(a.substr(1)))
        } else {
            asarticleNodes.push(document.getElementsByClassName(a.substr(1))[0])
        }
    }

    let reader = new WebFineReader(main, title, article, isInnerTitle, asarticleNodes)
    inject_iReaderBarEx(cfg, ()=>reader.ireadBtnClick())
}
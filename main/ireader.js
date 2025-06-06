
/**
 * 架构优化，实验性代码
 */

const CLASS_ENTER_IREAD = " iread_fullscr"
const ATTR_IREAD_ATTR = "ireader"
const ATTR_IREAD_MAIN_VALUE = "iread_main"


function loadAppEvn() {
    chrome.storage.sync.get(['maxWidth', 'logoPosition', 'webLogo'], function(result) {
        let maxW = result['maxWidth'];
        if (!maxW) {
            maxW = "1400px";
        }
        document.body.style.setProperty("--ipage-max-width", maxW);

        let logoPosition = result['logoPosition'];
        if (logoPosition) {
            document.body.style.setProperty("--ipage-logo-position", JSON.stringify(logoPosition)); 
        }

        let webLogo = result['webLogo'];
        if (webLogo) {
            document.body.style.setProperty("--ipage-web-logo", webLogo); 
        }
    })
}

document.onreadystatechange = function() {
    if (document.readyState == 'interactive') {
        console.log("load app evn")
        loadAppEvn()
    }
}

/**
 * 通用处理封装对象
 */
class WebFineReader {
    constructor(main, title, article, innerTitle, asarticles) {
        this.main = main
        this.bgColor =  main?main.style.background:"";
        this.bodyClassName = document.body.className;
        this.asarticles = asarticles

        this.title = title;
        this.innerTitle = innerTitle;
        if (title) {
            this.titleClassName = title.className
        }

        this.article = article
        if (article) {
            this.articleClassName = article.className
        }
    }
 
    toFullScreen(){
        document.body.className += CLASS_ENTER_IREAD

        if (this.main) {
            this.main.setAttribute(ATTR_IREAD_ATTR, ATTR_IREAD_MAIN_VALUE);
            changeBackgroud(this.main)
        }

        if (this.innerTitle) {
            if (this.title) {this.title.setAttribute(ATTR_IREAD_ATTR, "inner_title")}
        } else if (this.title) {
            this.title.setAttribute(ATTR_IREAD_ATTR, "title")
        }

        if (this.article) {
            if (this.title) this.article.setAttribute(ATTR_IREAD_ATTR, "article")
            else this.article.setAttribute(ATTR_IREAD_ATTR, "article_no_title")
        }

        if (this.asarticles) {
            for (a of this.asarticles) if(a)a.setAttribute(ATTR_IREAD_ATTR, "asarticle")
        }
    }

    exitFullScreen(){
        document.body.className = this.bodyClassName;
        this.main.removeAttribute(ATTR_IREAD_ATTR);
        this.main.style.background = this.bgColor;

        if (this.title) {
            this.title.removeAttribute(ATTR_IREAD_ATTR);
        }
        if (this.article) {
            this.article.removeAttribute(ATTR_IREAD_ATTR);
        }
        if (this.asarticles) {
            for (a of this.asarticles) if (a) a.removeAttribute(ATTR_IREAD_ATTR)
        }
    }

    ireadBtnClick(fullScr){
        if (fullScr) {
            this.exitFullScreen();
            return true
        }

        if (this.main && this.main.hasAttribute(ATTR_IREAD_ATTR)) {
            this.exitFullScreen();
            return false
        } else {
            this.toFullScreen();
            return true
        }
    }
}

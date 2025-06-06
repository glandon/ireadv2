chrome.storage.sync.get(['doc360'], function(result) {
    console.log('360doc.js: Value currently is ' + result.doc360);
    if (result.doc360 || result.doc360==undefined) doc360Simple();
});


function injectClick() {
    let contextmenudiv = document.getElementById("contextmenudiv");
    if (!contextmenudiv) {
        return;
    }

    let printmenu = contextmenudiv.firstElementChild.children[1].firstChild;
    //printmenu.setAttribute("onclick","PrintObj.print()");
    printmenu.setAttribute("onclick", "if($('body').hasClass('fullopen')) {$('#artfullscreen_closer').trigger('click')};setTimeout(()=>PrintObj.print(),1000)");
}

///////////entry//////////////////
function doc360Simple() {

    if (!document.URL.includes("360doc.com")) {
        return;
    }

    injectClick();
    insertCss("main/360doc/360doc.css")
    insertJs("main/360doc/injectClick.js")

    setTimeout(() => {
        let fullbtn = document.getElementsByClassName("newbtn_fullscreen");
        if (fullbtn[0]) {
            fullbtn[0].setAttribute("onclick", "(()=>{document.body.lastChild.style.display='none'})()");
            fullbtn[0].click()
        }

        let newbtn_word = document.getElementById("newbtn_word");
        if (newbtn_word) {
            newbtn_word.style.display = "inherit";
            newbtn_word.setAttribute("onclick", "createArtIframe(2)");
        }

        let newbtn_print = document.getElementById("up_newbtn_print");
        if (newbtn_print) {
            newbtn_print.style.display = "inherit";
            newbtn_print.setAttribute("onclick", "PrintObj.print()");
        }
    }, 2000)

    // chrome.storage.sync.get(['i_doc360'], function(result) {
    //     console.log('360doc.js: auto is ' + result.i_doc360);
    //     if (typeof articlefullscreen != "undefined") articlefullscreen(1);
    // });
}
    
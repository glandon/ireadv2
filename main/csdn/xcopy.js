/** created by simbaba 2021/10/31 */
function copyText(element) {
    let selection = window.getSelection();        
    let range = document.createRange();
 
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
}

function onCopyCode(e) {
    e.preventDefault()
    e.stopPropagation()
    e.target.setAttribute('data-title', "已复制")
    copyText(e.target.parentNode)
}

if (hljs && hljs.copyCode) {
    hljs.signin = hljs.copyCode
}

if (csdn) {
    csdn.copyright.init("", "", "")
}


chrome.storage.sync.get(['logoPosition', 'webLogo'], (result)=>{
    showCarton(result)
})

function showCarton(result) {
    if (document.getElementsByClassName('ireader_root_div').length > 0) {
        return
    }

    const container = document.createElement('div')
    container.className = 'ireader_root_div'
    const carton = document.createElement('div')
    container.appendChild(carton)
    document.body.appendChild(container)

    let logo = result['webLogo']
    let gongde = addGongdeDiv(container);
    showLogo(gongde, logo, result['logoPosition'])
}

const kButtonColors = [
    '',
    'rgb(227, 227, 227)',
    'rgb(208, 208, 208)',
    'rgb(186, 215, 223)',
    'rgb(113, 201, 206)',
    'rgb(44, 62, 80)',

    'rgb(249, 187, 45)',
    'rgb(102, 152, 203)',
    'url("'+chrome.runtime.getURL('images/ligreen.png')+'")',
    'rgb(174, 221, 129)',
    'rgb(132, 175, 155)',
    'rgb(210, 77, 87)',

    'rgb(203, 153, 197)',
    'rgb(235, 115, 71)',
    'rgb(252, 157, 153)',
    'url("'+chrome.runtime.getURL('images/rgezi.png')+'")',
    'url("'+chrome.runtime.getURL('images/mu.jpg')+'")',
    'url("'+chrome.runtime.getURL('images/leafs.png')+'")',

    'url("'+chrome.runtime.getURL('images/digital.gif')+'")',
    'url("'+chrome.runtime.getURL('images/star.gif')+'")',
    'url("'+chrome.runtime.getURL('images/grid.jpg')+'")'
];

/** 1. usr background color cofig */
let colorList = document.getElementById('buttonDiv');

function updateColorBtnStyle(cfgColor) {
    for (let item of colorList.children) {
        console.log("cfg:" + cfgColor + ", item:" + item.style.background)
        if (cfgColor === item.style.background) {
            item.className = "color_option";
        } else {
            item.className = "";
        }
    }
    colorList.children[0].style.verticalAlign = "bottom";
    colorList.children[0].textContent = "无";
}

function saveSetting(item) {
    chrome.storage.sync.set({ bgcolor: item }, function() {
        updateColorBtnStyle(item);
        console.log('color is set to' + item);
    })
}

function constructColorOptions(kButtonColors, cfgColor) {
    for (let item of kButtonColors) {
        let button = document.createElement('button');
        button.style.background = item;
        button.addEventListener('click', () => saveSetting(item));
        colorList.appendChild(button);
    }
    updateColorBtnStyle(cfgColor);
}

chrome.storage.sync.get(['bgcolor'], function(result) {
    console.log('option->bgcolor is ' + result.bgcolor);
    constructColorOptions(kButtonColors, result.bgcolor);
});

var weeks = ["日","一","二","三","四","五","六"];
var directions = ["北方","东北方","东方","东南方","南方","西南方","西方","西北方"];

var today = new Date();
var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

var specials = [
    {date:20240214, type:'bad', name:'待在男（女）友身边', description:'脱团火葬场，入团保平安。'}
];

var activities = []
var calendarArgs = []
var specials = []
var tools = []
var varNames = []
var drinks = []

function constructCalendar(data) {
    activities = data.activities;
    calendarArgs = data.calendarArgs[0];
    tools = JSON.parse(calendarArgs.tools);
    varNames = JSON.parse(calendarArgs.vnames);
    drinks = JSON.parse(calendarArgs.drinks);
    renderCalendar();
}

function renderCalendar() {
    if (is_someday()) {
        document.body.className = 'someday'
    }

    const date = document.querySelector('.today');
    date.innerHTML = getTodayString();

    const direction_value = document.querySelector('.direction_value');
    direction_value.innerHTML = directions[random(iday, 2) % directions.length];

    const drink_value = document.querySelector('.drink_value');
    drink_value.innerHTML = pickRandom(drinks,2).join('，');

    const goddes_value = document.querySelector('.goddes_value');
    goddes_value.innerHTML = star(random(iday, 6) % 5 + 1);
}

function random(dayseed, indexseed) {
    var n = dayseed % 11117;
    for (var i = 0; i < 100 + indexseed; i++) {
        n = (n * n)%11117;
    }
    return n;
}

function is_someday() {
    return today.getMonth() == 5 && today.getDate() == 4;
}

function isWeekend() {
    return today.getDay() == 0 || today.getDay() == 6;
}

function getTodayString() {
    let y=today.getFullYear(), m = today.getMonth(),d=today.getDate();

    return "<div class='date'>" 
        + y + "年" + (m + 1) + "月" + d 
        + "日 星期" + weeks[today.getDay()]
        + "</div><div class='astro'>" + astro(m+1, d) + "</div>"
}

function star(num) {
    var result = "";
    var i = 0;
    while (i < num) {
        result += "★";
        i++;
    }
    while(i < 5) {
        result += "☆";
        i++;
    }
    return result;
} 

/**
 * 去掉一些不合今日的事件
 * 周末的话，只留下 weekend = true 的事件
 */ 
function filter(activities) {
    var result = [];
    if (isWeekend()) {
        for (var i = 0; i < activities.length; i++) {
            if (activities[i].special) {result.push(activities[i]);}
        }
        return result;
    }
    return activities;
}

function pickRandom(array, size) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        result.push(array[i]);
    }
    for (var j = 0; j < array.length - size; j++) {
        var index = random(iday, j) % result.length;
        result.splice(index, 1);
    }
    return result;
}

function parse(event) {
    var result = {name: event.name, good: event.good, bad: event.bad};  // clone
    if (result.name.indexOf('%v') != -1) {
        result.name = result.name.replace('%v', varNames[random(iday, 12) % varNames.length]);
    }
    if (result.name.indexOf('%t') != -1) {
        result.name = result.name.replace('%t', tools[random(iday, 11) % tools.length]);
    }
    if (result.name.indexOf('%l') != -1) {
        result.name = result.name.replace('%l', (random(iday, 12) % 247 + 30).toString());
    }
    return result;
}

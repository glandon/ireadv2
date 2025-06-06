
function encrpt (str, key) {
    var len = key.length;
    var a = key.split("");
    var s = "",b, b1, b2, b3;  //定义临时变量
    for (var i = 0; i <str.length; i ++) {  //遍历字符串
        b = str.charCodeAt(i);  //逐个提取每个字符，并获取Unicode编码值
        b1 = b % len;  //求Unicode编码值得余数
        b = (b - b1) / len;  //求最大倍数
        b2 = b % len;  //求最大倍数的于是
        b = (b - b2) / len;  //求最大倍数
        b3 = b % len;  //求最大倍数的余数
        s += a[b3] + a[b2] + a[b1];  //根据余数值映射到密钥中对应下标位置的字符
    }
    return s;  //返回这些映射的字符
}

function decrpt (str, key) {
    var len = key.length;  //获取密钥的长度
    var b, b1, b2, b3, d = 0, s;  //定义临时变量
    s = new Array(Math.floor(str.length / 3));  //计算加密字符串包含的字符数，并定义数组
    b = s.length;  //获取数组的长度
    for (var i = 0; i < b; i ++) {  //以数组的长度循环次数，遍历加密字符串
        b1 = key.indexOf(str.charAt(d));  //截取周期内第一个字符串，计算在密钥中的下标值
        d ++;
        b2 = key.indexOf(str.charAt(d));  //截取周期内第二个字符串，计算在密钥中的下标值
        d ++;
        b3 = key.indexOf(str.charAt(d));  //截取周期内第三个字符串，计算在密钥中的下标值
        d ++;
        s[i] = b1 * len * len + b2 * len + b3  //利用下标值，反推被加密字符的Unicode编码值
    }
    b = eval("String.fromCharCode(" + s.join(',') + ")");  // 用fromCharCode()算出字符串
    return b ;  //返回被解密的字符串
}

function ellipse(str, len) {
    // let reg = /[\u4e00-\u9fa5]/g;
    // let slice = str.substring(0, len);
    // console.log("slice:" + slice)
    // let cCharNum = (~~(slice.match(reg) && slice.match(reg).length));
    // console.log("cCharNum:" + cCharNum)
    // let realen = slice.length*2 - cCharNum-1;
    // console.log( " slice.length:" + slice.length+"realen:" + realen)
    ///return str.substr(0, realen) + (realen < str.length ? "..." : "");
    if (str.length < len) {
        return str;
    }
    return str.substr(0, len) + "...";
}

function showDialog(item) {
    let dialog = document.getElementById("idialog");
    let closebtn = document.getElementById("idialogclose");
    let dialogTitle = document.getElementById("idialogtitle");
    let dialogDate = document.getElementById("idialogdate");
    let dialogContent = document.getElementById("idialogcontent");
    let dialogLink = document.getElementById("idialoglink");

    closebtn.onclick = ()=> {
        dialog.close()
    }

    dialogTitle.textContent = item.title;
    dialogContent.textContent = item.msg;

    if (item.date) {
        dialogDate.textContent = `发表于：${item.date}`;
    } else {
        dialogDate.textContent = ''
    }

    if (item.link) {
        dialogLink.textContent = "右键复制链接";
        dialogLink.href = item.link;
    } else {
        dialogLink.textContent = "";
    }
    dialog.showModal();
}

function astro(v_month, v_day) {
    v_month = parseInt(v_month, 10)
    v_day = parseInt(v_day, 10);

    if ((v_month == 12 && v_day >= 22)
|| (v_month == 1 && v_day <= 20)) {
        return "<span>♑</span><span>魔羯</span>";
    }
    else if ((v_month == 1 && v_day >= 21)
|| (v_month == 2 && v_day <= 19)) {
        return "<span>♒</span><span>水瓶</span>";
    }
    else if ((v_month == 2 && v_day >= 20)
|| (v_month == 3 && v_day <= 20)) {
        return "<span>♓</span><span>双鱼</span>";
    }
    else if ((v_month == 3 && v_day >= 21)
|| (v_month == 4 && v_day <= 20)) {
        return "<span>♈</span><span>白羊</span>";
    }
    else if ((v_month == 4 && v_day >= 21)
|| (v_month == 5 && v_day <= 21)) {
        return "<span>♉</span><span>金牛</span>";
    }
    else if ((v_month == 5 && v_day >= 22)
|| (v_month == 6 && v_day <= 21)) {
        return "<div><span>♊</span><span>双子</span>";
    }
    else if ((v_month == 6 && v_day >= 22)
|| (v_month == 7 && v_day <= 22)) {
        return "<span>♋</span><span>巨蟹</span>";
    }
    else if ((v_month == 7 && v_day >= 23)
|| (v_month == 8 && v_day <= 23)) {
        return "<span>♌</span><span>狮子</span>";
    }
    else if ((v_month == 8 && v_day >= 24)
|| (v_month == 9 && v_day <= 23)) {
        return "<span>♍</span><span>处女</span>";
    }
    else if ((v_month == 9 && v_day >= 24)
|| (v_month == 10 && v_day <= 23)) {
        return "<span>♎</span><span>天秤</span>";
    }
    else if ((v_month == 10 && v_day >= 24)
|| (v_month == 11 && v_day <= 22)) {
        return "<span>♏</span><span>天蝎</span>";
    }
    else if ((v_month == 11 && v_day >= 23)
|| (v_month == 12 && v_day <= 21)) {
        return "<span>♐</span><span>射手</span>";
    }
    return "X星座";
}
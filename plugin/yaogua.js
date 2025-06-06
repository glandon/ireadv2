
const guaDict = ['坤', '震', '坎', '兑', '艮', '离', '巽', '乾'];
const guaDict2 = ['地', '雷', '水', '泽', '山', '火', '风', '天'];

const guaMap = [
    [2,24,7,19,15,36,46,11],
    [16,51,40,54,62,55,32,34],
    [8,3,29,60,39,63,48,5],
    [45,17,47,58,31,49,28,43],
    [23,27,4,41,52,22,18,26],
    [35,21,64,38,56,30,50,14],
    [20,42,59,61,53,37,57,9],
    [12,25,6,10,33,13,44,1]
];

const guaList = [
    "乾","坤", "屯", "蒙","需","讼","师","比",
    "小畜","履","泰","否","同人","大有","谦","豫",
    "随","蛊","临","观","噬嗑","贲","剥","复",
    "无妄","大畜","颐","大过","坎","离","咸","恒",
    "遁","大壮","晋","明夷","家人","睽","蹇","解",
    "损","益","夬","姤","萃","升","困","井",
    "革","鼎","震","艮","渐","归妹","丰","旅",
    "巽","兑","涣","节","中孚","小过","既济","未济"
];

const yaoyigua = document.getElementById("yaogua")
const guaDiv_l = document.getElementById("gua_result_list_l")
const guaDiv_r = document.getElementById("gua_result_list_r")

const sogua = document.getElementById("sogua")
const soguaDiv = document.getElementById("sogua_div")
const guaHelp = document.getElementById("gua_help")

const coin1 = document.getElementById("coin1")
const coin2 = document.getElementById("coin2")
const coin3 = document.getElementById("coin3")


const deg = 360*12
const angles = [0, 0, 0];
let canYaogua = true
let guas = [];
let fliping = false;

guaHelp.onclick = ()=> {
    showDialog({
        title: '关于断卦、取爻方法的说明',
        date: '',
        msg: "1、变卦就是将卦中所有变爻阴阳反转所得之卦。\n"+
        "2、六爻都不变，为静卦,根据得卦卦辞进行断解。\n"+
        "3、一爻变：即卦中只有一个爻变，以变爻的爻辞断解。\n"+
        "4、两爻变：卦中出现两个变爻，以上面那个变爻的爻辞进行断解。\n"+
        "5、三爻变：卦中出现三个变爻，应用本卦的卦辞和变卦的卦辞，两两相合，进行综合断解。\n"+
        "6、四爻变：卦中出现四个变爻，应以两个不变爻之中的下爻爻辞断解。\n"+
        "7、五爻变：卦中出现五个变爻，以不变爻的爻辞断解。\n"+
        "8、六爻变：卦中六爻全变，如果是乾卦，以卦中的“用九”爻辞断解；如果是坤卦，就以坤卦中“用六”的爻辞断解。若不是乾、坤两卦，则应以变卦的卦辞断解。"
    })
}


coin1.ontransitioncancel = ()=> {
    fliping = false
}

coin1.ontransitionend = ()=> {
    fliping = false
    yaoyigua.style = "color:#a0ab02"
    const gua = getGua()
    guas.push(gua);

    let li;
    if (guas.length <= 3) {
      li = guaDiv_l.children[0].children[guas.length-1]
    } else {
      li = guaDiv_r.children[0].children[guas.length-4]
    }

    let lastGua = -1;
    if (guas.length > 1) {
      lastGua = guas[guas.length-2]
    }

    if (gua == 0) renderYang(li, false, lastGua)
    else if (gua == 1) renderYang(li, false)
    else if (gua == 2) renderYang(li, true)
    else if (gua == 3) renderYang(li, true, lastGua)

    if (guas.length == 6) guaResult()
}

function renderYang(li, yang, lastGua) {
    let divYang = document.createElement('div');
    li.appendChild(divYang)

    if (lastGua == 0) {
      if (yang)divYang.className = "yangchange"
      else divYang.className = "yinchange"
    } if (lastGua < 2) {
      if (yang)divYang.className = "yangchange yinchangeyang"
      else divYang.className = "yinchange yinchangeyin"
    } else if (lastGua >= 2) {
      if (yang) divYang.className = "yangchange yangchangeyang"
      else divYang.className = "yinchange yangchangeyin"
    } else {
      divYang.className = "yangclass"
    }

    if (!yang) {
      let divYin = document.createElement('div');
      divYang.appendChild(divYin)
      divYin.className = "yinclass"
    }
}

yaoyigua.onclick = ()=> {
    if (fliping) return
 
    // again once
    if (guas.length == 6) {
        guas = []
        resetGuaDiv(guaDiv_l.children[0])
        resetGuaDiv(guaDiv_r.children[0])
    }

    fliping = true
    yaoyigua.style = "color:gray"
    angles[0] = angles[0]+deg+(Math.random() >0.5?180:0);
    angles[1] = angles[1]+deg+(Math.random() >0.5?180:0);
    angles[2] = angles[2]+deg+(Math.random() >0.5?180:0);
    coin1.style.transform = 'rotateY(' + angles[0] + 'deg)';
    coin2.style.transform = 'rotateY(' + angles[1] + 'deg)';
    coin3.style.transform = 'rotateY(' + angles[2] + 'deg)';
}

function resetGuaDiv(guaUl) {
  guaUl.children[0].removeAttribute("class")
  guaUl.children[1].removeAttribute("class")
  guaUl.children[2].removeAttribute("class")
  guaUl.children[0].children[0].remove()
  guaUl.children[1].children[0].remove()
  guaUl.children[2].children[0].remove()
}

function getGua() {
    let yangNum = 0;
    /* eslint no-unused-vars: ["error", { "args": "none" }] */
    angles.forEach((value) => {
      // eslint unused:false
      yangNum += (value % 360) > 0 ? 0 : 1;
    });
    return yangNum;
}

function guaResult() {
    const props = getResult();
    let change = null;
    if (props.change.length === 0) {
      change = '无变爻';
    } else {
      change = '变爻:' + props.change;
    }

    const guaText=`周易第${props.index}卦_${props.name}卦_${props.name2}_${props.gua}_${props.gua2}`;
    const link =`https://www.baidu.com/s?wd=${guaText}`;

    soguaDiv.style = "display:block";
    sogua.href = link
    sogua.textContent = guaText
}

function getResult() {
    const changeGuas = [];
    if (guas.length < 6) {
      return null;
    }

    guas.forEach((value, index) => {
      if (value === 0 || value === 3) {
        changeGuas.push(index + 1);
      }
    });
    console.log('change guas: ' + changeGuas);

    // 卦的结果： 第X卦 X卦 XX卦 上X下X X上X下
    // 计算卦的索引，111对应乾卦。000对应坤卦，索引转为10进制。
    const upGuaIndex = (guas[5] > 1 ? 4 : 0) + (guas[4] > 1 ? 2 : 0) + (guas[3] > 1 ? 1 : 0);
    const downGuaIndex = (guas[2] > 1 ? 4 : 0) + (guas[1] > 1 ? 2 : 0) + (guas[0] > 1 ? 1 : 0);

    const guaIndex = guaMap[upGuaIndex][downGuaIndex];
    const guaName = guaList[guaIndex - 1];

    let guaName2 = null;

    // 上下卦相同，格式为X为X
    if (upGuaIndex === downGuaIndex) {
      guaName2 = guaDict[upGuaIndex] + '为' + guaDict2[upGuaIndex];
    } else {
      guaName2 = guaDict2[upGuaIndex] + guaDict2[downGuaIndex] + guaName;
    }

    console.log('upGuaIndex: ' + upGuaIndex + ', downGuaIndex: ' + downGuaIndex);

    const guaDiscription = guaDict[upGuaIndex] + '上' + guaDict[downGuaIndex] + '下';
    const guaDiscription2 = '上' + guaDict[upGuaIndex] + '下' + guaDict[downGuaIndex];
    console.log(guaDiscription + ' 变卦: ' + changeGuas);
 
    // https://www.baidu.com/s?wd=X上X下 site:baike.fututa.com
    return {
      index: guaIndex,
      name: guaName,
      name2: guaName2,
      gua: guaDiscription,
      gua2: guaDiscription2,
      change: changeGuas
    };
  }
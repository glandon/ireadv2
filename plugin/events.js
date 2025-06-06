
function constructEventsList(events) {
    if (!events) {
        let eventsList = document.getElementById('events_div');
        let li = document.createElement('li');
        eventsList.appendChild(li)
        li.textContent = "服务不可用"
        return
    }

    /** 事件发布 */
    setUpEventPub()

    /** 构建事件列表 */
    let eventsList = document.getElementById('events_div');
    for (let item of events) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        let h2 = document.createElement('h2');
        let p = document.createElement('p');
        let show = document.createElement('a');

        a.appendChild(h2);
        a.appendChild(p);
        a.appendChild(show);
        li.appendChild(a);
        eventsList.appendChild(li);

        if (item.cover) {
            show.setAttribute("style", "display:none")
            a.setAttribute("style", `background-size:cover;background-image:url(${item.cover})`);
        } else {
            h2.className = "nocover";
        }

        show.onclick = ()=> {
            showDialog(item)
        }

        a.onclick = ()=> {
            if (h2.textContent) {
                if (!item.cover) {h2.className = "nocover"}
                h2.textContent = "";
                p.setAttribute("style", "display:none");
                show.setAttribute("style", "display:none");
                a.setAttribute("style", `background-size:cover;background-image:url(${item.cover})`)
            } else {
                console.log("innerwidth:" + window.innerWidth)
                if (window.innerWidth < 1100) {
                    p.textContent = ellipse(item.msg, 15);
                } else if (window.innerWidth < 1320) {
                    p.textContent = ellipse(item.msg, 22);
                } else if (window.innerWidth < 1420) {
                    p.textContent = ellipse(item.msg, 30);
                } else if (window.innerWidth < 1600) {
                    p.textContent = ellipse(item.msg, 35);
                } else {
                    p.textContent = ellipse(item.msg, 50);
                }
                h2.textContent = item.title;
                h2.className = "";
                a.removeAttribute("style")
                h2.setAttribute("style", "display:block");
                p.setAttribute("style", "display:block");
                show.setAttribute("style", "display:block");
                show.textContent = "✉";
            }
        }
    }
}

function setUpEventPub() {
    let pubeventsBtn = document.getElementById("pubevents");

    pubeventsBtn.onclick = ()=> {
        let eventTitle = document.getElementById('event_title_input');
        let eventContent = document.getElementById('event_content_input');
        let eventCover = document.getElementById('event_cover_input');
        let eventLink = document.getElementById('event_link_input');

        if (!eventTitle.value || !eventContent.value) {
            alert("你标题和内容没写全啊，还是别发了吧～")
            return;
        }

        let request = {
            type: "event",
            title: eventTitle.value,
            msg: eventContent.value,
            cover: eventCover.value,
            link: eventLink.value
        }

        fetchResource("https://handbooks.cn:18443/ireader/event", { method: 'post',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(request)
        }).then((resp)=>{
            console.log(resp)
            eventTitle.value = ""
            eventContent.value = ""
            eventCover.value = ""
            eventLink.value = ""
            alert("发布成功了，放心会被人刷到的～")
        }).catch(() => {
            alert("发生一点意外，一定会恢复的～")
            console.log("pub event -> Network error")
        });
    }
}

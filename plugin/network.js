
function onMessageResonse(resolve, reject, respObj) {
    const [resp, header] = respObj;

    if (header.status != 200) {
      reject("error");
      return;
    }
    //console.log(JSON.stringify(resp));
    let ret = {data: resp, status: header.status};
    resolve(ret);
}

function fetchResource(url, args) {
    let request = {action:"fetch", url, args};
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(request, resp=>onMessageResonse(resolve, reject, resp))
    })
}

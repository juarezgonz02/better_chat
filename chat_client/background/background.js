browser.runtime.onMessage.addListener(receiver);
/*const textos = txt()
function connectToMeet(tabs) {
  if (tabs.length > 0) {  
    var sender = browser.tabs.connect(
      tabs[0].id,
      {name: "langs"}
    );
    sender.postMessage({greeting: "Hi from background script"});
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

var langSender = browser.tabs.query({
    currentWindow: true, active: true
  });

 langSender.then(connectToMeet, onError);

const langSend = browser.runtime.sendMessage({
  type: "langs",
  langs: textos
})*/
///////////////////////////////////////////7777
function receiver(res) {
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL("icons/logo-48.png"),
    "title": "Tienes un nuevo mensaje: " + res.name,
    "message": res.message
  });
}
browser.runtime.onMessage.addListener(receiver);
const textos = txt()
////////////////////////////////////////////
browser.runtime.onConnect.addListener(connected);
function connected(port){
  port.postMessage({
    txts:  textos
  })
}
///////////////////////////////////////////
function receiver(res) {
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL("icons/logo-48.png"),
    "title": "Tienes un nuevo mensaje: " + res.name,
    "message": res.message
  });
}
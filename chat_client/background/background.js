const port = browser.runtime.connectNative("better_chat");
const textos = txt()
browser.runtime.onMessage.addListener(receiver);
browser.runtime.onConnect.addListener(connected);
port.onMessage.addListener(responser);

////////////////////////////////////////////
function responser(res){
    console.log("Received: " + res);
}
////////////////////////////////////////////
function connected(port){ 
  port.postMessage({
    txts:  textos
  })
}
///////////////////////////////////////////
function receiver(res) {
  switch(res.type)
  {
    /////////////////////
    case "notify_command":
      browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/logo-48.png"),
        "title": "Tienes un nuevo mensaje de: " + res.command_info.name,
        "message": res.command_info.message
      });
      break;
    /////////////////////
    case "control_command":
      port.postMessage(res.command_info.message);
      break
  }
}

port.onDisconnect.addListener((e)=>{
  browser.tabs.create({
    url: "https://juarezgonz02.github.io/better_chat/"
  })

})

/*
On startup, connect to the "ping_pong" app.

browser.browserAction.onClicked.addListener(() => {
  console.log("Sending:  control");
  port.postMessage("control");
});

*/
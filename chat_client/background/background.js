browser.runtime.onMessage.addListener(notify);

function notify(res) {
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL("icons/logo-48.png"),
    "title": "Tienes un nuevo mensaje: " + res.name,
    "message": res.message
  });
}
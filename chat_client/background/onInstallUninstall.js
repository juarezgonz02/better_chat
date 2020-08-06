browser.runtime.onInstalled.addListener(()=>{
    browser.runtime.openOptionsPage();
  })

const onUnistall = browser.runtime.setUninstallURL("https://juarezgonz02.github.io/better_chat/?no_app=uninstalling");

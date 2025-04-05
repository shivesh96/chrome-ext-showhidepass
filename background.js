chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    doubleClick: true,
    showEye: true,
    hoverReveal: false,
    autoHideDelay: 3,
    debugLogs: false
  });
});
const doubleClick = document.getElementById('doubleClick');
const showEye = document.getElementById('showEye');
const hoverReveal = document.getElementById('hoverReveal');
const autoHideDelay = document.getElementById('autoHideDelay');
const debugLogs = document.getElementById('debugLogs');

chrome.storage.sync.get(['doubleClick', 'showEye', 'hoverReveal', 'autoHideDelay', 'debugLogs'], (data) => {
  doubleClick.checked =  data.doubleClick ?? true;
  showEye.checked = data.showEye ?? false;
  hoverReveal.checked = data.hoverReveal ?? false;
  autoHideDelay.value = data.autoHideDelay ?? 3;
  debugLogs.checked = data.debugLogs ?? false;
});

['doubleClick', 'showEye', 'hoverReveal', 'debugLogs'].forEach(id => {
  document.getElementById(id).addEventListener('change', e => {
    let obj = {};
    obj[id] = e.target.checked;
    chrome.storage.sync.set(obj);
  });
});

document.getElementById('autoHideDelay').addEventListener('change', e => {
  chrome.storage.sync.set({ autoHideDelay: parseInt(e.target.value || 3) });
});
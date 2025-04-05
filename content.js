const applySettings = (settings) => {
  const log = (...args) => settings.debugLogs && console.log('[PasswordToggle]', ...args);
  const fields = document.querySelectorAll('input[type="password"]');

  fields.forEach(field => {
    const existingWrapper = field.parentElement && field.parentElement.classList.contains('password-wrapper');
    if (existingWrapper) return; // prevent duplicate

    if (settings.doubleClick) {
      field.addEventListener('dblclick', () => {
        field.type = 'text';
        setTimeout(() => field.type = 'password', settings.autoHideDelay * 1000);
      });
      field.addEventListener('blur', () => field.type = 'password');
    }

    if (settings.hoverReveal) {
      field.addEventListener('mouseenter', () => {
        field.type = 'text';
        setTimeout(() => field.type = 'password', settings.autoHideDelay * 1000);
      });
      field.addEventListener('mouseleave', () => field.type = 'password');
    }

    if (settings.showEye) {
      const wrapper = document.createElement('div');
      wrapper.className = 'password-wrapper';
      wrapper.style.position = 'relative';
      field.parentNode.insertBefore(wrapper, field);
      wrapper.appendChild(field);

      const eye = document.createElement('span');
      eye.textContent = '👁️';
      eye.style.position = 'absolute';
      eye.style.right = '10px';
      eye.style.top = '50%';
      eye.style.transform = 'translateY(-50%)';
      eye.style.cursor = 'pointer';
      eye.style.userSelect = 'none';

      eye.addEventListener('mousedown', () => field.type = 'text');
      eye.addEventListener('mouseup', () => field.type = 'password');
      eye.addEventListener('mouseleave', () => field.type = 'password');

      wrapper.appendChild(eye);
    }
  });
};

chrome.storage.sync.get(['doubleClick', 'showEye', 'hoverReveal', 'autoHideDelay', 'debugLogs'], applySettings);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    const newSettings = {};
    for (const key in changes) {
      newSettings[key] = changes[key].newValue;
    }
    chrome.storage.sync.get(['doubleClick', 'showEye', 'hoverReveal', 'autoHideDelay', 'debugLogs'], applySettings);
  }
});
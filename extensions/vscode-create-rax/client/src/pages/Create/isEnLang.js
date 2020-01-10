let isEnLang = false;

if (window.__VSCODE__ && window.__VSCODE__.env) {
  // en-US, en-GB, en-XX en ...
  isEnLang = (window.__VSCODE__.env.language || '').indexOf('en') === 0;
}

export default isEnLang;
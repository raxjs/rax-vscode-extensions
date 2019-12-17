let useEn = false;

if (window.__VSCODE__ && window.__VSCODE__.env) {
  // en-US, en-GB, en-XX en ...
  useEn = (window.__VSCODE__.env.language || '').indexOf('en') === 0
}

export default useEn;
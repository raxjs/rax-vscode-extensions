let isEnLang = false;

if (window.__LANGUAGE__) {
  // en-US, en-GB, en-XX en ...
  isEnLang = (window.__LANGUAGE__ || '').indexOf('en') === 0
}

export default isEnLang;
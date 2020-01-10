const css = require('css');
const path = require('path');
const fs = require('fs-extra');

// Find style property by className, in some CSS files.
module.exports = function findStyle(directory, className, styleDependencies = []) {
  let matched;

  for (let i = 0, l = styleDependencies.length; i < l; i++) {

    const file = path.join(directory, styleDependencies[i].source);
    const stylesheet = css.parse(fs.readFileSync(file, 'utf-8')).stylesheet;

    matched = stylesheet.rules.find(rule => rule.selectors.includes(`.${className}`));

    // Just find one matched stylesheet.
    if (matched) {
      matched.file = file;
      break;
    }
  }

  return matched;
};

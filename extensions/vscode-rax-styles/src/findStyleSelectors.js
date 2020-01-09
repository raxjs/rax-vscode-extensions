const css = require('css');
const path = require('path');
const fs = require('fs-extra');

// Find styles selectors, ['.wrap', '.header' ....]
module.exports = function findStyleSelectors(directory, className, styleDependencies = []) {
  let selectors = [];

  for (let i = 0, l = styleDependencies.length; i < l; i++) {

    const file = path.join(directory, styleDependencies[i]);
    const stylesheet = css.parse(fs.readFileSync(file, 'utf-8')).stylesheet;

    stylesheet.rules.forEach((rule) => {
      selectors = selectors.concat(rule.selectors);
    })
  }

  return selectors;
}
